import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import FoodDatabaseScreen from '../Screens/fooddatabase';
import FormComponent from '../Screens/HealthGoal';
import MealPlannerScreen from '../Screens/MealPlanner';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Health Goals"
            component={FormComponent}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name="fitness-outline" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Food Database"
            component={FoodDatabaseScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name="restaurant" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Meal Planner"
            component={MealPlannerScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name="md-calendar-sharp" color={color} size={size} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default Navigator;