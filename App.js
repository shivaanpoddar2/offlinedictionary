import * as React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import * as Speech from 'expo-speech';

var mean;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      lexicalCategory: '',
      meaning: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#ff00ff'}
          centerComponent={{
            text: 'DICTIONARY',
            style: { color: '#ffffff', fontSize: 20 },
          }}
        />
        <Text style={styles.displayText11}>ENTER A WORD </Text>
        <TextInput
          style={styles.inputBox}
          autoCorrect="true"
          onChangeText={(text) => {
            this.setState({ word: text });
          }}
          value={this.state.word}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            mean = db[this.state.word];
            if (mean === undefined || mean === null) {
              alert(
                'Please enter a word, or check your spelling and try again!'
              );
            }
            this.setState({
              word: db[this.state.word].word,
              lexicalCategory: db[this.state.word].lexicalCategory,
              meaning: db[this.state.word].definition,
            });
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <Text style={styles.displayText}>WORD:</Text>
        <Text style={styles.displayText1}>{this.state.word}</Text>
        <Text style={styles.displayText}>LEXICAL CATEGORY:</Text>
        <Text style={styles.displayText1}>{this.state.lexicalCategory}</Text>
        <Text style={styles.displayText}>DEFINITION:</Text>
        <Text style={styles.displayText1}>{this.state.meaning}</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => Speech.speak(this.state.word)}>
            <Text style={styles.displayText2}>PRONUNCIATION</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              this.setState({
                word: '',
                lexicalCategory: '',
                meaning: '',
              });
            }}>
            <Text style={styles.displayText2}>CLEAR</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.displayText12}>
          WORDS YOU CAN SEARCH FOR: intrigue, mesmerise, procastinate, tree,
          sacerdotal
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  inputBox: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'yellow',
    borderRadius: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    flex: 0.1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'underline',
  },
  displayText1: {
    flex: 0.1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
  displayText11: {
    flex: 0.1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue',
  },
  button2: {
    width: 150,
    borderWidth: 4,
    marginTop: 20,
    borderColor: 'purple',
    backgroundColor: 'orange',
    alignSelf: 'center',
    height: 30,
    marginRight: 10,
  },
  displayText2: {
    textAlign: 'center',
    fontSize: 15,
    color: 'purple',
    fontWeight: 'bold',
  },
  displayText12: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
