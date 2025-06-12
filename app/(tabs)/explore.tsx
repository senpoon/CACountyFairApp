import { Alert, Button, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
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
        <ThemedText type="title">Need to log a visit to the county fair?</ThemedText>
      </ThemedView>
      <ThemedText>If you've successfully made your way to a county fair, press the button below and it will capture this visit on the map and timeline.</ThemedText>
        <Button
          title="I'm at a county fair!"
          onPress={() => Alert.alert('Location logged!')}
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
  logButton: {
    alignItems: 'center',
    width: 'auto',
    backgroundColor: 'cyan'
  }
});
