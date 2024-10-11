# EV Charger Mobile App

## Overview
The EV Charger Mobile App provides users with a convenient way to locate electric vehicle charging stations. The app displays a map showing available chargers, allows users to capture screenshots of the map, and upload those images to Google Drive.

## Features
- Interactive map displaying dynamic EV charger locations.
- Current user location marked on the map.
- Floating Action Button (FAB) to capture a screenshot of the map section in WEBM format.
- Integration with Google Drive API for uploading screenshots.
- Dynamic loading of charger data from a JSON file.

## Technologies Used
- **React Native**: For building the mobile application.
- **react-native-maps**: For displaying the map.
- **react-native-view-shot**: For capturing screenshots.
- **@react-native-community/geolocation**: For fetching the user's current location.
- **Google Drive API**: For uploading captured screenshots.
- **react-native-floating-action**: For implementing the Floating Action Button.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- React Native environment set up on your machine.
- Google APIs.

### Installation
1. Clone the repository:  
   `git clone https://github.com/VinodKumarDV/EVChargerApp`

2. Go to the project directory:  
   `cd EVChargerApp`

3. Install the dependencies:  
   `npm install`

4. Run the app on Android:  
   `npm run android`

5. Run the app on iOS:  
   `npm run ios`


## Happy coding!