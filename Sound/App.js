import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import First from './screens/First'
import Second from './screens/Second'
import Third from './screens/Third'
import Fourth from './screens/Fourth'
import StartScreen from './screens/StartScreen'

export default function App() {
  const [selectedTask, setSelectedTask] = useState(null);

  const renderTask = () => {
    switch (selectedTask) {
      case 'First':
        return <First onBack={() => setSelectedTask(null)} />;
      case 'Second':
        return <Second onBack={() => setSelectedTask(null)} />;
      case 'Third':
        return <Third onBack={() => setSelectedTask(null)} />;
      case 'Fourth':
        return <Fourth onBack={() => setSelectedTask(null)} />;
      default:
        return <StartScreen onNavigate={setSelectedTask} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderTask()} 
      <StatusBar style="auto" />
    </View>
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
