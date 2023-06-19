import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Picker } from 'react-native';

const FoodDatabaseScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [modalVisible, setModalVisible] = useState(false);
  const [mealPlan, setMealPlan] = useState({
    Day: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
  }) };

//API Handler

const handleSearch = () => {
    if (searchQuery) {
      // Récupération de l'api et écriture du code suivant la documentation sur le site de l'API

      const apiKey = 'BG41bGA7ErcRYvTHwfqpeA==KdAywloxAsSjgC9p';
      const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=` + searchQuery;
      const headers = {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      };

      fetch(apiUrl, { method: 'GET', headers })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.length > 0) {
            setFoodInfo(result[0]); // On récupère les informations si la nourriture renseignée dans la zone de texte existe
          } else {
            setFoodInfo(null);
            console.log("Food not found"); 
          }
        })
        .catch(error => {
          console.error('Error: ', error); // Gestion de l'erreur si la nourriture entrée dans le code n'est pas reconnue
        });
    } else {
      console.log('Please enter a search query');
    }
  };
