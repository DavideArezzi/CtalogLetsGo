import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams, Screen } from '../types';
import HomeScreen from '../../screen/home/home_page';
import FavoritesScreen from '../../screen/favorite/favorites_page';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator<TabParams>();
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIconStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarIcon: ({ focused }) => {
            const iconName = () => {
              switch (route.name) {
                case Screen.Home:
                  return 'home';
                case Screen.Favorites:
                  return 'heart';
              }
            };

            return <Ionicons name={iconName()} size={24} color={focused ? '#3579f6' : '#6d7075'} />;
          },
        };
      }}>
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
