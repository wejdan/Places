import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import colors from '../constants/colors';

function Input({label, keyboardType, secure, onUpdateValue, value, error}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error != null && styles.inputInvalid]}
        autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: colors.primary,
    marginBottom: 8,
    fontSize: 12,
  },

  input: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 14,

    color: colors.secondery,
    backgroundColor: colors.primary50,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
