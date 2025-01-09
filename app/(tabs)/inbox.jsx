import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/Inbox/UserItem';

export default function Inbox() {

  const { user } = useUser();
  const [userList, setUserList] = useState([]); // Pastikan penamaan konsisten
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setUserList(prevList => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  const MapOtherUserList = () => {
    // console.log('User List:', userList); 
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.user?.filter(user => user?.email !== user?.primaryEmailAddress?.emailAddress);
      if (otherUser && otherUser.length > 0) {
        const result = {
          docId: record.id,
          ...otherUser[1]
        };
        list.push(result);
      }
    });
    return list;
  };

  return (
    <View style={{
      padding: 20,
      marginTop: 20,
    }}>
      <Text style={{
        fontFamily: 'PSemiBold',
        fontSize: 30,
      }}>Chat</Text>

      <FlatList
        data={userList.length > 0 ? MapOtherUserList() : []} // Cek apakah userList tidak kosong
        refreshing={loader}
        onRefresh={GetUserList}
        style={{
          marginTop: 20
        }}
        renderItem={({ item, index }) => (
          <UserItem UserInfo={item} key={index} />
        )}
      />
    </View>
  );
}