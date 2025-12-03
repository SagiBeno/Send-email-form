import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, Button, Alert, StyleSheet, Linking } from 'react-native';

export default function EmailForm() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isMailAvailable, setIsMailAvailable] = useState(false);

  const isValidEmail = (email) => {
    if (!email) return false;
    if (email.includes(' ') || !email.includes('@')) return false;

    const emailparts = email.split('@');

    if (emailparts.length != 2 || emailparts[1].split('.')[1]?.length < 2) return false;
    
    if (!emailparts[0] || !emailparts[1] || !emailparts[1].includes('.')) return false;

    const dotIdx = emailparts[1].lastIndexOf('.');
    if (dotIdx === 0 || dotIdx === (emailparts[1].length - 1)) return false;

    return true;
  }

  const handleEmailInput = (email) => {
    setRecipients(email);
    setIsMailAvailable(isValidEmail(email));
  }

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
          onChangeText={(email) => handleEmailInput(email)}
        />

        <Text>Subject: </Text>
        <TextInput
          style={styles.input}
          value={subject}
          placeholder='Subject: '
          autoCapitalize='sentences'
          onChangeText={setSubject}
        />

        <Text>Body: </Text>
        <TextInput
          style={styles.body}
          value={body}
          placeholder='Body ...'
          multiline
          textAlignVertical="top"
          autoCapitalize='sentences'
          onChangeText={setBody}
        />

        <Button title="Send Email" onPress={() => sendEmail().catch(console.warn)} disabled={!isMailAvailable || !subject || !body} />
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
    fontSize: 16,
    minWidth: 200,
    width: 250,
    maxWidth: 300
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
