import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addPlace} from '../store/actions/placesActions';
import Button from '../Componenets/Button';
import ButtonIcon from '../Componenets/ButtonIcon';
import Input from '../Componenets/Input';
import Placeholder from '../Componenets/Placeholder';
import RNFS from 'react-native-fs';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Map from '../Componenets/Map';
import {launchCam, era} from 'react-native-image-picker';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Places.db'});
const AddPlace = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [addingPlace, setAddingPlace] = useState(false);

  const [id, setId] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  useEffect(() => {
    if (route.params) {
      const PickedLocation = route.params.PickedLocation;
      setLocation(PickedLocation);
    }
  }, [route]);

  const openPicker = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        let options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option',
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        const response = await launchCamera(options);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          setImage(response.assets[0].uri);
        }
      } else {
        alert('Camera permission denied');
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (!title.trim() || !image || !location) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [title, image, location]);
  const GetCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  };

  const getLocationName = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=ar`,
    );

    const responseJson = await response.json();

    return responseJson.display_name;
  };

  const handleAddplace = async () => {
    setAddingPlace(true);
    const dest = RNFS.ExternalDirectoryPath + `/${id}.jpg`;
    const locationName = await getLocationName(
      location.latitude,
      location.longitude,
    );
    RNFS.moveFile(image, dest)
      .then(() => {
        const newPlace = {
          id,
          title,
          img: dest,
          location,
          locationName,
        };
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_places (place_id, place_title, place_img, place_name, latitude, longitude) VALUES (?,?,?,?,?,?)',
            [
              id,
              title,
              dest,
              locationName,
              location.latitude,
              location.longitude,
            ],
            (tx, results) => {
              console.log(
                'Results',
                results.rowsAffected,
                results.rowsAffected > 0,
              );
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'You are Registered Successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Home'),
                    },
                  ],
                  {cancelable: false},
                );
              } else alert('Registration Failed');
            },
          );
        });
        dispatch(addPlace(newPlace));

        setAddingPlace(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    setId(new Date().getTime());
  }, []);
  return (
    <ScrollView style={styles.form}>
      <View>
        <Input
          label="Title"
          onUpdateValue={text => {
            setTitle(text);
          }}
          value={title}
        />
        {image != null ? (
          <View style={styles.imgContainer}>
            <Image source={{uri: image}} style={styles.img} />
          </View>
        ) : (
          <Placeholder message="No image taken yet" />
        )}

        <ButtonIcon
          icon="camera"
          onPress={() => {
            openPicker();
          }}>
          Take Image
        </ButtonIcon>

        {location ? (
          <View style={styles.mapContainer}>
            <Map location={location} />
          </View>
        ) : (
          <Placeholder message="No locaion picked yet" />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View>
            <ButtonIcon icon="map-marker" onPress={GetCurrentLocation}>
              Locate user
            </ButtonIcon>
          </View>
          <View>
            <ButtonIcon
              icon="map"
              onPress={() => {
                navigation.navigate('Map', {
                  location: location,
                });
              }}>
              Pick on Map
            </ButtonIcon>
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            disabled={isButtonDisabled || addingPlace}
            loading={addingPlace}
            onPress={handleAddplace}>
            Add Place
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPlace;
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 30,
  },

  buttons: {
    marginTop: 20,
    marginBottom: 40,
  },
  error: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  img: {
    height: 200,
    width: '100%',
  },
  imgContainer: {
    marginVertical: 15,
    height: 200,

    borderRadius: 4,
    overflow: 'hidden',
  },
  mapContainer: {
    marginVertical: 15,
    height: 200,

    borderRadius: 4,
    overflow: 'hidden',
  },

  bottomLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
});
