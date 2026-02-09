import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { getDestinations } from '../services/api';

export default function ResultsScreen({ route }) {
  const { origin, selectedMonth, flexWeeks, tripLength, weatherRisk, crowdTolerance } = route.params;
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await getDestinations({
        origin,
        month: selectedMonth,
        flexWeeks,
        tripLength,
        weatherRisk,
        crowdTolerance,
      });
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError('Failed to load destinations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (destination) => {
    // For MVP, just open a search on Skyscanner
    const url = `https://www.skyscanner.com/`;
    Linking.openURL(url);
  };

  const getRiskLevel = (risk) => {
    if (risk < 0.15) return { text: 'Low', color: '#10b981' };
    if (risk < 0.3) return { text: 'Moderate', color: '#f59e0b' };
    return { text: 'High', color: '#ef4444' };
  };

  const getCrowdLevel = (level) => {
    if (level < 0.3) return { text: 'Low', color: '#10b981' };
    if (level < 0.6) return { text: 'Moderate', color: '#f59e0b' };
    return { text: 'High', color: '#ef4444' };
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Finding best value windows...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchDestinations}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerText}>
        Found {destinations.length} great value {destinations.length === 1 ? 'destination' : 'destinations'}
      </Text>

      {destinations.map((dest, index) => {
        const rainRisk = getRiskLevel(dest.tradeOffs.rainRisk);
        const crowds = getCrowdLevel(dest.tradeOffs.crowds);

        return (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.destination}>{dest.destination}</Text>
              <Text style={styles.location}>{dest.location}</Text>
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Best value window:</Text>
              <Text style={styles.dateValue}>{dest.bestWindow}</Text>
            </View>

            <View style={styles.savingsContainer}>
              <Text style={styles.savingsPercent}>↓ {dest.savingsPercent}% cheaper</Text>
              <Text style={styles.savingsDetail}>than peak season</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>{dest.estimatedCost}</Text>
              <Text style={styles.priceCompare}>vs {dest.peakCost} (peak)</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Trade-offs:</Text>
            <View style={styles.tradeOffRow}>
              <Text style={styles.tradeOffLabel}>• Rain risk:</Text>
              <Text style={[styles.tradeOffValue, { color: rainRisk.color }]}>
                {rainRisk.text} ({dest.tradeOffs.rainDays})
              </Text>
            </View>
            <View style={styles.tradeOffRow}>
              <Text style={styles.tradeOffLabel}>• Crowds:</Text>
              <Text style={[styles.tradeOffValue, { color: crowds.color }]}>
                {crowds.text}
              </Text>
            </View>
            <View style={styles.tradeOffRow}>
              <Text style={styles.tradeOffLabel}>• Flight reliability:</Text>
              <Text style={styles.tradeOffValue}>{dest.tradeOffs.flightReliability}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.reasonContainer}>
              <Text style={styles.reasonTitle}>Why this works:</Text>
              <Text style={styles.reasonText}>{dest.explanation}</Text>
            </View>

            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => handleBooking(dest)}
            >
              <Text style={styles.bookButtonText}>Explore Booking Options</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {destinations.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No destinations found matching your criteria.</Text>
          <Text style={styles.emptySubtext}>Try adjusting your flexibility settings.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 16,
  },
  destination: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  location: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  savingsContainer: {
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  savingsPercent: {
    fontSize: 22,
    fontWeight: '700',
    color: '#15803d',
  },
  savingsDetail: {
    fontSize: 14,
    color: '#15803d',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginRight: 8,
  },
  priceCompare: {
    fontSize: 14,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  tradeOffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tradeOffLabel: {
    fontSize: 14,
    color: '#475569',
  },
  tradeOffValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  reasonContainer: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  reasonText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
