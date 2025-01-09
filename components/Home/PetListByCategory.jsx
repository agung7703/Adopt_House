import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from './PetListItem';

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [numColumns, setNumColumns] = useState(2); // State untuk jumlah kolom

  useEffect(() => {
    GetPetList('Dog');
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, 'Pets'), where('category', '==', category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      setPetList(petList => [...petList, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      {loader ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 15 }} />
      ) : (
        <FlatList
          data={petList}
          style={{ marginTop: 15 }}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={loader}
          onRefresh={() => GetPetList('Dog')}
          renderItem={({ item }) => (
            <View style={{ flex: 1, margin: 5 }}>
              <PetListItem pet={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}