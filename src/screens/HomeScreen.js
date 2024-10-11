import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Button, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import chargerData from '../assets/chargers.json';
import { getCurrentLocation } from '../services/locationService';
import FloatingButton from '../components/FloatingButton';

const HomeScreen = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCharger, setSelectedCharger] = useState(null);

  const fetchLocation = useCallback(async () => {
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    } catch (error) {
      Alert.alert('Error', `Unable to fetch location: ${error.message}`);
    }
  }, []);

  const handleChargerSelect = useCallback((charger) => {
    setSelectedCharger(charger);
    mapRef.current.animateToRegion({
      latitude: parseFloat(charger.latitude),
      longitude: parseFloat(charger.longitude),
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, []);

  const handleNavigate = useCallback(() => {
    if (!selectedCharger) {
      Alert.alert('No charger selected', 'Please select a charging station to navigate.');
      return;
    }
    const { latitude, longitude, name } = selectedCharger;
    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${name})`,
    });
    Linking.openURL(url);
  }, [selectedCharger]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {chargerData.chargers.map((charger, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(charger.latitude),
                longitude: parseFloat(charger.longitude),
              }}
              title={charger.name}
              description={charger.address}
              onPress={() => handleChargerSelect(charger)}
            />
          ))}
        </MapView>
      )}

      {/* Floating Box to show Charger Details */}
      <View style={styles.floatingBoxContainer}>
        <FloatingButton mapRef={mapRef} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {chargerData.chargers.map((charger, index) => (
            <TouchableOpacity
              key={index}
              style={styles.floatingBox}
              onPress={() => handleChargerSelect(charger)}
            >
              <Text style={styles.chargerTitle}>{charger.name}</Text>
              <Text style={styles.chargerText}>{charger.address}</Text>
              <Text style={styles.chargerText}>{charger.connector_types.join(', ')}</Text>
              {/* Navigation Button */}
              <Button title="Navigate" onPress={handleNavigate} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingBoxContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  floatingBox: {
    width: 250,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  chargerText: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 5,
  },
  chargerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;