// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import VerifyOTPScreen from './src/screens/VerifyOTPScreen';
import CompleteSignupScreen from './src/screens/CompleteSignupScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatWithDBScreen from './src/screens/ChatWithDBScreen';
import CommentaryScreen from './src/screens/CommentaryScreen';
import DraftingScreen from './src/screens/DraftingScreen';
import JudgmentResearchScreen from './src/screens/JudgmentResearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import FaqsScreen from './src/screens/FaqsScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import TermsAndConditionsScreen from './src/screens/TermsAndConditionsScreen';
import CustomDrawer from './src/navigation/CustomDrawer';
import theme from './src/theme/Theme';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Home moved to src/screens/HomeScreen

// Bottom tabs housing the four features
function FeaturesTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarItemStyle: { borderRadius: 12, marginHorizontal: 6, paddingVertical: 6 },
        tabBarActiveBackgroundColor: colors.primaryLight,
        tabBarInactiveBackgroundColor: 'transparent',
      }}
    >
       {/* Chat */}
       <Tab.Screen
        name="ChatWithDB"
        component={ChatWithDBScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat-bubble-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Research */}
      <Tab.Screen
        name="JudgmentResearch"
        component={JudgmentResearchScreen}
        options={{
          tabBarLabel: 'Research',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      {/* Commentary */}
      <Tab.Screen
        name="Commentary"
        component={CommentaryScreen}
        options={{
          tabBarLabel: 'Commentary',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book-open" size={20} color={color} />
          ),
        }}
      />
      {/* Drafting */}
      <Tab.Screen
        name="Drafting"
        component={DraftingScreen}
        options={{
          tabBarLabel: 'Drafting',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />
      {/* Profile */}
      <Tab.Screen
        name="UserProfileTab"
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      {/** Settings moved to Drawer */}
    </Tab.Navigator>
  );
}

// Stack shown inside the Drawer, containing Home and tabs + user profile
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FeaturesTabs" component={FeaturesTabs} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}

// Drawer that exposes Home (MainStack) and standalone destinations
function MainDrawer() {
  return (
    <Drawer.Navigator
      id="DrawerRoot"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >  
       
      <Drawer.Screen name="Main" component={MainStack} options={{ drawerLabel: 'Home' }} />
      <Drawer.Screen name="UserProfileDrawer" component={UserProfileScreen} options={{ drawerLabel: 'User Profile' }} />
      <Drawer.Screen name="Faqs" component={FaqsScreen} options={{ drawerLabel: 'FAQs' }} />
      <Drawer.Screen name="Transactions" component={TransactionsScreen} options={{ drawerLabel: 'Transactions' }} />
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ drawerLabel: 'Terms & Conditions' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ drawerLabel: 'Settings' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Verify" component={VerifyOTPScreen} />
          <Stack.Screen name="CompleteSignup" component={CompleteSignupScreen} />
          
          {/* Home now loads the Drawer which contains Home + features */}
          <Stack.Screen name="Home" component={MainDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

