import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MarkFav from './../MarkFav';

export default function PetListItem({ pet }) {
  const router = useRouter();

  // Fungsi untuk memformat breed
  const formatBreed = (breed) => {
    if (!breed) return '';
    const length = breed.length;

    if (length <= 12) {
      return breed; // Jika panjang breed 24 karakter atau kurang, kembalikan breed asli
    }

    return `${breed.slice(0, 12)}...${breed.slice(length - 0)}`; // Mengganti dengan elipsis
  };

  return (
    <View style={{
      backgroundColor: Colors.white,
      width: 175,
      height: 230,
      borderRadius: 10,
      marginRight: 10,
      marginBottom: 10
    }}>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: '/pet-details',
          params: pet
        })}
        style={{
          padding: 10,
          marginRight: 15,

        }}>
        <View style={{
          position: 'absolute',
          zIndex: 10,
          right: 10,
          top: 10
        }}>
          <MarkFav pet={pet} color={'White'} />
        </View>
        <Image source={{ uri: pet?.imageUrl }}
          style={{
            width: 150,
            height: 135,
            objectFit: 'cover',
            borderRadius: 10
          }}
        />
        <Text style={{
          fontFamily: 'PMedium',
          fontSize: 15,
          padding: 5
        }}>{pet.name}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: 'PLight',
            fontSize: 12,
          }}>
            {formatBreed(pet.breed)}
          </Text>
          <Text style={{
            fontFamily: 'PLight',
            fontSize: 12,
            color: Colors.primary,
            paddingHorizontal: 2,
            borderRadius: 10,
            backgroundColor: Colors.lightPrimary
          }}>
            {pet.age} Years
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}