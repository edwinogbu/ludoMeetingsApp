// import React, { useState } from 'react';
// import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
// import { Tabs } from 'expo-router';
// import { MaterialIcons, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useAuth } from '../../context/AuthContext';

// const icons: Record<string, (props: any) => JSX.Element> = {
//   index: (props) => <MaterialIcons name="dashboard" size={26} {...props} />,
//   // room: (props) => <AntDesign name="videocamera" size={22} {...props} />,
//   recordedMeetings: (props) => <Ionicons name="play-circle" size={24} {...props} />,
//   profileScreen: (props) => <FontAwesome name="user" size={24} {...props} />, // Updated key
// };

// const primaryColor = '#0333C1';
// const secondaryColor = '#FF9800';

// export default function Layout() {
//   const [theme, setTheme] = useState('light');
//   const router = useRouter();
//   const { onLogout } = useAuth();

//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? primaryColor : 'light');
//   };

//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarStyle: [
//           styles.tabBar,
//           { backgroundColor: theme === 'light' ? '#FFF' : primaryColor },
//         ],
//         tabBarActiveTintColor: secondaryColor,
//         tabBarInactiveTintColor: '#888',
//         tabBarIcon: ({ color, focused }) => {
//           const Icon = icons[route.name as keyof typeof icons];
//           return Icon ? Icon({ color, style: focused ? styles.iconFocused : null }) : null;
//         },
//         tabBarLabelStyle: {
//           ...styles.tabLabel,
//           color: theme === primaryColor ? '#FFF' : primaryColor,
//         },
//         tabBarButton: (props) => <Pressable android_ripple={{ color: '#ddd' }} {...props} />,
//         headerStyle: styles.header,
//         headerTitleStyle: styles.headerTitle,
//         headerShown: true,
//         headerTitle:
//           route.name === 'index' ? 'Meeting Rooms' :
//           route.name === 'recordedMeetings' ? 'Recorded Meetings' :
//           route.name === 'profileScreen' ? 'Profile' : // Updated key
//           'App',
//         headerRight: () => (
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={toggleTheme}>
//               <Ionicons name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} size={24} color="#FFF" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
//               <Ionicons name="log-out-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         ),
//         headerLeft: () => (
//           route.name !== 'index' && (
//             <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//               <Ionicons name="arrow-back" size={24} color="#FFF" />
//             </TouchableOpacity>
//           )
//         ),
//       })}
//     >
//       {/* Dashboard */}
//       <Tabs.Screen name="index" options={{ title: 'Meeting Rooms' }} />

//       {/* Room (handles dynamic [id] in separate file) */}
//       {/* <Tabs.Screen name="room" options={{ title: 'Room' }} /> */}

//       {/* Recorded Meetings */}
//       <Tabs.Screen name="recordedMeetings" options={{ title: 'Recorded Meetings' }} />

//       {/* Profile */}
//       <Tabs.Screen name="profileScreen" options={{ title: 'Profile' }} /> {/* Updated name */}
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#FFF',
//     borderTopWidth: 0,
//     height: 60,
//     paddingTop: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   tabLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     fontFamily: 'System',
//     marginBottom: 4,
//   },
//   icon: {
//     backgroundColor: '#1A1A36',
//     color: '#FFFFFF',
//   },
//   iconFocused: {
//     transform: [{ scale: 1.2 }],
//     color: secondaryColor,
//   },
//   header: {
//     backgroundColor: primaryColor,
//     shadowColor: 'transparent',
//   },
//   headerTitle: {
//     color: '#FFF',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   logoutButton: {
//     marginLeft: 15,
//   },
//   backButton: {
//     marginLeft: 15,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const icons: Record<string, (props: any) => JSX.Element> = {
  index: (props) => <MaterialIcons name="dashboard" size={26} {...props} style={styles.icon} />,
  recordedMeetingsScreen: (props) => <AntDesign name="videocamera" size={22} {...props} style={styles.icon} />,
  profileScreen: (props) => <AntDesign name="user" size={26} {...props} style={styles.icon} />,
};

const primaryColor = '#4CAF50';
const secondaryColor = '#FF9800';

export default function TabLayout() {
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? primaryColor : 'light');
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: theme === 'light' ? '#FFF' : primaryColor },
        ],
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, focused }) => {
          const Icon = icons[route.name as keyof typeof icons];
          return Icon ? Icon({ color, style: focused ? styles.iconFocused : null }) : null;
        },
        tabBarLabelStyle: {
          ...styles.tabLabel,
          color: theme === primaryColor ? '#FFF' : primaryColor,
        },
        tabBarButton: (props) => <Pressable android_ripple={{ color: '#ddd' }} {...props} />,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerShown: true,
        headerTitle: route.name === 'index' ? 'index'
          : route.name === 'recordedMeetingsScreen' ? 'Recorded Meetings'
          : route.name === 'profileScreen' ? 'Profile'
          : 'App',
        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={toggleTheme}>
              <Ionicons
                name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          route.name !== 'index' && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          )
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'index' }} />
      <Tabs.Screen name="recordedMeetingsScreen" options={{ title: 'Recorded Meetings' }} />
      <Tabs.Screen name="profileScreen" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF',
    borderTopWidth: 0,
    height: 60,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 4,
  },
  icon: {
    color: '#FFFFFF',
  },
  iconFocused: {
    transform: [{ scale: 1.2 }],
    color: secondaryColor,
  },
  header: {
    backgroundColor: primaryColor,
    shadowColor: 'transparent',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    marginRight: 15,
  },
  backButton: {
    marginLeft: 15,
  },
});
