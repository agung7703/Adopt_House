import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function OwnerInfo({ pet }) {

  return (
    <View style={styles?.container}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }}>
        <Image
          source={{ uri: pet?.userImage }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
          }}
        />
        <View>
          <Text style={{
            fontFamily: 'PMedium',
            fontSize: 17
          }}>{pet?.username}</Text>
          <Text style={{
            fontFamily: 'PRegular',
            color: Colors.gray
          }}>Pet Owner</Text>

        </View>
      </View>
      <FontAwesome name="send" size={24} color={Colors.primary} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  }
})