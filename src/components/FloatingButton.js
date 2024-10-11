import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { uploadToGoogleDrive } from '../services/GoogleDriveAPI';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const FloatingButton = ({ mapRef }) => {
  const [isBubbleVisible, setBubbleVisible] = useState(false);
  const folderId = '11G-xkeg3zYz2NVyyKYa9dGvMFmnKsd1v';

  useEffect(() => {
    onBubble();
  }, [onBubble]);

  const onBubble = async () => {
    setBubbleVisible(true);

    setTimeout(() => {
      setBubbleVisible(false);
    }, 2000);
  };

  const onCapture = async () => {
    try {
      // Google Sign-In configuration for the drive
      GoogleSignin.configure({
        webClientId: 'web_client_ID',  // Replace with your web client ID
        offlineAccess: true,
      });
      
      // Google Sign-In configuration for Drive
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const accessToken = userInfo.idToken;

      // Capture the screenshot from the map in WEBM format
      const uri = await captureRef(mapRef, {
        format: 'webm',
        quality: 0.8,
      });

      console.log('Image saved at:', uri);

      // Upload the screenshot to Google Drive
      await uploadToGoogleDrive(uri, folderId, accessToken);
    } catch (error) {
      console.error('Error capturing screenshot or uploading:', error);
    }
  };

  return (
    <View>
      {isBubbleVisible && (
        <>
          {/* Smaller bubbles leading to the camera icon */}
          <View style={styles.smallBubble}>
          <Text style={styles.smallBubbleText}> Click on the camera 📷, to capture and upload to drive</Text>
          </View>
        </>
      )}

      <TouchableOpacity style={styles.fab} onPress={onCapture}>
        <Text style={styles.fabText}>📷</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 575,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 26,
    marginTop: -9,
  },
  smallBubbleText: {
    color: 'black',
    fontSize: 15,
    marginTop: -9,
  },
  smallBubble: {
    position: 'absolute',
    bottom: 550,
    left: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    borderColor: '#007BFF',
    borderWidth: 2,
    elevation: 5,
    width: 250,
    alignItems: 'center',
  },
});

export default FloatingButton;
