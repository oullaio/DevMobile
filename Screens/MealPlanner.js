import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MealPlannerScreen = ({ mealPlan }) => {
   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
      {daysOfWeek.map(day => (
      <View key={day} style={styles.dayContainer}>
        <Text style={styles.dayHeading}>{day}</Text>
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Breakfast:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Breakfast.join(', ')}</Text>
        </View>
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Lunch:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Lunch.join(', ')}</Text>
        </View>
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Dinner:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Dinner.join(', ')}</Text>
        </View>
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Snack:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Snack.join(', ')}</Text>
        </View>
      </View>
    ))}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0fff0',
    paddingVertical: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    marginLeft: 10,
  },
  mealHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default MealPlannerScreen;