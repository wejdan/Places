import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
const ImagePick = () => {
  const [filePath, setFilePath] = useState({});

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
        console.log(response);

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

          console.log('--------------------------------------------', source);
          setFilePath(source);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text>
      <View style={styles.container}>
        {/*<Image 
                source={{ uri: filePath.path}} 
                style={{width: 100, height: 100}} />*/}

        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        {/*
                <Button
                  title="Choose File"
                  onPress={chooseFile} />
              */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={openPicker}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ImagePick;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
