import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import styles from '../styles.js';

export default function Fourth({onBack}) {
  //Kommentoitu kirjoitetut koska ei mahdu kortteihin
  //const allSounds = ['KOLME', 'NELJÄ', 'YKSI', 'KAKSI', 'VIISI', 'KUUSI', 'SEITSEMÄN', 'KAHDEKSAN', 'YHDEKSÄN', 'KYMMENEN'];
  const allSounds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const [sound, setSound] = useState();
  const [tapSound, setTapSound] = useState();

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [tryCounter, setTryCounter] = useState(0);
  const [lockBoard, setLockBoard] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/victory.mp3'));
    setSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(({ didJustFinish }) => {
      if (didJustFinish) sound.unloadAsync();
    });
  }

  async function playTapSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/tap.mp3'));
    setTapSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(({ didJustFinish }) => {
      if (didJustFinish) sound.unloadAsync();
    });
  }

 //generoidaan ja sekoitetaan kortit
  const generateCards = () => {
    const selectedSounds = allSounds.sort(() => Math.random() - 0.5).slice(0, 3);
    const soundPairs = [...selectedSounds, ...selectedSounds]; 
    const shuffledPairs = soundPairs.sort(() => Math.random() - 0.5); 
    setCards(shuffledPairs);
  };

  const handlePress = (index) => {
    if (lockBoard || matchedCards.includes(index) || flippedCards.includes(index)) return;
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    Speech.speak(cards[index]);

    if (newFlippedCards.length === 2) {
      setTryCounter(tryCounter + 1);
      checkMatch(newFlippedCards);
    } 
  };

  const checkMatch = (flippedCards) => {
    const [firstIndex, secondIndex] = flippedCards;
    if (cards[firstIndex] === cards[secondIndex]) {
      const newMatchedCards = [...matchedCards, firstIndex, secondIndex];
      setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      setFlippedCards([]);
      
      if (newMatchedCards.length === cards.length) {
        playSound();
        Alert.alert(
          'Hienosti!', 
          `Löysit kaikki parit ${tryCounter+1} yrityksellä! Pelaa uudelleen painamalla 'Pelaa uudelleen'`
        );
      }
    } else {
      setLockBoard(true);
      setTimeout(() => {
        setFlippedCards([]);
        setLockBoard(false);
      }, 1000);
    }
  };

  const restartGame = () => {
    playTapSound();
    generateCards();
    setFlippedCards([]);
    setMatchedCards([]);
    setTryCounter(0);
    setLockBoard(false);
  };

  useEffect(() => { 
    generateCards();
  } , []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Muistipeli</Text>
      <Text style={styles.taskText}>Yritykset: {tryCounter}</Text>
      <View style={styles.grid}>
        {cards.map((sound, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              flippedCards.includes(index) || matchedCards.includes(index) ? styles.flippedCard : styles.unflippedCard
            ]}
            onPress={() => handlePress(index)}
            disabled={matchedCards.includes(index)}
          >
            <Text style={styles.taskText}>
              {flippedCards.includes(index) || matchedCards.includes(index) ? sound : "?"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Pelaa uudelleen" onPress={restartGame} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Palaa takaisin" onPress={onBack} />
      </View>
    </View>
  );
};