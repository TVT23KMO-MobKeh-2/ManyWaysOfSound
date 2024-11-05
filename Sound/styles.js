import { StyleSheet } from 'react-native';

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
      taskText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
      },
      ballContainer: {
        flexDirection: 'row',
        marginVertical: 10,
      },
      ball: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
      },
  });
  
export default styles;