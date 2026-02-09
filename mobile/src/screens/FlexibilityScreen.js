import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

export default function FlexibilityScreen({ route, navigation }) {
  const { origin, selectedMonth, flexWeeks, tripLength } = route.params;
  const [weatherRisk, setWeatherRisk] = useState(0.5);
  const [crowdTolerance, setCrowdTolerance] = useState(0.5);

  const handleFindDeals = () => {
    navigation.navigate('Results', {
      origin,
      selectedMonth,
      flexWeeks,
      tripLength,
      weatherRisk,
      crowdTolerance,
    });
  };

  const getRiskLabel = (value) => {
    if (value < 0.33) return 'Conservative';
    if (value < 0.66) return 'Moderate';
    return 'Adventurous';
  };

  const getCrowdLabel = (value) => {
    if (value < 0.33) return 'Avoid Crowds';
    if (value < 0.66) return 'Some Crowds OK';
    return 'Crowds Don\'t Matter';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.title}>How flexible are you?</Text>
        <Text style={styles.subtitle}>
          Adjust these settings to find the best value for your preferences
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weather Risk Tolerance</Text>
        <Text style={styles.valueLabel}>{getRiskLabel(weatherRisk)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={weatherRisk}
          onValueChange={setWeatherRisk}
          minimumTrackTintColor="#2563eb"
          maximumTrackTintColor="#cbd5e1"
          thumbTintColor="#2563eb"
        />
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Low Risk</Text>
          <Text style={styles.labelText}>High Risk</Text>
        </View>
        <Text style={styles.description}>
          Lower risk means better weather guarantees but may reduce savings
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Crowd Tolerance</Text>
        <Text style={styles.valueLabel}>{getCrowdLabel(crowdTolerance)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={crowdTolerance}
          onValueChange={setCrowdTolerance}
          minimumTrackTintColor="#2563eb"
          maximumTrackTintColor="#cbd5e1"
          thumbTintColor="#2563eb"
        />
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Prefer Empty</Text>
          <Text style={styles.labelText}>OK with Busy</Text>
        </View>
        <Text style={styles.description}>
          Off-peak times mean fewer tourists but may have seasonal trade-offs
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Trip</Text>
        <Text style={styles.summaryText}>From: {origin}</Text>
        <Text style={styles.summaryText}>Month: {selectedMonth}</Text>
        <Text style={styles.summaryText}>Flexibility: ±{flexWeeks} weeks</Text>
        <Text style={styles.summaryText}>Duration: {tripLength} nights</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFindDeals}>
        <Text style={styles.buttonText}>Find Best Value Windows</Text>
      </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  valueLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 12,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
