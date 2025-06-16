import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AuthContext } from '@/utils/authContext';

export default function AccountSettings() {
  const authState = useContext(AuthContext);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person.fill"
          style={styles.headerImage}
        />
      }>
      <View className='justify-center flex-1 p-4'>   
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Account Settings</ThemedText>
        </ThemedView>    
        
        <Button
        title="Log Out"
        onPress={authState.logOut}
        color="blue"
      />
      
      </View>



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
