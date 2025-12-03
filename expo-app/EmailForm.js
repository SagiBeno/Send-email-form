import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, Button, Alert, StyleSheet, Linking } from 'react-native';

export default function EmailForm() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const isMailAvailable = "TODO add to state"

  const sendEmail = async () => {
    console.log('sendEmail called - recipients:', recipients);

    if (!recipients.trim()) {
      Alert.alert('Error', 'Please enter recipient email');
      return;
    }

    const emailUrl = `mailto:${recipients}?subject=${encodeURIComponent(subject || 'No subject')}&body=${encodeURIComponent(body || '')}`;
    console.log('Opening URL:', emailUrl);

    try {
      const supported = await Linking.canOpenURL(emailUrl);
      console.log('Linking supported:', supported);

      if (supported) {
        await Linking.openURL(emailUrl);
        console.log('Email app opened successfully');
      } else {
        console.log('No email app found');
        Alert.alert('Error', 'No email app installed on device');
      }
    } catch (error) {
      console.warn('Linking error:', error);
      Alert.alert('Error', `Failed to open email: ${error.message}`);
    }
  };

  return (
  <>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
    
        <Text style={styles.title}>Email Form</Text>

        <Text>To: </Text>
        <TextInput
          style={styles.input}
          placeholder='To: '
          value={recipients}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text>Subject: </Text>
        <TextInput
          style={styles.input}
          value={subject}
          placeholder='Subject: '
          autoCapitalize='none'
        />

        <Text>Body: </Text>
        <TextInput
          style={styles.input}
          value={body}
          placeholder='Body ...'
          multiline
          textAlignVertical="top"
        />

        <Button title="Send Email" onPress={() => sendEmail()} disabled={!!"TODO"} />


      </ScrollView>
    </SafeAreaView>
  </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 30, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16
  },
  body: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top'
  },
});
