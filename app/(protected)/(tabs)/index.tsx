import { AuthContext } from '@/utils/authContext';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type FairLocation = {
  lincoln: string;
  userID: string;
  title: string;
  description: string;
  locationlat: number;
  locationlong: number;
};



export default function HomeScreen() {


const [fairLocations, setFairLocations] = useState<FairLocation[]>([]);

const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sxjumw54s2.execute-api.us-east-2.amazonaws.com/dev/locations?userID=' + auth.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': process.env.EXPO_PUBLIC_CLIENT_ID_LOCATIONS,
            'x-client-secret': process.env.EXPO_PUBLIC_CLIENT_SECRET_LOCATIONS,
          },
        });

        const data = await response.json() || {};
        console.log(data)
        setFairLocations(data); // 👈 Now your markers update dynamically
      } catch (error) {
        console.log('Error fetching visits:', error);
      }
    };

    fetchData();
  }, []);


  
  return (
  <View style={styles.container}>
    {fairLocations.length > 0 ? (
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
        {fairLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.locationlat,
              longitude: location.locationlong,
            }}
            title={location.title}
            description={location.description}
          />
        ))}
      </MapView>
    ) : (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text>Loading map...</Text>
</View>

    )}
  </View>
  );}


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
