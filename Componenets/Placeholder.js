import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
const Placeholder = ({message}) => {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
};

export default Placeholder;
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 200,
    backgroundColor: colors.primary50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
