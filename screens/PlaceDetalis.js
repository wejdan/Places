import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../constants/colors';
import ButtonIcon from '../Componenets/ButtonIcon';

const PlaceDetalis = ({route, navigation}) => {
  const places = useSelector(store => store.places.placesList);
  const {id} = route.params;

  const place = places.find(item => item.id == id);

  return (
    <View style={styles.container}>
      <Image source={{uri: 'file://' + place.img}} style={styles.img} />
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.location}>{place.locationName}</Text>
      </View>

      <View style={{marginTop: 20, width: 150}}>
        <ButtonIcon
          icon="map"
          onPress={() => {
            navigation.navigate('Map', {
              location: place.location,
              readonly: true,
            });
          }}>
          View on Map
        </ButtonIcon>
      </View>
    </View>
  );
};

export default PlaceDetalis;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: 300,
    width: '100%',
  },

  location: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
