import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {removePlace} from '../store/actions/placesActions';
const RemovePlaceButton = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Pressable
      style={{marginRight: 10}}
      onPress={() => {
        dispatch(removePlace(props.id));
        navigation.navigate('Home');
      }}>
      <Icon name="trash-bin" size={24} color={colors.secondery} />
    </Pressable>
  );
};

export default RemovePlaceButton;
