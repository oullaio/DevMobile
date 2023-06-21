import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FoodDatabaseScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [mealPlan, setMealPlan] = useState({
    Monday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Tuesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Wednesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Thursday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Friday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Saturday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Sunday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
  });

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

  const handleFoodSelection = food => {
    // Le modal qui s'affiche lorsque on appuie sur la fenêtre montrant la nourriture et les apports caloriques
    setSelectedFood(food);
    setModalVisible(true);
  };

  const handleAddToMealPlan = () => {

    // Dans la fenêtre, on peut renseigner la quantité de la nourriture, le repas pour lequel cette nourriture est mangée et on a la possibilité de l'ajouté dans le meal plan
    if (selectedFood && quantity && selectedMeal && selectedDay) {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[selectedDay][selectedMeal].push({ food: selectedFood, quantity });
    setMealPlan(updatedMealPlan);
    console.log('Meal Plan:', updatedMealPlan);
    setModalVisible(false);
  }
  };

  // Fonction permettant de gérer la suppression des aliments dans le Meal Plan
  const handleRemoveFood = (day, mealType, index) => {
    const updatedMealPlan = { ...mealPlan }; // Crée une copie de l'objet Meal Plan avec un opérateur spread
    updatedMealPlan[day][mealType].splice(index, 1); // Retire l'aliment du repas de la journée sélectionné avec la méthode splice
    setMealPlan(updatedMealPlan);
    console.log("After removing :", updatedMealPlan);
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Zone de texte de la page et bouton pour rechercher dans l'API} */}
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
            <Text style={[styles.foodName, { color: '#008000' }]}>Food Name: {foodInfo.name}</Text>
            <Text style={styles.calorieContent}>Calorie Content: {foodInfo.calories} kcal</Text>
            <Text style={styles.calorieContent}>Serving Size: {foodInfo.serving_size_g} g</Text>
          </TouchableOpacity>
        )}

        {/* Affichage du Meal Plan sur la fenêtre */}
        <Text style={styles.heading}>Meal Plan</Text>
        <FlatList
          data={Object.entries(mealPlan)} // Iteration sur l'objet Meal Plan et conversion en un array de clé-valeurs
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => ( // Rend chaque élément de la list
            <View style={styles.mealPlanItem}>

              {/* Affiche le jour du Meal Plan */}
              <Text style={styles.mealPlanItemDay}>{item[0]}</Text> 
              <View style={styles.mealPlanItemMealsContainer}>
                {Object.entries(item[1]).map(([mealType, mealFoods]) => ( // Effectue une itération sur les repas de la journée
                  <View key={mealType} style={styles.mealPlanItemMealContainer}>
                    <Text style={styles.mealPlanItemMealType}>{mealType}</Text>
                    <FlatList
                      data={mealFoods}
                      keyExtractor={(index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <View style={styles.mealPlanItemFoodContainer}>
                          <View style={styles.mealPlanItemFoodDetails}>
                          
                          {/* Ici, on affiche le nom de l'aliment et la quantité */}
                            <Text style={styles.mealPlanItemFood}>
                              - {item.food.name} ({item.quantity}) 
                            </Text>
                            
                          </View>
                          <TouchableOpacity
                            onPress={() => handleRemoveFood(item.day, mealType, index)} // Appelle la méthode handleRemoveFood losqu'on clique sur la croix rouge puis l'affiche à côté de chaque aliment dans le Meal Plan
                            style={styles.removeIconContainer}
                          >
                            <Icon name="close-circle-outline" size={24} color="red" />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        />

        {Object.entries(mealPlan).map(([day, meals]) => ( // Une autre itération sur l'objet Meal Plan
          <View key={day} style={styles.dayTotalContainer}>

            {/* Calcul et affiche les calories totaux par jour en arrondissant le nombre à deux chiffres après la virgule */}
         <Text style={styles.dayTotalLabel}>{day} Total Calories:</Text>
            <Text style={styles.dayTotalValue}>
              {meals.Breakfast.concat(meals.Lunch, meals.Snack, meals.Dinner)
              .reduce((totalCalories, meal) => totalCalories + meal.food.calories * meal.quantity, 0).toFixed(2)} 
              kcal
    </Text>
  </View>
))}

        {/* Modal qui devient visible en faisant une animation de slide et en rendant transparent le fond de l'application */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitle, { color: '#008000' }]}>Add to Meal Plan</Text>
              <Text style={styles.modalLabel}>Food: {selectedFood?.name}</Text>
              <Text style={[styles.modalLabel, { color: '#008000' }]}>Quantity:</Text>
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
              <Text style={styles.modalLabel}>Day:</Text>
              <Picker
                style={styles.modalInput}
                selectedValue={selectedDay}
                onValueChange={itemValue => setSelectedDay(itemValue)}
              >
                {/* Ce picker permet de préciser le jour pour lequel l'aliment est enregistré */}
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  input: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  foodItem: {
    borderWidth: 1,
    borderColor: '#008000',
    padding: 10,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008000',
  },
  calorieContent: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalInput: {
    height: 40,
    borderColor: '#008000',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonSpacing: {
    width: 10,
  },
  mealPlanItem: {
    marginBottom: 20,
  },
  mealPlanItemDay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#008000',
  },
  mealPlanItemMealsContainer: {
    marginLeft: 20,
  },
  mealPlanItemMealContainer: {
    marginBottom: 10,
  },
  mealPlanItemMealType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#008000',
  },
  mealPlanItemFood: {
    fontSize: 14,
  },
  removeIconContainer: {
    marginLeft: 10,
  },
  mealPlanItemFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayTotalContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},
dayTotalLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#008000',
},
dayTotalValue: {
  fontSize: 16,
},
});

export default FoodDatabaseScreen;