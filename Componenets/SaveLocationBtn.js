import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';

const SaveLocationBtn = props => {
  return (
    <TouchableOpacity style={{marginRight: 10}} onPress={props.onPress}>
      <Icon name="ios-save" size={24} color={colors.secondery} />
    </TouchableOpacity>
  );
};

export default SaveLocationBtn;
