import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function Third({onBack}) {

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Third</Text>
          <Button title="Palaa takaisin" onPress={onBack} />
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
      },
    });