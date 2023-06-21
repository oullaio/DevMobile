import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MealPlannerScreen = ({ mealPlan }) => {
   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.heading}>Meal Plan</Text>
      <View>

      {/*Fait une boucle pour chaque jour de la semaine*/}
      {daysOfWeek.map(day => (
      <View key={day} style={styles.dayContainer}>

        {/*Affiche le nom du jour*/}
        <Text style={styles.dayHeading}>{day}</Text>

        {/* Affiche le petit déjeuner de la journée */}
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Breakfast:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Breakfast.join(', ')}</Text>
        </View>

        {/* Affiche le déjeuner de la journée*/}
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Lunch:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Lunch.join(', ')}</Text>
        </View>

        {/* Afficher les snacks de la journée */}
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Snack:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Snack.join(', ')}</Text>
        </View>

        {/* Affiche le dîner de la journée*/}
        <View style={styles.mealContainer}>
          <Text style={styles.mealHeading}>Dinner:</Text>
          <Text>{mealPlan && mealPlan[day] && mealPlan[day].Dinner.join(', ')}</Text>
        </View>
      </View>
    ))}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#008000',
    margin : 10,
  },
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
    margin: 20,
    color : '#008000'
  },
  mealContainer: {
    marginLeft: 40,
  },
  mealHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default MealPlannerScreen;