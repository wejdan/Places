import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

function ButtonIcon({children, onPress, disabled, icon}) {
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
        <Icon
          name={icon}
          size={22}
          color={colors.primary}
          style={{marginRight: 5}}
        />

        <Text
          style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default ButtonIcon;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,

    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
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
    color: colors.primary,
    fontSize: 14,
  },
  buttonTextDisabled: {
    color: '#a9abb8',
  },
});
