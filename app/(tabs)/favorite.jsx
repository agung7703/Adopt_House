import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { db } from './../../config/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import PetListItem from '../../components/Home/PetListItem';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  // Fav Ids
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites || []);
    setLoader(false);
    if (result?.favorites && result.favorites.length > 0) {
      GetFavPetList(result.favorites);
    }
  }

  // Fetch Related Pet list
  const GetFavPetList = async (favId_) => {
    setLoader(true);
    setFavPetList([]);
    if (favId_ && favId_.length > 0) {
      const q = query(collection(db, 'Pets'), where('id', 'in', favId_));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setFavPetList(prev => [...prev, doc.data()]);
      });
    }
    setLoader(false);
  }

  return (
    <View style={{
      padding: 20,
      marginTop: 20,
    }}>
      <Text style={{
        fontFamily: 'PSemiBold',
        fontSize: 30
      }}>Favorite</Text>

      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        style={{ marginBottom: 50 }}
        refreshing={loader}
        renderItem={({ item }) => {
          return (
            <View>
              <PetListItem pet={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />

    </View>
  )
}