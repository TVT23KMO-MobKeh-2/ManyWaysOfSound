import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Audio } from 'expo-av'

export default function First({ onBack }) {
  const [sound, setSound] = useState();
  const [question] = useState("Montako naulaa kuvassa on?");
  const [options] = useState([2, 3, 4, 5]);
  const correctAnswer = 4;

  //Sound
  async function playSound(isCorrect) {
    const soundUri = isCorrect 
      ? require('../assets/sounds/mixkit-game-level-completed.wav') 
      : require('../assets/sounds/mixkit-arcade-retro-game-over.wav');

    const { sound } = await Audio.Sound.createAsync(soundUri);
    setSound(sound);
    await sound.playAsync();
  }

  //Free up audio resources when component is closed
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === correctAnswer;
    playSound(isCorrect);
    Alert.alert(isCorrect ? "Oikein!" : "Väärin, yritä uudelleen!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tehtävä 1</Text>
      <Text style={styles.question}>{question}</Text>
      <Image 
        source={require('../assets/images/naulat.png')}
        style={styles.image}
      />
      
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAnswer(option)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      
      <Button title="Palaa takaisin" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
}
,
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
