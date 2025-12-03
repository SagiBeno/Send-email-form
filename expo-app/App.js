/** npx create-expo-app expo-app --template blank@49 */
/** TODO install cors */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EmailForm from './EmailForm';

export default function App() {
  return (
    <View style={styles.container}>
      <EmailForm />
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
