// Dynamic Expo configuration
// Environment variables are read at build time for flexibility across environments

export default ({ config }) => {
  const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const easProjectId = process.env.EAS_PROJECT_ID || 'your-eas-project-id';

  return {
    ...config,
    name: 'Love Ledger',
    slug: 'love-ledger',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.loveledger.app',
      config: {
        googleMapsApiKey,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'Love Ledger needs your location to show nearby venues where you can post or browse missed connections.',
        NSLocationAlwaysAndWhenInUseUsageDescription:
          'Love Ledger uses your location to discover nearby venues and help you find missed connections.',
        NSCameraUsageDescription:
          'Love Ledger needs camera access for selfie verification when posting missed connections.',
        NSPhotoLibraryUsageDescription:
          'Love Ledger needs photo library access to select photos for your profile.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.loveledger.app',
      config: {
        googleMaps: {
          apiKey: googleMapsApiKey,
        },
      },
      permissions: [
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
      ],
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Love Ledger uses your location to discover nearby venues and help you find missed connections.',
          locationWhenInUsePermission:
            'Love Ledger needs your location to show nearby venues where you can post or browse missed connections.',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission:
            'Love Ledger needs camera access for selfie verification when posting missed connections.',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission:
            'Love Ledger needs photo library access to select photos for your profile.',
          cameraPermission:
            'Love Ledger needs camera access for selfie verification when posting missed connections.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: easProjectId,
      },
      // Expose environment variables to the app at runtime
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      googleMapsApiKey,
    },
    experiments: {
      typedRoutes: true,
    },
  };
};
