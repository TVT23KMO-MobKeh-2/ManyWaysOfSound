import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10, // space between buttons
    width: '80%', // set button width
  },
});
