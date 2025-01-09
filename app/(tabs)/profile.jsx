import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from './../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const Menu = [
    {
      id: 1,
      name: 'Add New Pet',
      icon: 'add-circle',
      path: '/add-new-pet'
    },
    {
      id: 2,
      name: 'My Post',
      icon: 'bookmark',
      path: '/user-post'
    },
    {
      id: 3,
      name: 'Favorites',
      icon: 'heart',
      path: '/(tabs)/favorite'
    },
    {
      id: 4,
      name: 'Chat',
      icon: 'chatbubble',
      path: '/(tabs)/inbox'
    },
    {
      id: 5,
      name: 'Logout',
      icon: 'exit',
      path: '/login'
    },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressMenu = (menu) => {
    if (menu.id === 5) { // Cek id untuk logout
      signOut()
        .then(() => {
          router.push('/login');
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    } else {
      router.push(menu.path);
    }
  };

  return (
    <View style={{
      padding: 20,
      marginTop: 20,
    }}>
      <Text style={{
        fontFamily: 'PSemiBold',
        fontSize: 30
      }}>Profile</Text>

      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginVertical: 25,
      }}>
        <Image source={{ uri: user?.imageUrl }} style={{
          width: 60,
          height: 60,
          borderRadius: 99,
        }} />

        <Text style={{
          fontFamily: 'PRegular',
          fontSize: 20,
          marginTop: 6
        }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily: 'PLight',
          fontSize: 15,
          color: Colors.grey
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
              gap: 10,
              marginVertical: 10,
              backgroundColor: Colors.white,
              padding: 10,
              borderRadius: 10,
            }}>
            <Ionicons name={item.icon} size={30}
              color={Colors.primary}
              style={{
                padding: 10,
                backgroundColor: Colors.lightPrimary,
                borderRadius: 8
              }} />
            <Text style={{
              marginLeft: 10,
              fontFamily: 'PRegular',
              fontSize: 18,
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()} // Pastikan untuk memberikan keyExtractor
      />
    </View>
  );
}