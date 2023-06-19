import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Picker,
} from "react-native";

const FoodDatabaseScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodInfo, setFoodInfo] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [modalVisible, setModalVisible] = useState(false);
  const [mealPlan, setMealPlan] = useState({
    Day: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
  });

  //API Handler

  const handleSearch = () => {
    if (searchQuery) {
      // Récupération de l'api et écriture du code suivant la documentation sur le site de l'API

      const apiKey = "BG41bGA7ErcRYvTHwfqpeA==KdAywloxAsSjgC9p";
      const apiUrl =
        `https://api.api-ninjas.com/v1/nutrition?query=` + searchQuery;
      const headers = {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      };

      fetch(apiUrl, { method: "GET", headers })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.length > 0) {
            setFoodInfo(result[0]); // On récupère les informations si la nourriture renseignée dans la zone de texte existe
          } else {
            setFoodInfo(null);
            console.log("Food not found");
          }
        })
        .catch((error) => {
          console.error("Error: ", error); // Gestion de l'erreur si la nourriture entrée dans le code n'est pas reconnue
        });
    } else {
      console.log("Please enter a search query");
    }
  };

  const handleFoodSelection = (food) => {
    // Le modal qui s'affiche lorsque on appuie sur la fenêtre montrant la nourriture et les apports caloriques
    setSelectedFood(food);
    setModalVisible(true);
  };

  const handleAddToMealPlan = () => {
    // Dans la fenêtre, on peut renseigner la quantité de la nourriture, le repas pour lequel cette nourriture est mangée et on a la possibilité de l'ajouté dans le meal plan
    if (selectedFood && quantity && selectedMeal) {
      const updatedMealPlan = { ...mealPlan };
      updatedMealPlan.Day[selectedMeal].push({ food: selectedFood, quantity });
      setMealPlan(updatedMealPlan);
      console.log("Meal Plan :", updatedMealPlan);
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Food Database</Text>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for a food..."
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} color="#32CD32" />
      </View>
      {foodInfo && (

        // TouchableOpacity qui nous permet d'appuyer sur le résultat de la nourriture entrée dans le champ de texte afin de faire apparaître la fenêtre donnant plus de détails
        <TouchableOpacity onPress={() => handleFoodSelection(foodInfo)} style={styles.foodItem}>
          <Text style={[styles.foodName, {color: '#008000'}]}>Food Name: {foodInfo.name}</Text>
          <Text style={styles.calorieContent}>Calorie Content: {foodInfo.calories} kcal</Text>
        </TouchableOpacity>
      )}

      {/* Modal qui devient visible en faisant une animation de slide et en rendant transparent le fond de l'application */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
      
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, {color: '#008000'}]}>Add to Meal Plan</Text>
            <Text style={styles.modalLabel}>Food : {selectedFood?.name}</Text>
            <Text style={[styles.modalLabel, {color: '#008000'}]}>Quantity :</Text>
            <TextInput
              style={styles.modalInput}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Enter quantity..."
              keyboardType="numeric"
            />
            <Text style={styles.modalLabel}>Meal Type :</Text>

            {/* Le picker permettant de choisir pour quel repas on met la nourriture entrée dans le champ de texte */}
            <Picker
              style={styles.modalInput}
              selectedValue={selectedMeal}
              onValueChange={itemValue => setSelectedMeal(itemValue)}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snack" value="Snack" />
            </Picker>
            <View style={styles.modalButtonContainer}>

            {/* Les boutons permettant d'ajouter la nourriture ou d'annuler ce qui a été fait */}
              <Button title="Add to Meal Plan" onPress={handleAddToMealPlan} color="#32CD32" />
              <View style={styles.buttonSpacing} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#32CD32" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
