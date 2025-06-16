import * as Location from 'expo-location';
import React, { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AuthContext } from '@/utils/authContext';

export default function TabTwoScreen() {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const auth = useContext(AuthContext);
  const userID = auth.username;

  const handleLogVisit = async () => {
    if (!description) {
      Alert.alert('Missing Info', 'Please enter a Description');
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location access is required');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const lincoln = `${auth.username}-${Date.now()}`;

      const payload = {
        lincoln,
        userID,
        title,
        description,
        locationlat: latitude,
        locationlong: longitude,
      };

      const response = await fetch('https://sxjumw54s2.execute-api.us-east-2.amazonaws.com/dev/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': process.env.EXPO_PUBLIC_CLIENT_ID_LOCATIONS,
          'x-client-secret': process.env.EXPO_PUBLIC_CLIENT_SECRET_LOCATIONS,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json() || {};

      if (response.ok) {
        Alert.alert('Success', 'Location logged!');
        setDescription('');
        setTitle('');
      } else {
        Alert.alert('Error', result.error || 'Failed to log');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="mappin.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Log a visit to a county fair</ThemedText>
      </ThemedView>

      <ThemedText>Capture your county fair visit in time to look back on it</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="County Fair Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a description"
        value={description}
        onChangeText={setDescription}
      />


      <Button
        title="I'm at a county fair!"
        onPress={handleLogVisit}
        color="blue"
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: 'alice-blue',
    color: 'white',
    fontWeight: 'bold'
  },
});
