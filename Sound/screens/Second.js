import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';

export default function Second({ onBack }) {
    //Tilamuuttujat tekstille, äänen korkeudelle ja puheen nopeudelle
    const [text2Speech, setText2Speech] = useState('')
    const [pitch, setPitch] = useState(1.00)
    const [rate, setRate] = useState(1.00)

    //funktio puhumiselle
    const speak = (text) => {
        Speech.stop()//keskeytetään mahdollinen aiempi puhe
        Speech.speak(text, { pitch: pitch, rate: rate }) //Puhutaan annettu teksti annetuilla asetuksilla
    };

    //renderöinti, jossa otsikko, äänenkorkeuden ja puhenopeuden arvot ja liukukytkimet niiden säätämiseen, tekstikenttä mihin voi syöttää halutun tekstin
    //sekä nappi puhe-funktion kutsumiseen ja paluuseen.
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Text to Speech</Text>
            <Text>Pitch: {pitch.toFixed(2)}</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0.01}
                maximumValue={2}
                value={pitch}
                onValueChange={(value) => setPitch(value)}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
            />
            <Text>Rate: {rate.toFixed(2)}</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0.01}
                maximumValue={2}
                value={rate}
                onValueChange={(value) => setRate(value)}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
            />
            <TextInput
                style={{ marginBottom: 8 }}
                value={text2Speech}
                onChangeText={(newText) => setText2Speech(newText)}
                placeholder='Input text to speech' />
            <View style={{ marginBottom: 8 }}>
                <Button title='SPEAK' onPress={() => speak(text2Speech)} />
            </View>
            <View style={{ marginBottom: 8 }}>
                <Button title="Palaa takaisin" onPress={onBack} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    }
});