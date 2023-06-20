import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';


// Déclaration des données à rentrer dans l'application par l'utilisateur
const FormComponent = () => {

  //useState utilisé pour affecter la valeur choisie ou rentrée pour chaque données demandées
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('Select your activity level');
  const [healthGoal, setHealthGoal] = useState('Select your health goal');
  const [caloriesIntake, setCaloriesIntake] = useState('');

  // Calcul du métabolisme de base en utilisant l'âge, le genre, le poids, la taille, l'activité physique et le but à atteindre
  const handleFormSubmit = () => {

    if (age && gender && height && weight && activityLevel && healthGoal){

      // Constantes utilisées pour calculer le bmr
      const parsedAge = parseInt(age);
      const parsedHeight = parseFloat(height);
      const parsedWeight = parseFloat(weight);

      const truebmr = calculateBMR(parsedAge, gender, parsedHeight, parsedWeight, activityLevel);

      let caloriesIntake = truebmr;

      switch(healthGoal){

        case 'weight loss':
          caloriesIntake -= truebmr*0.1;
          break;

        case 'weight gain':
          caloriesIntake += truebmr*0.1;
          break;

        default:
          break;
      }

      setCaloriesIntake(caloriesIntake);

      console.log('Calories Intake :', caloriesIntake);
  
      console.log('Form submitted!'); //Le bouton submit est appuyé avec toutes les informations remplies
    } else {
      console.log('Please fill in all the required fields') //Le bouton submit est appuyé mais l'utilisateur a omit des informations
    }
    
  };
  

  // Calcul du BMR
  const calculateBMR = (age, gender, height, weight) => {
    let bmr = 0;

    if (gender === 'male'){
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age); // BMR pour les hommes
    }

    else if (gender === 'female'){
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age); // BMR pour les femmes
    }

    let truebmr = 0;

    switch (activityLevel){

      case 'sedentary':
        truebmr = bmr*1.2;
        break;

      case 'light exercise':
        truebmr = bmr*1.375;
        break;

      case 'moderate exercise':
        truebmr = bmr*1.55;
        break;

      case 'heavy exercise':
        truebmr = bmr*1.725;
        break;

      case 'extra active' :
        truebmr = bmr*1.9;
        break;

      default:
        truebmr = bmr;
        break;
    }

    return truebmr; // Retourne le BMR avec l'activité physique

  };

  return (

    // Page sur laquelle sont demandées les informations décrites au-dessus
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Personal Details</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender:</Text>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.input}
          >
            <Picker.Item label="Select your gender..." />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Height (cm):</Text>
          <TextInput
            value={height}
            onChangeText={setHeight}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight (kg):</Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.heading}>Health Goals</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Activity Level:</Text>
          <Picker
            selectedValue={activityLevel}
            onValueChange={setActivityLevel}
            style={styles.input}
          >
            <Picker.Item label="Select your activity level..." />
            <Picker.Item label="Sedentary (little or no exercice)" value="sedentary" />
            <Picker.Item label="Light Exercise (1-3 days per week)" value="light exercise" />
            <Picker.Item label="Moderate Exercise (3-5 days per week)" value="moderate exercise" />
            <Picker.Item label="Heavy Exercise (6-7 days per week)" value="heavy exercise" />
            <Picker.Item label="Extra Active (2x a day/physical job)" value="extra active" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Health Goal:</Text>
          <Picker
            selectedValue={healthGoal}
            onValueChange={setHealthGoal}
            style={styles.input}
          >
            <Picker.Item label="Select your health goal..." />
            <Picker.Item label="Weight Loss" value="weight loss" />
            <Picker.Item label="Weight Maintenance" value="weight maintenance" />
            <Picker.Item label="Weight Gain" value="weight gain" />
          </Picker>
        </View>
        <View style = {styles.container}>
          <Button title="Submit" onPress={handleFormSubmit} color="#32CD32" />
        </View>
        <View style={styles.container}>
        {caloriesIntake !== null && (
          <View style={styles.caloriesIntakeContainer}>
            <Text style={styles.caloriesIntakeLabel}>Daily Caloric Intake (in kcal):</Text>
            <Text style={styles.caloriesIntakeValue}>{caloriesIntake} </Text>
          </View>
        )}
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  // Page stylisée avec de la couleur verte, des écritures en gras, une plus ou moins grosse police selon les parties
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0fff0',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0fff0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#008000',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#008000',
  },
  input: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  caloriesIntakeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  caloriesIntakeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#008000',
  },
  caloriesIntakeValue: {
    fontSize: 18,
    color: '#000000',
  },
});

export default FormComponent;