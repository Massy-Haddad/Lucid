# Lucid

A modern React Native application built with Expo and Firebase Authentication.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

## Setting Up Android Development Environment

1. Install Android Studio
2. Install the following through Android Studio's SDK Manager:
   - Android SDK Platform (API level 33 or newer recommended)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

3. Create an Android Virtual Device (AVD):
   - Open Android Studio → Tools → Device Manager
   - Click "Create Device"
   - Select a device definition (e.g., Pixel 6)
   - Select a system image (e.g., API 33)
   - Complete the AVD creation

## Project Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd lucid
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add Android and iOS apps to your project
   - Download the configuration files:
     - `google-services.json` for Android
     - `GoogleService-Info.plist` for iOS
   - Place these files in the project root

4. Configure Firebase in your project:
   - Visit [React Native Firebase](https://rnfirebase.io/) for detailed setup
   - Follow the installation guides for each Firebase service you need
   - Ensure you've added all necessary Firebase dependencies

## Running the Project

### Development

1. Start the development server:
```bash
npx expo start
```

2. Run on Android:
```bash
# First time setup
npx expo prebuild --clean
npx expo run:android
```

3. Run on iOS (macOS only):
```bash
# First time setup
npx expo prebuild --clean
npx expo run:ios
```

### Production Build

1. Android:
```bash
eas build --platform android
```

2. iOS:
```bash
eas build --platform ios
```

## Project Structure

```
lucid/
├── app/                   # App screens using Expo Router
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable React components
├── context/             # React Context providers
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

## Key Features

- 🔐 Firebase Authentication
- 🎨 Dark/Light theme support
- 🎯 TypeScript support
- 📱 Responsive design
- 🔄 State management with React Context
- 🚀 Fast refresh in development

## Firebase Setup Details

1. Install required dependencies:
```bash
npx expo install @react-native-firebase/app @react-native-firebase/auth
```

2. Initialize Firebase in your app:
```typescript
import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
```

3. Configure build properties in `app.json`:
```json
{
  "expo": {
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/auth"
    ],
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

## Common Issues and Solutions

### Android Build Issues

1. Clean the project:
```bash
cd android
./gradlew clean
cd ..
```

2. Reset Expo cache:
```bash
npx expo start --clear
```

### iOS Build Issues

1. Clean the pods:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository.
