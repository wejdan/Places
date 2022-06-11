import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../constants/colors';
import Card from '../Componenets/Card';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'PlacesDatabase.db'});
const HomeScreen = ({navigation}) => {
  const places = useSelector(store => store.places.placesList);
  let [flatListItems, setFlatListItems] = useState([]);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql('SELECT * FROM table_places', [], function (tx, res) {
        console.log('item:', res.rows.length);

        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_places', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_places(place_id INTEGER PRIMARY KEY, place_title TEXT, place_img TEXT, place_name TEXT, latitude TEXT, longitude TEXT)',
            [],
          );
        } else {
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i) temp.push(res.rows.item(i));
          setFlatListItems(temp);
        }
      });
    });
  }, []);
  if (places.length == 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: colors.primary50}}>No places added yet</Text>
      </View>
    );
  }
  return (
    <ScrollView style={{padding: 20}}>
      {places.map(place => {
        return <Card place={place} key={place.id} />;
      })}
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 100,
    padding: 30,
  },
});
