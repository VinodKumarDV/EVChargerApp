import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

// Request location permissions on Android
const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          message: 'We need access to your location to show nearby EV chargers.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true;
    }
  } catch (err) {
    console.error('Permission error:', err);
    return false;
  }
};

// Get the user's current location
export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    Alert.alert('Permission Denied:', 'Location access is required to show nearby EV chargers.');
    return null;
  }

  // Use promise-based geolocation with better error handling
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        // Handle different error cases
        let errorMessage = 'Failed to get current location';
        switch (error.code) {
          case 1:
            errorMessage = 'Location permission denied';
            break;
          case 2:
            errorMessage = 'Location provider unavailable';
            break;
          case 3:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = error.message || errorMessage;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};
