import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddPlace from '../screens/AddPlace';
import PlaceDetalis from '../screens/PlaceDetalis';
import MapScreen from '../screens/MapScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import AddPlaceButton from '../Componenets/AddPlaceButton';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import CamaraScreen from '../screens/CamaraScreen';
import RemovePlaceButton from '../Componenets/RemovePlaceButton';
const defualtScreenOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  contentStyle: {backgroundColor: colors.secondery},
  headerTintColor: colors.secondery,
};

const Stack = createNativeStackNavigator();
const MainNavgator = () => {
  return (
    <Stack.Navigator screenOptions={defualtScreenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Your Favourite Places',

          headerRight: () => <AddPlaceButton />,
        }}
      />

      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{title: 'Add Place'}}
      />
      <Stack.Screen
        name="Details"
        component={PlaceDetalis}
        options={({route}) => ({
          title: route.params.title,
          headerRight: () => <RemovePlaceButton id={route.params.id} />,
        })}
      />
      <Stack.Screen
        name="Camara"
        component={CamaraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={colors.primary} />
      <MainNavgator />
    </NavigationContainer>
  );
};

export default RootNavigation;
