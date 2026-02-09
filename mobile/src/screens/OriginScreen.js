import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function OriginScreen({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [flexWeeks, setFlexWeeks] = useState(2);
  const [tripLength, setTripLength] = useState(7);

  const handleContinue = () => {
    if (!origin || !selectedMonth) {
      alert('Please enter your origin city and select a month');
      return;
    }

    navigation.navigate('Flexibility', {
      origin,
      selectedMonth,
      flexWeeks,
      tripLength,
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Where are you flying from?</Text>
          
          <TextInput
            style={styles.input}
            placeholder="e.g., Berlin, Hamburg, Munich"
            value={origin}
            onChangeText={setOrigin}
            autoCapitalize="words"
          />

          <Text style={styles.title}>When can you travel?</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.monthScroll}
          >
            {MONTHS.map((month) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.monthButton,
                  selectedMonth === month && styles.monthButtonSelected,
                ]}
                onPress={() => setSelectedMonth(month)}
              >
                <Text
                  style={[
                    styles.monthText,
                    selectedMonth === month && styles.monthTextSelected,
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.title}>Flexibility (± weeks)</Text>
          <View style={styles.optionRow}>
            {[1, 2, 3, 4].map((weeks) => (
              <TouchableOpacity
                key={weeks}
                style={[
                  styles.optionButton,
                  flexWeeks === weeks && styles.optionButtonSelected,
                ]}
                onPress={() => setFlexWeeks(weeks)}
              >
                <Text
                  style={[
                    styles.optionText,
                    flexWeeks === weeks && styles.optionTextSelected,
                  ]}
                >
                  ±{weeks}w
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.title}>Trip length (nights)</Text>
          <View style={styles.optionRow}>
            {[5, 7, 10, 14].map((nights) => (
              <TouchableOpacity
                key={nights}
                style={[
                  styles.optionButton,
                  tripLength === nights && styles.optionButtonSelected,
                ]}
                onPress={() => setTripLength(nights)}
              >
                <Text
                  style={[
                    styles.optionText,
                    tripLength === nights && styles.optionTextSelected,
                  ]}
                >
                  {nights}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  monthScroll: {
    marginBottom: 8,
  },
  monthButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  monthButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  monthText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
  },
  monthTextSelected: {
    color: '#fff',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  optionText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
