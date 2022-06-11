import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
const AddPlaceButton = props => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{padding: 5}}
      onPress={() => {
        navigation.navigate('AddPlace');
      }}>
      <Icon name="add" size={24} color={colors.secondery} />
    </Pressable>
  );
};

export default AddPlaceButton;
