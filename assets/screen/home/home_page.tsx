import { Button, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../src/types';
import { homeStyles } from '../home/home_styles';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={homeStyles.container}>
      <Text>Schermata Settings</Text>
      <Button title={'Go to favorites'} onPress={() => navigation.navigate('Favorite')} />
    </View>
  );
};

export default HomeScreen;