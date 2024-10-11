import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Text } from 'react-native';

const ChargerMarker = ({ charger, onPress }) => {
  const { latitude, longitude, name, address, connector_types } = charger;

  // Format connector types
  const formattedConnectors = connector_types.map(type => {
    const [connectorType, count] = type.split('-');
    return `${connectorType.toUpperCase()}: ${count} connectors`;
  });

  return (
    <Marker
      coordinate={{
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }}
      title={name}
      description={address}
      onPress={onPress}
      pinColor="black"
    >
      {/* Custom Callout to display additional details */}
      <View style={styles.calloutContainer}>
        <Text style={styles.chargerName}>{name}</Text>
        <Text>{address}</Text>
        <Text>Connectors:</Text>
        {formattedConnectors.map((connector, index) => (
          <Text key={index} style={styles.connectorText}>
            - {connector}
          </Text>
        ))}
      </View>
    </Marker>
  );
};

const styles = {
  calloutContainer: {
    padding: 5,
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 5,
  },
  chargerName: {
    fontWeight: 'bold',
  },
  connectorText: {
    paddingLeft: 10,
  },
};

export default ChargerMarker;