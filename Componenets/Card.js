import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import {truncateString} from '../utils';
const Card = ({place}) => {
  console.log(place);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      android_ripple={false}
      onPress={() => {
        navigation.navigate('Details', {
          id: place.id,
          title: place.title,
        });
      }}
      style={styles.container}>
      <View style={styles.img}>
        <Image source={{uri: 'file://' + place.img}} style={styles.poster} />
      </View>
      <View style={styles.details}>
        <Text
          style={{
            color: colors.secondery,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {place.title}
        </Text>
        <View style={{width: '80%'}}>
          <Text style={styles.location}>
            {truncateString(place.locationName, 80)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',

    borderRadius: 6,
    elevation: 3,
    height: 100,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  details: {
    padding: 10,
  },
  location: {
    fontSize: 12,
    color: colors.secondery50,
    marginTop: 2,
    textAlign: 'center',
  },
  text: {
    color: colors.primary50,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'right',

    fontSize: 18,
  },
  poster: {
    width: 80,
    height: '100%',
  },
  amount: {
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 70,
  },
});
export default Card;
