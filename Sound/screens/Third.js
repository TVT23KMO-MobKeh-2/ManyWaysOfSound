import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import styles from '../styles';

export default function Third({ onBack }) {
  const [sound, setSound] = useState();
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedBalls, setSelectedBalls] = useState(Array(5).fill(false));
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [lastTaskIndex, setLastTaskIndex] = useState(null);
  const [usedTasks, setUsedTasks] = useState([]);

  const tasks = [
    {
      task: 'Annilla on 2 omenaa, ja hänen kaverinsa Liisa tuo 1 omenan lisää. Kuinka monta omenaa heillä on yhteensä?',
      readTask: 'Annilla on kaksi omenaa, ja hänen kaverinsa Liisa tuo yhden omenan lisää. Kuinka monta omenaa heillä on yhteensä?',
      answer: 3
    },
    {
      task: 'Matti ostaa kaupasta 1 suklaapatukan joka maksaa 1 euron. Matilla on 6 euroa mukana, paljonko Matille jää euroja ostoksen jälkeen?',
      readTask: 'Matti ostaa kaupasta yhden suklaapatukan joka maksaa yhden euron. Matilla on kuusi euroa mukana, paljonko Matille jää euroja ostoksen jälkeen?',
      answer: 5
    },
    {
      task: 'Pihalla leikkii 4 lasta, ja 2 lasta lähtee syömään. Kuinka monta lasta leikkii nyt pihalla?',
      readTask: 'Pihalla leikkii neljä lasta, ja kaksi lasta lähtee syömään. Kuinka monta lasta leikkii nyt pihalla?',
      answer: 2
    },
    {
      task: 'Marialla on 3 keksiä, ja hän saa 2 keksiä lisää mummoltaan. Kuinka monta keksiä hänellä on nyt?',
      readTask: 'Marialla on kolme keksiä, ja hän saa kaksi keksiä lisää mummoltaan. Kuinka monta keksiä hänellä on nyt?',
      answer: 5
    },
    {
      task: 'Joonas ja Aino pelaavat lautapeliä. Joonas heittää noppaa ja saa 1, Aino saa 2. Kuinka paljon he saivat yhteensä?',
      readTask: 'Joonas ja Aino pelaavat lautapeliä. Joonas heittää noppaa ja saa ykkösen, Aino saa kakkosen. Kuinka paljon he saivat yhteensä?',
      answer: 3
    },
    {
      task: 'Korissa on 2 omenaa ja 3 banaania. Kuinka monta hedelmää korissa on yhteensä?',
      readTask: 'Korissa on kaksi omenaa ja kolme banaania. Kuinka monta hedelmää korissa on yhteensä?',
      answer: 5
    },
    {
      task: 'Sofialla on 6 lumipalloa, hän heittää lumisodassa 5 lumipalloa. Montako lumipalloa hänellä on jäljellä?',
      readTask: 'Sofialla on kuusi lumipalloa, hän heittää lumisodassa viisi lumipalloa. Montako lumipalloa hänellä on jäljellä?',
      answer: 1
    },
    {
      task: 'Juha löytää maasta 1 euron kolikon, hetken päästä hän löytää 2 euron kolikon. Paljon Juhalla on euroja yhteensä?',
      readTask: 'Juha löytää maasta yhden euron kolikon, hetken päästä hän löytää kahden euron kolikon. Paljon Juhalla on euroja yhteensä?',
      answer: 3
    },
    {
      task: '3 varista istui linjalle, heidän luokseen lensi 5 varista lisää, sen jälkeen 4 varista lensi pois. Montako varista istuu vielä linjalla?',
      readTask: 'Kolme varista istui linjalle, heidän luokseen lensi viisi varista lisää, sen jälkeen neljä varista lensi pois. Montako varista istuu vielä linjalla?',
      answer: 4
    },
  ];

  const correctSound = require('../assets/success.mp3');
  const wrongSound = require('../assets/fail.mp3');

  const selectRandomTask = () => {
    if (usedTasks.length === tasks.length) {
      setUsedTasks([]);
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tasks.length);
    } while (randomIndex === lastTaskIndex || usedTasks.includes(randomIndex));

    setLastTaskIndex(randomIndex);
    setUsedTasks([...usedTasks, randomIndex]);
    return tasks[randomIndex];
  };

  const startTask = () => {
    const task = selectRandomTask();
    setSelectedTask(task);
    resetGame();
    Speech.speak(task.readTask);
    setIsTaskStarted(true);
  };

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const handleBallPress = (index) => {
    const newSelectedBalls = [...selectedBalls];
    newSelectedBalls[index] = !newSelectedBalls[index];
    setSelectedBalls(newSelectedBalls);
    setSelectedCount(newSelectedBalls.filter(Boolean).length);
  };

  const checkAnswer = async () => {
    const correctAnswer = selectedTask.answer;
    setIsCorrect(selectedCount === correctAnswer);

    const soundToPlay = selectedCount === correctAnswer ? correctSound : wrongSound;
    const { sound } = await Audio.Sound.createAsync(soundToPlay);
    await sound.playAsync();
  };

  const resetGame = () => {
    setSelectedCount(0);
    setIsCorrect(null);
    setSelectedBalls(Array(5).fill(false));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pallopeli - valitse oikea määrä palloja</Text>
      <View style={styles.buttonContainer}>
        <Button title="Palaa takaisin" onPress={onBack} />
      </View>
      {isTaskStarted ? (
        <>
          <Text style={styles.taskText}>{selectedTask.task}</Text>
          <Text>Valitse oikea määrä palloja:</Text>
          <View style={styles.ballContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.ball, { backgroundColor: selectedBalls[index] ? 'green' : 'blue' }]}
                onPress={() => handleBallPress(index)}
              />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Tarkista' onPress={checkAnswer} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Kuuntele tehtävä uudelleen' onPress={() => Speech.speak(selectedTask.readTask)} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Uusi tehtävä' onPress={startTask}></Button>
          </View>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title='Aloita' onPress={startTask} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}






