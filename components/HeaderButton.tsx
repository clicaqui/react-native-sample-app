import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
export default function CustomHeaderButton(props:any) {
  return (
      <HeaderButton {...props} IconComponent={Ionicons} size={23}  color={Platform.OS === 'android' ? 'white' : Colors.secondColor }/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
