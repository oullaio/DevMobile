import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


// Déclaration des données à rentrer dans l'application par l'utilisateur
const FormComponent = () => {

  //useState utilisé pour affecter la valeur choisie ou rentrée pour chaque données demandées
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');

  // Calcul du métabolisme de base en utilisant l'âge, le genre, le poids, la taille, l'activité physique et le but à atteindre
  const handleFormSubmit = () => {

    if (age && gender && height && weight && activityLevel && healthGoal){

      // Constantes utilisées pour calculer le bmr
      const parsedAge = parseInt(age);
      const parsedHeight = parseFloat(height);
      const parsedWeight = parseFloat(weight);

      const bmr = calculateBMR(parsedAge, gender, parsedHeight, parsedWeight);
      console.log('BMR :', bmrfinal);
  
      console.log('Form submitted!'); //Le bouton submit est appuyé avec toutes les informations remplies
    } else {
      console.log('Please fill in all the required fields') //Le bouton submit est appuyé mais l'utilisateur a omit des informations
    }
    
  };
  

  // Calcul du BMR
  const calculateBMR = (age, gender, height, weight) => {
    let bmr = 0;
    let bmrfinal = 0;

    if (gender === 'male'){
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age); // BMR pour les hommes
    }

    else if (gender === 'female'){
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age); // BMR pour les femmes
    }

    if(activityLevel === 'Sedentary'){
      bmrfinal = bmr * 1.2; // Sédentaire
    }
    else if (activityLevel === 'Light Exercise'){
      bmrfinal = bmr * 1.375; // Un peu d'exercice
    }
    else if (activityLevel === 'Moderate Exercise'){
      bmrfinal = bmr * 1.55; // Pratique régulièrement
    }
    else if (activityLevel === 'Heavy Exercise'){
      bmrfinal = bmr * 1.725; // Pratique beaucoup
    }
    else if (activityLevel === 'Extra Active'){
      bmrfinal = bmr * 1.9; // Pratique vraiment beaucoup
    }

    return bmrfinal; // Retourne le BMR avec l'activité physique

  };

  return (

    // Page sur laquelle sont demandées les informations décrites au-dessus
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
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Light Exercise" value="light exercise" />
          <Picker.Item label="Moderate Exercise" value="moderate exercise" />
          <Picker.Item label="Heavy Exercise" value="heavy exercise" />
          <Picker.Item label="Extra Active" value="extra active" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Health Goal:</Text>
        <Picker
          selectedValue={healthGoal}
          onValueChange={setHealthGoal}
          style={styles.input}
        >
          <Picker.Item label="Weight Loss" value="weight loss" />
          <Picker.Item label="Weight Maintenance" value="weight maintenance" />
          <Picker.Item label="Weight Gain" value="weight gain" />
        </Picker>
      </View>
      <View style = {styles.container}>
        {/*Form fields*/}
        <Button title="Submit" onPress={handleFormSubmit} color="#32CD32" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  // Page stylisée avec de la couleur verte, des écritures en gras, une plus ou moins grosse police selon les parties
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
});

export default FormComponent;