import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions} from 'react-native';
import Button from '../Componenets/Button';
import SaveLocationBtn from '../Componenets/SaveLocationBtn';
let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 5; //Increase or decrease the zoom level dynamically
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MapScreen = ({route, navigation}) => {
  const {location} = route.params;
  const {readonly} = route.params;
  const [coords, setCoords] = useState({latitude: 0, longitude: 0});
  const handleSave = () => {
    //   setLocation(coords);
    navigation.navigate('AddPlace', {PickedLocation: coords});
  };

  React.useLayoutEffect(() => {
    if (!readonly) {
      navigation.setOptions({
        headerRight: () => (
          <SaveLocationBtn
            onPress={() => {
              handleSave();
            }}
          />
        ),
      });
    }
  }, [coords, readonly]);
  useEffect(() => {
    if (location) {
      setCoords(location);
    } else {
      Geolocation.getCurrentPosition(info => {
        setCoords({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <View style={styles.body}>
      <MapView
        style={styles.map}
        onPress={event => {
          if (!readonly) {
            setCoords(event.nativeEvent.coordinate);
          }
        }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.015 * 1,
          longitudeDelta: 0.0121 * 1,
        }}>
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  btn: {
    position: 'absolute',
    bottom: 10,

    left: '50%',
    marginLeft: -50,

    width: 100,
  },
  highlight: {
    fontWeight: '700',
  },
});
