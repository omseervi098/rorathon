// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
} from "react-native";
import { Audio } from "expo-av";

const SpeechToTextScreen = ({ route, navigation }) => {
  const [recording, setRecording] = React.useState();
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcription, setTranscription] = React.useState("");
  const [sound, setSound] = React.useState();
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(undefined);
      setSound(recording);
      setIsRecording(false);
      console.log("uri: ", uri);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const playSound = async (recording) => {
    try {
      await Audio.Sound.createAsync(
        { uri: sound.getURI() },
        { shouldPlay: true }
      );

      console.log("Playing Sound");
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingTop: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              backgroundColor: "#e5e5e5",
              borderRadius: 10,
              borderColor: "#000",
              borderWidth: 1,
              height: 400,
              width: 350,
              marginBottom: 16,
            }}
          >
            {transcription}
          </Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {!isRecording ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => startRecording()}
            >
              <Text>Start Recording</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => stopRecording()}
            >
              <Text>Stop Recording</Text>
            </TouchableOpacity>
          )}
          {sound && (
            <TouchableOpacity style={styles.button} onPress={() => playSound()}>
              <Text>Play Sound</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 330,
    marginTop: 16,
  },
});
export default SpeechToTextScreen;
