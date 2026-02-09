import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OriginScreen from './src/screens/OriginScreen';
import FlexibilityScreen from './src/screens/FlexibilityScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Origin"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Origin" 
          component={OriginScreen} 
          options={{ title: 'OffPeak Intelligence' }}
        />
        <Stack.Screen 
          name="Flexibility" 
          component={FlexibilityScreen}
          options={{ title: 'Your Flexibility' }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{ title: 'Best Value Windows' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
