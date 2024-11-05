import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import styles from '../styles';

export default function StartScreen({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valitse tehtävä:</Text>
      <View style={styles.buttonContainer}>
      <Button onPress={() => onNavigate('First')} title='First' style={{padding: 20}} />
      </View>
      <View style={styles.buttonContainer}>
      <Button onPress={() => onNavigate('Second')} title='Second' />
      </View>
      <View style={styles.buttonContainer}>
      <Button onPress={() => onNavigate('Third')} title='Third' />
      </View>
      <View style={styles.buttonContainer}>
      <Button onPress={() => onNavigate('Fourth')} title='Fourth' />
      </View>
    </View>
  );
}

