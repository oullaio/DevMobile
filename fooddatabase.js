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
  });