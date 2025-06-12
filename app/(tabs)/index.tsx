import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


//Map plugin


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType='mutedStandard'
        initialRegion={{
          latitude: 36.77825,
          longitude: -119.4324,
          latitudeDelta: 10.0922,
          longitudeDelta: 11.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          
          title="Alex's Location"
          description="This is a marker in San Francisco"
        />
        
      </MapView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
