import { View, Text, StyleSheet, SectionList } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PetListByCategory from '../../components/Home/PetListByCategory';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

export default function Home() {

  const sections = [
    { title: 'Pets', data: [<PetListByCategory key="2" />] },
  ];

  return (
    <SectionList
      sections={sections}
      style={{ padding: 10, marginTop: 25, margin: 10 }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => item} // Render item secara langsung
      ListHeaderComponent={() => (
        <View>
          {/* Header */}
          <Header />

          {/* Slider */}
          <Slider />
        </View>
      )}
      ListFooterComponent={() => (
        <Link
          href={'/add-new-pet'}
          style={styles.addNewPetContainer}>
          <Ionicons name="paw" size={24} color="black" />
          <Text style={{
            fontFamily: 'PSemiBold',
            fontSize: 17
          }}>Add New Pet</Text>
        </Link>
      )}
      contentContainerStyle={{ paddingBottom: 20 }} // Padding di bagian bawah
    />
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    gap: 10,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: Colors.lightPrimary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center',
  }
});