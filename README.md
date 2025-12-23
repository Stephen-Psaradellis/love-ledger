# Love Ledger

> **A location-based anonymous matchmaking app for "missed connections"**

[![React Native](https://img.shields.io/badge/React%20Native-Expo-blue.svg?style=flat-square&logo=react)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E.svg?style=flat-square&logo=supabase)](https://supabase.com/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey.svg?style=flat-square&logo=apple)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## Overview

Love Ledger is a cross-platform mobile application for **iOS and Android** that enables anonymous "missed connection" style matchmaking tied to physical locations.

Have you ever noticed someone interesting at a coffee shop, gym, or bookstore but didn't have the chance to say hello? Love Ledger creates a digital ledger for each location where you can leave an anonymous note describing that person - and if they're on the app, they might just find your message.

### How It Works

```
   You see someone                Create an avatar             They browse the
   interesting at a    ────►     describing them     ────►    location's ledger
   physical location             + leave a note               & find your post
        │                             │                             │
        │                             │                             │
        ▼                             ▼                             ▼
   ┌─────────────┐            ┌─────────────────┐          ┌───────────────┐
   │  📍 Visit   │            │  👤 Build Avatar │          │ 📖 Browse &   │
   │   Location  │            │  + Write Note   │          │    Match      │
   └─────────────┘            └─────────────────┘          └───────────────┘
                                                                   │
                                                                   ▼
                                                           ┌───────────────┐
                                                           │ 💬 Start      │
                                                           │  Anonymous    │
                                                           │    Chat       │
                                                           └───────────────┘
```

---

## Key Features

### For Producers (Post Creators)

- **Location Discovery** - Find venues using Google Maps integration
- **Selfie Verification** - Take a photo to verify you were actually there
- **Avatar Builder** - Create a customizable Bitmoji-style avatar describing the person you noticed
- **Anonymous Notes** - Write a message about your missed connection

### For Consumers (Post Browsers)

- **Location-Based Browsing** - Browse posts at specific venues
- **Description Matching** - Create your own avatar and get matched with posts describing you
- **Anonymous Conversations** - Connect through real-time messaging without revealing identities

### Core Platform Features

| Feature | Description |
|---------|-------------|
| **Cross-Platform** | Runs natively on both iOS and Android |
| **Real-Time Chat** | Instant messaging powered by Supabase Realtime |
| **Privacy First** | Anonymous interactions with no personal data exposed |
| **Content Moderation** | Reporting and blocking for a safe community |
| **Secure Authentication** | Sign up and login with email/password via Supabase Auth |

---

## Screenshots

> *Coming soon - Screenshots will be added as the app is developed*

---

## Tech Stack & Architecture

Love Ledger is built with modern, production-ready technologies designed for cross-platform mobile development.

### Frontend / Mobile

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| [**Expo SDK**](https://expo.dev/) | React Native framework with managed workflow | [Expo Docs](https://docs.expo.dev/) |
| [**React Native**](https://reactnative.dev/) | Cross-platform native mobile development | [RN Docs](https://reactnative.dev/docs/getting-started) |
| [**TypeScript**](https://www.typescriptlang.org/) | Type-safe JavaScript for reliability | [TS Docs](https://www.typescriptlang.org/docs/) |
| [**Expo Router**](https://docs.expo.dev/router/introduction/) | File-based navigation for React Native | [Router Docs](https://docs.expo.dev/router/introduction/) |
| [**Zustand**](https://zustand-demo.pmnd.rs/) | Lightweight state management | [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction) |

### Backend & Infrastructure

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| [**Supabase**](https://supabase.com/) | Backend-as-a-Service (BaaS) platform | [Supabase Docs](https://supabase.com/docs) |
| [**PostgreSQL**](https://www.postgresql.org/) | Relational database (via Supabase) | [PostgreSQL Docs](https://www.postgresql.org/docs/) |
| [**Supabase Auth**](https://supabase.com/auth) | Authentication and user management | [Auth Docs](https://supabase.com/docs/guides/auth) |
| [**Supabase Realtime**](https://supabase.com/realtime) | Real-time subscriptions for live chat | [Realtime Docs](https://supabase.com/docs/guides/realtime) |
| [**Supabase Storage**](https://supabase.com/storage) | File storage for images and media | [Storage Docs](https://supabase.com/docs/guides/storage) |

### External Integrations

| Integration | Purpose | Documentation |
|-------------|---------|---------------|
| [**Google Maps**](https://developers.google.com/maps) | Location discovery and venue selection | [Maps SDK Docs](https://developers.google.com/maps/documentation) |
| [**react-native-maps**](https://github.com/react-native-maps/react-native-maps) | Native map component for React Native | [RN Maps Docs](https://github.com/react-native-maps/react-native-maps#readme) |
| [**Avataaars**](https://getavataaars.com/) | Customizable avatar builder library | [Avataaars Docs](https://github.com/fangpenlin/avataaars) |

### Native Device Features (via Expo)

| Feature | Expo Module | Purpose |
|---------|-------------|---------|
| Camera | [`expo-camera`](https://docs.expo.dev/versions/latest/sdk/camera/) | Selfie verification for post creation |
| Image Picker | [`expo-image-picker`](https://docs.expo.dev/versions/latest/sdk/imagepicker/) | Gallery access for profile images |
| Location | [`expo-location`](https://docs.expo.dev/versions/latest/sdk/location/) | GPS for proximity-based features |
| SVG Rendering | [`react-native-svg`](https://github.com/software-mansion/react-native-svg) | Vector graphics for avatars |

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              Mobile App                                  │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Expo / React Native                            │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │   │
│  │  │   Screens  │  │ Components │  │   Hooks    │  │   Store    │  │   │
│  │  │ (Expo      │  │ (UI, Map,  │  │ (Auth,     │  │ (Zustand)  │  │   │
│  │  │  Router)   │  │  Avatar)   │  │  Location) │  │            │  │   │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                    │                                     │
│                                    ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         Supabase Client                           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            Supabase Cloud                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │   Auth       │  │  PostgreSQL  │  │   Realtime   │  │   Storage   │  │
│  │ (Users &     │  │  (Database)  │  │ (WebSocket)  │  │  (Files)    │  │
│  │  Sessions)   │  │              │  │              │  │             │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          External Services                               │
│  ┌────────────────────────────────┐  ┌───────────────────────────────┐  │
│  │        Google Maps API         │  │        Avataaars Library       │  │
│  │   (Venue Search & Display)     │  │    (Avatar Customization)      │  │
│  └────────────────────────────────┘  └───────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Why These Technologies?

| Choice | Rationale |
|--------|-----------|
| **Expo** | Simplifies React Native development with managed workflow, OTA updates, and easy deployment |
| **TypeScript** | Catches bugs at compile-time and improves code maintainability |
| **Supabase** | Open-source Firebase alternative with PostgreSQL, real-time, and auth out of the box |
| **Google Maps** | Industry-standard location services with excellent POI data |
| **Avataaars** | Privacy-preserving visual descriptions without requiring actual photos |

---

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

| Requirement | Minimum Version | Recommended | Check Command |
|-------------|-----------------|-------------|---------------|
| **Node.js** | 18.x | 20.x LTS | `node --version` |
| **npm** | 9.x | 10.x | `npm --version` |
| **Git** | 2.x | Latest | `git --version` |

### Mobile Development Requirements

| Platform | Requirement | Notes |
|----------|-------------|-------|
| **iOS** | macOS + Xcode | Required for iOS simulator and builds |
| **Android** | Android Studio | Required for Android emulator and builds |
| **Physical Device** | [Expo Go](https://expo.dev/go) app | Scan QR code to run on device |

> 💡 **Tip:** For the fastest setup, use the [Expo Go](https://expo.dev/go) app on your physical device - no simulator setup required!

---

## Quick Start

Get up and running in under 5 minutes:

### 1. Clone the Repository

```bash
git clone https://github.com/shortforge/love-ledger.git
cd love-ledger
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required dependencies including:
- React Native / Expo SDK
- Supabase client
- Navigation libraries
- Map and avatar components

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Then add your API keys (see [Environment Setup](#environment-setup) for details):

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Maps Configuration
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4. Start the Development Server

```bash
npx expo start
```

This will start the Expo development server and display a QR code.

### 5. Run on Your Device or Simulator

| Method | Command/Action |
|--------|----------------|
| **Physical Device** | Scan the QR code with Expo Go app |
| **iOS Simulator** | Press `i` in terminal (macOS only) |
| **Android Emulator** | Press `a` in terminal |
| **Web Browser** | Press `w` in terminal |

---

## Quick Commands Reference

Here's a quick reference for common development commands:

```bash
# Start development server
npx expo start

# Start with tunnel (for devices on different networks)
npx expo start --tunnel

# Start with cache cleared
npx expo start --clear

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Install a new Expo-compatible package
npx expo install <package-name>

# Check for Expo SDK compatibility issues
npx expo-doctor

# Build for production (requires EAS)
npx eas build --platform all
```

---

## Project Structure

The project follows an Expo Router file-based routing pattern with organized folders for components, hooks, and utilities.

```
love-ledger/
├── app/                       # 📱 Expo Router app directory (screens/routes)
│   ├── (auth)/               # Authentication routes (login, signup)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/               # Main tabbed navigation
│   │   ├── home.tsx          # Home/Feed screen
│   │   ├── explore.tsx       # Location exploration/map
│   │   ├── create.tsx        # Create post screen
│   │   ├── messages.tsx      # Conversations list
│   │   ├── profile.tsx       # User profile
│   │   └── _layout.tsx
│   ├── chat/                 # Chat screens
│   │   └── [id].tsx          # Dynamic chat view
│   ├── post/                 # Post detail screens
│   │   └── [id].tsx          # Dynamic post view
│   ├── _layout.tsx           # Root layout
│   └── index.tsx             # Entry point
│
├── components/                # 🧩 Reusable React components
│   ├── ui/                   # Generic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Avatar.tsx
│   ├── avatar/               # Avataaars-related components
│   │   ├── AvatarBuilder.tsx
│   │   └── AvatarPreview.tsx
│   ├── map/                  # Map-related components
│   │   ├── MapView.tsx
│   │   └── LocationPicker.tsx
│   ├── post/                 # Post-related components
│   │   ├── PostCard.tsx
│   │   └── PostForm.tsx
│   └── chat/                 # Chat-related components
│       ├── MessageBubble.tsx
│       └── ChatInput.tsx
│
├── hooks/                     # 🪝 Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useLocation.ts        # Location services hook
│   ├── usePosts.ts           # Posts data hook
│   ├── useChat.ts            # Real-time chat hook
│   └── useProfile.ts         # Profile management hook
│
├── lib/                       # 📚 Core libraries and utilities
│   ├── supabase.ts           # Supabase client configuration
│   ├── api/                  # API functions
│   │   ├── auth.ts
│   │   ├── posts.ts
│   │   ├── messages.ts
│   │   └── profiles.ts
│   └── utils/                # Utility functions
│       ├── formatting.ts
│       └── validation.ts
│
├── store/                     # 🗄️ State management (Zustand)
│   ├── authStore.ts          # Authentication state
│   ├── locationStore.ts      # Location state
│   └── chatStore.ts          # Chat/messaging state
│
├── types/                     # 📝 TypeScript type definitions
│   ├── database.ts           # Supabase database types
│   ├── navigation.ts         # Navigation types
│   └── api.ts                # API response types
│
├── constants/                 # ⚙️ App constants
│   ├── colors.ts             # Theme colors
│   ├── layout.ts             # Layout constants
│   └── config.ts             # App configuration
│
├── assets/                    # 🎨 Static assets
│   ├── fonts/                # Custom fonts
│   ├── images/               # Image assets
│   └── icons/                # App icons
│
├── supabase/                  # 🗃️ Supabase configurations
│   ├── migrations/           # Database migrations
│   └── seed.sql              # Seed data
│
├── .env.example               # Environment variables template
├── .env.local                 # Local environment (gitignored)
├── app.json                   # Expo app configuration
├── eas.json                   # EAS Build configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # You are here! 📍
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| **`app/`** | [Expo Router](https://docs.expo.dev/router/introduction/) file-based routing - each file automatically becomes a route |
| **`app/(auth)/`** | Authentication flow screens (grouped route) |
| **`app/(tabs)/`** | Main app screens with bottom tab navigation |
| **`components/`** | Reusable React Native components organized by feature domain |
| **`hooks/`** | Custom React hooks encapsulating shared logic and side effects |
| **`lib/`** | Core utilities, API clients, and helper functions |
| **`store/`** | [Zustand](https://zustand-demo.pmnd.rs/) state management stores |
| **`types/`** | TypeScript type definitions for end-to-end type safety |
| **`constants/`** | App-wide constants (colors, dimensions, config) |
| **`assets/`** | Static files like images, fonts, and icons |
| **`supabase/`** | Database migrations and seed data |

### Important Files

| File | Purpose |
|------|---------|
| **`lib/supabase.ts`** | Supabase client initialization with auth persistence |
| **`app.json`** | Expo configuration (app name, version, permissions, plugins) |
| **`eas.json`** | Expo Application Services build profiles |
| **`tsconfig.json`** | TypeScript compiler options and path aliases |
| **`.env.example`** | Template for required environment variables |
| **`package.json`** | Project dependencies and npm scripts |

### Service Integration Points

| Service | File Location | Description |
|---------|---------------|-------------|
| **Supabase** | `lib/supabase.ts` | Database, auth, storage, and real-time subscriptions |
| **Google Maps** | `components/map/MapView.tsx` | Location picking and venue visualization |
| **Avataaars** | `components/avatar/AvatarBuilder.tsx` | Avatar creation and customization |
| **Expo Camera** | `app/(tabs)/create.tsx` | Selfie verification during post creation |
| **Expo Location** | `hooks/useLocation.ts` | Device GPS for proximity features |

---

## Environment Setup

Love Ledger requires configuration for external services. This section guides you through setting up all required environment variables.

### Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# ===========================================
# SUPABASE CONFIGURATION (Required)
# ===========================================

# Your Supabase project URL
# Format: https://<project-id>.supabase.co
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase anonymous (public) key
# Safe to expose in client-side code - RLS policies protect data
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# ===========================================
# GOOGLE MAPS CONFIGURATION (Required)
# ===========================================

# Google Maps API key with Maps SDK enabled
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

> ⚠️ **Security Note:** The `.env.local` file is gitignored to prevent accidentally committing secrets. Never commit API keys to version control!

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous/public API key |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | ✅ Yes | Google Maps Platform API key |

> 💡 **Expo Tip:** The `EXPO_PUBLIC_` prefix makes these variables available in client-side code. This is intentional - these are public keys designed for client use. Supabase Row Level Security (RLS) policies protect your data, not the anon key.

---

### Supabase Setup

[Supabase](https://supabase.com) provides the backend infrastructure including PostgreSQL database, authentication, real-time subscriptions, and file storage.

#### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in
2. Click **"New Project"** on the dashboard
3. Enter a project name (e.g., "love-ledger-dev")
4. Set a strong database password (save it somewhere secure)
5. Select a region closest to your users
6. Click **"Create new project"** and wait for provisioning (~2 minutes)

#### Step 2: Get Your API Credentials

1. Navigate to **Settings** → **API** in your Supabase dashboard
2. Copy the following values to your `.env.local`:

| Dashboard Location | Environment Variable |
|-------------------|----------------------|
| **Project URL** | `EXPO_PUBLIC_SUPABASE_URL` |
| **anon (public)** under "Project API keys" | `EXPO_PUBLIC_SUPABASE_ANON_KEY` |

```
┌─────────────────────────────────────────────────────────────────┐
│  Supabase Dashboard → Settings → API                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Project URL                                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ https://abcdefghij.supabase.co                     📋     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Project API keys                                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ anon (public)                                              │  │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...          📋     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 3: Set Up Database Schema

Run the database migrations to create the required tables:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (get project ID from dashboard URL)
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

Alternatively, you can manually run the SQL migrations in the Supabase SQL Editor:

1. Go to **SQL Editor** in your Supabase dashboard
2. Open each file in `supabase/migrations/` in order
3. Run each migration script

#### Step 4: Configure Authentication

1. Navigate to **Authentication** → **Providers** in your dashboard
2. Ensure **Email** provider is enabled
3. Optionally configure email templates under **Authentication** → **Email Templates**

#### Step 5: Enable Row Level Security (RLS)

Row Level Security is critical for protecting user data. The migrations should enable RLS, but verify:

1. Go to **Database** → **Tables** in your dashboard
2. For each table, click to view and check that RLS is **Enabled**
3. Review the policies to ensure they match your security requirements

> 📚 **Learn More:** [Supabase Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

### Google Maps Setup

[Google Maps Platform](https://developers.google.com/maps) powers the location discovery features, allowing users to search for and select venues.

#### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter a project name (e.g., "love-ledger")
4. Click **"Create"**

#### Step 2: Enable Required APIs

1. Go to **APIs & Services** → **Library**
2. Search for and enable these APIs:

| API | Purpose |
|-----|---------|
| **Maps SDK for Android** | Display maps on Android devices |
| **Maps SDK for iOS** | Display maps on iOS devices |
| **Places API** | Venue search and autocomplete |
| **Geocoding API** | Convert addresses to coordinates |

```
┌─────────────────────────────────────────────────────────────────┐
│  Google Cloud Console → APIs & Services → Library              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ☑️ Maps SDK for Android ................... ENABLED           │
│  ☑️ Maps SDK for iOS ....................... ENABLED           │
│  ☑️ Places API ............................. ENABLED           │
│  ☑️ Geocoding API .......................... ENABLED           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 3: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **"API Key"**
3. Copy the generated API key to your `.env.local` as `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`

#### Step 4: Secure Your API Key (Recommended)

To prevent unauthorized usage and unexpected billing:

1. Click on your API key to edit it
2. Under **"Application restrictions"**:
   - For development: Select **"None"** (temporarily)
   - For production: Configure **"Android apps"** and **"iOS apps"**
3. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Choose only the APIs you enabled above
4. Click **"Save"**

> 💡 **Cost Note:** Google Maps Platform offers $200 free monthly credit which is typically sufficient for development and small-scale production. [View pricing](https://cloud.google.com/maps-platform/pricing)

#### Step 5: Configure for Expo/React Native

For development with Expo Go, no additional configuration is needed. For production builds:

1. Update `app.json` with your API key:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_API_KEY_HERE"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_API_KEY_HERE"
        }
      }
    }
  }
}
```

> 📚 **Learn More:** [React Native Maps Installation](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md)

---

### Using the .env.example Template

The project includes a `.env.example` file with all required variables:

```bash
# Copy the template to create your local environment file
cp .env.example .env.local

# Edit with your favorite editor
code .env.local    # VS Code
nano .env.local    # Terminal editor
```

### Verifying Your Configuration

After setting up your environment variables, verify everything works:

```bash
# Start the development server
npx expo start

# The app should:
# 1. Start without environment variable errors
# 2. Connect to Supabase (check for auth screens)
# 3. Load Google Maps (if navigating to map screens)
```

If you encounter issues:

| Issue | Solution |
|-------|----------|
| "Missing Supabase URL" error | Verify `EXPO_PUBLIC_SUPABASE_URL` is set correctly |
| "Invalid API key" error | Double-check your Supabase anon key has no extra spaces |
| Maps not loading | Verify Google Maps API key and that APIs are enabled |
| "Quota exceeded" error | Check Google Cloud Console for billing/quota issues |

---

## Development Workflow

This section covers the day-to-day development workflow including running the app, testing, building, and common development tasks.

### Running the Development Server

Love Ledger uses Expo's development server for local development. Here are the different ways to run the app:

```bash
# Standard development mode
npx expo start

# Development with tunnel (access from any network)
npx expo start --tunnel

# Clear cache and restart (fixes stale bundle issues)
npx expo start --clear

# Offline mode (skip checking for updates)
npx expo start --offline

# Run with specific port
npx expo start --port 8082
```

#### Development Server Commands

Once the server is running, use these keyboard shortcuts in the terminal:

| Key | Action |
|-----|--------|
| `i` | Open iOS simulator |
| `a` | Open Android emulator |
| `w` | Open in web browser |
| `r` | Reload the app |
| `m` | Toggle developer menu |
| `j` | Open React DevTools |
| `?` | Show all commands |

### Running on Physical Devices

For the best development experience, test on real devices:

| Method | Setup |
|--------|-------|
| **Expo Go (Recommended)** | Install [Expo Go](https://expo.dev/go) app, scan QR code from terminal |
| **Development Build** | Run `npx expo run:ios` or `npx expo run:android` for native code testing |
| **USB Debugging** | Connect device via USB, enable developer mode, run `npx expo run:android` |

> 💡 **Tip:** Use `npx expo start --tunnel` if your device and computer are on different networks (e.g., at a coffee shop or using corporate WiFi).

---

### Testing

The project uses Jest for testing React Native components and utilities.

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (reruns on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run a specific test file
npm test -- path/to/file.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should authenticate user"
```

#### Test File Structure

Tests should be placed alongside the code they test or in a `__tests__` directory:

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Button.test.tsx          # Component tests
│   └── __tests__/
│       └── Button.snapshot.tsx  # Snapshot tests
hooks/
├── useAuth.ts
└── useAuth.test.ts              # Hook tests
lib/
├── utils/
│   └── validation.ts
└── __tests__/
    └── validation.test.ts       # Utility tests
```

#### Testing Best Practices

| Practice | Description |
|----------|-------------|
| **Unit Tests** | Test individual components and functions in isolation |
| **Integration Tests** | Test how multiple components work together |
| **Snapshot Tests** | Capture UI component output to detect unintended changes |
| **Mock External Services** | Mock Supabase, Google Maps, and other APIs in tests |

#### Mocking Supabase

```typescript
// __mocks__/lib/supabase.ts
export const supabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  auth: {
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  },
};
```

---

### Linting and Code Quality

Keep your code clean and consistent with these quality tools:

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type-check without building
npm run typecheck

# Run all checks (before committing)
npm run validate
```

#### Code Style Guidelines

| Area | Convention |
|------|------------|
| **Components** | PascalCase, functional components with TypeScript |
| **Hooks** | camelCase, prefix with `use` (e.g., `useAuth`) |
| **Utilities** | camelCase for functions, UPPER_SNAKE_CASE for constants |
| **Files** | Component files match component name (Button.tsx for `<Button />`) |
| **Types** | Defined in `/types` directory, exported for reuse |

---

### Building for Production

Use Expo Application Services (EAS) for production builds.

#### Setting Up EAS

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure EAS for your project (first time only)
eas build:configure
```

#### Build Commands

```bash
# Build for all platforms
eas build --platform all

# Build for iOS only
eas build --platform ios

# Build for Android only
eas build --platform android

# Build with specific profile
eas build --platform ios --profile production

# Local build (requires native toolchain)
eas build --platform android --local
```

#### Build Profiles

The `eas.json` file defines build profiles:

| Profile | Purpose | Distribution |
|---------|---------|--------------|
| **development** | Dev builds with debugging enabled | Internal testing |
| **preview** | Pre-release builds for QA | Internal testing |
| **production** | App store release builds | App Store / Play Store |

```json
// eas.json example
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

#### Over-the-Air (OTA) Updates

Push updates without app store review using EAS Update:

```bash
# Push an update to all users on the "preview" channel
eas update --branch preview --message "Bug fixes and improvements"

# Push an update to production
eas update --branch production --message "Version 1.0.1 hotfix"
```

---

### App Store Deployment

#### iOS (App Store)

1. Build for production: `eas build --platform ios --profile production`
2. Download the `.ipa` file from [expo.dev](https://expo.dev) dashboard
3. Upload to App Store Connect using Transporter app or `eas submit`
4. Complete app metadata in App Store Connect
5. Submit for review

#### Android (Google Play Store)

1. Build for production: `eas build --platform android --profile production`
2. Download the `.aab` file from [expo.dev](https://expo.dev) dashboard
3. Upload to Google Play Console
4. Complete store listing and content rating
5. Submit for review

```bash
# Automated submission (after initial setup)
eas submit --platform ios
eas submit --platform android
```

> 📚 **Learn More:** [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)

---

### Common Development Tasks

#### Adding New Dependencies

Always use `npx expo install` for native packages to ensure compatibility:

```bash
# Install Expo-compatible packages
npx expo install expo-haptics

# Install regular npm packages
npm install lodash

# Check for compatibility issues
npx expo-doctor
```

#### Database Migrations

When changing the database schema:

```bash
# Create a new migration
supabase migration new add_column_to_posts

# Push migrations to remote database
supabase db push

# Reset local database (for development)
supabase db reset
```

#### Debugging

| Tool | Use Case | How to Access |
|------|----------|---------------|
| **React DevTools** | Inspect component tree and props | Press `j` in terminal |
| **Flipper** | Network requests, logs, performance | Download from [fbflipper.com](https://fbflipper.com/) |
| **Expo DevTools** | Logs and device management | Opens automatically or visit localhost |
| **Console Logging** | Quick debugging | Use `console.log()`, view in terminal |
| **React Native Debugger** | Redux, network, components | Install standalone debugger |

#### Clearing Caches

When things get weird, clear caches:

```bash
# Clear Expo cache
npx expo start --clear

# Clear Metro bundler cache
rm -rf node_modules/.cache

# Clear watchman (macOS)
watchman watch-del-all

# Nuclear option - clean everything
rm -rf node_modules && npm install && npx expo start --clear
```

#### Environment Management

Switch between development and staging environments:

```bash
# Development (default)
cp .env.development .env.local

# Staging
cp .env.staging .env.local

# Production (for local testing only)
cp .env.production .env.local
```

---

### Troubleshooting

#### Common Issues and Solutions

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| Metro bundler stuck | Stale cache | `npx expo start --clear` |
| "Cannot find module" | Missing dependency | `rm -rf node_modules && npm install` |
| Supabase connection fails | Wrong env variables | Check `.env.local` values |
| Maps not displaying | API key issue | Verify Google Maps API key and enabled APIs |
| Build fails on EAS | SDK version mismatch | Run `npx expo-doctor` and fix issues |
| iOS simulator not opening | Xcode not configured | Open Xcode, accept license, install simulators |
| Android emulator slow | Missing HAXM/hypervisor | Enable hardware acceleration in BIOS |

#### Checking Project Health

```bash
# Check for common issues
npx expo-doctor

# Verify Expo SDK version
npx expo --version

# Check installed packages for issues
npm ls

# View project configuration
npx expo config --full
```

#### Getting Help

- 📖 **Expo Docs:** [docs.expo.dev](https://docs.expo.dev)
- 💬 **Expo Discord:** [chat.expo.dev](https://chat.expo.dev)
- 🐛 **Issue Tracker:** [GitHub Issues](https://github.com/shortforge/love-ledger/issues)
- 📚 **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)

---

## Contributing

We welcome contributions to Love Ledger! Whether you're fixing bugs, improving documentation, or proposing new features, your help is appreciated.

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/love-ledger.git
   cd love-ledger
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

### Development Process

1. **Set up your environment** following the [Quick Start](#quick-start) guide
2. **Make your changes** following the code style guidelines
3. **Test your changes** thoroughly
4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve issue with component"
   ```
5. **Push to your fork** and submit a Pull Request

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear, readable history:

| Type | Description |
|------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only changes |
| `style:` | Formatting, missing semicolons, etc. |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `test:` | Adding or updating tests |
| `chore:` | Updating build tasks, dependencies, etc. |

### Pull Request Guidelines

- **Keep PRs focused** - One feature or fix per PR
- **Update documentation** - If your change affects how the app works
- **Add tests** - For new features and bug fixes
- **Follow existing patterns** - Match the code style and architecture
- **Describe your changes** - Explain what and why in the PR description

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/shortforge/love-ledger/issues/new) with:

- **Clear title** describing the issue
- **Steps to reproduce** (for bugs)
- **Expected vs actual behavior** (for bugs)
- **Screenshots or logs** if applicable
- **Environment details** (OS, device, app version)

### Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to:

- **Be respectful** - Treat everyone with respect and consideration
- **Be inclusive** - Welcome newcomers and help them learn
- **Be constructive** - Provide helpful feedback and accept it graciously
- **Be professional** - Keep discussions focused and productive
- **Be accountable** - Take responsibility for your actions and words

Harassment, discrimination, and disrespectful behavior will not be tolerated. Report concerns to the maintainers.

---

## Acknowledgments

Love Ledger is built on the shoulders of giants. Special thanks to:

- [Expo](https://expo.dev/) - For making React Native development accessible and enjoyable
- [Supabase](https://supabase.com/) - For providing an excellent open-source Firebase alternative
- [Google Maps Platform](https://developers.google.com/maps) - For powering location services
- [Avataaars](https://getavataaars.com/) - For the amazing customizable avatar library
- [React Native Community](https://reactnative.dev/community/overview) - For the ecosystem of libraries and tools
- All [contributors](https://github.com/shortforge/love-ledger/graphs/contributors) who help improve this project

---

## Maintainers

| Role | Name | Contact |
|------|------|---------|
| **Lead Maintainer** | ShortForge | [GitHub](https://github.com/shortforge) |

### Getting Help

- 📖 **Documentation:** You're reading it!
- 💬 **Discussions:** [GitHub Discussions](https://github.com/shortforge/love-ledger/discussions)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/shortforge/love-ledger/issues)
- 📧 **Email:** For security issues, email maintainers directly

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 ShortForge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### What This Means

You are free to:
- ✅ Use this software for personal or commercial projects
- ✅ Modify and adapt the code to your needs
- ✅ Distribute your modified versions
- ✅ Use it privately without sharing modifications

You must:
- 📄 Include the original copyright notice
- 📄 Include the license text in copies

You cannot:
- ❌ Hold the authors liable for damages
- ❌ Use the project's name/branding without permission

---

<p align="center">
  <sub>Built with ❤️ by the Love Ledger team</sub>
</p>

<p align="center">
  <a href="#love-ledger">⬆️ Back to Top</a>
</p>
