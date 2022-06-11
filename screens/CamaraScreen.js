import {View, Text} from 'react-native';
import React from 'react';
import Camara from '../Componenets/Camara';
const CamaraScreen = ({route}) => {
  const {setImage} = route.params;

  return (
    <View style={{flex: 1}}>
      <Camara setImage={setImage} />
    </View>
  );
};

export default CamaraScreen;
