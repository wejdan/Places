import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import colors from '../constants/colors';

function Button({children, onPress, disabled, loading}) {
  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
        <Text
          style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.accent,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'center',
    height: 40,
    width: '100%',
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: '#e3e3e3',
    elevation: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.primary50,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#a9abb8',
  },
});
