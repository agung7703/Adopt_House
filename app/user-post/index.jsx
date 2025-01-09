import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo';
import PetListItem from './../../components/Home/PetListItem'
import Colors from '../../constants/Colors';

export default function UserPost() {
    const navigation = useNavigation();
    const { user } = useUser();
    const [userPostList, setUserPostList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'User Post'
        })
        user && GetUserPost();
    }, [user])

    const GetUserPost = async () => {
        setLoader(true);
        setUserPostList([]);
        const q = query(collection(db, 'Pets'), where('email', "==", user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            setUserPostList(prev => [...prev, doc.data()])
        })
        setLoader(false);
    }

    const OnDeletePost = (docId) => {
        Alert.alert('Do You want to delete?', 'Do You really want to delete this post', [
            {
                text: 'Cancel',
                onPress: () => console.log("Cancel Click"),
                styles: 'cancel'
            },
            {
                text: 'Yes',
                onPress: () => deletePost(docId)
            }
        ])
    }

    const deletePost = async (docId) => {
        await deleteDoc(doc(db, 'Pets', docId));
        GetUserPost();

    }

    return (
        <View style={{
            padding: 20
        }}>

            <FlatList
                data={userPostList}
                numColumns={2}
                refreshing={loader}
                onRefresh={GetUserPost}
                renderItem={({ item, index }) => (
                    <View>
                        <PetListItem pet={item} key={index} />
                        <Pressable onPress={() => OnDeletePost(item.id)} style={styles?.deleteButton}>
                            <Text style={{ fontFamily: 'PRegular', textAlign: 'center' }}>Delete</Text>
                        </Pressable>
                    </View>
                )}
            />
            {userPostList?.length == 0 && <Text>No Post Found</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: Colors.lightPrimary,
        padding: 5,
        borderRadius: 7,
        marginRight: 10,
        marginBottom: 10
    }
})