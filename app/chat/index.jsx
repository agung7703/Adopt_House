import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { addDoc, collection, doc, getDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment';

export default function ChatScreen() {

    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])
    const { user } = useUser();


    useEffect(() => {
        GetUserDetails();

        const unsubsribe = onSnapshot(
            query(collection(db, 'Chat', params?.id, 'Messages'), orderBy('createdAt', 'desc')),
            (snapshot) => {
                const messageData = snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    ...doc.data()
                }))
                setMessages(messageData)
            }
        );

        return () => unsubsribe();
    }, [])

    const GetUserDetails = async () => {
        const docRef = doc(db, 'Chat', params?.id);
        const docSnap = await getDoc(docRef);

        const result = docSnap.data();
        // console.log(result);
        const otherUser = result?.user.filter(item => item.email !== user?.primaryEmailAddress?.emailAddresses);
        navigation.setOptions({
            headerTitle: otherUser[1].name
        })

    }

    const onSend = async (newMessages) => {
        setMessages((perviousMessage) => GiftedChat.append(perviousMessage, newMessages));
        newMessages[0].createdAt = new Date().toISOString();
        await addDoc(collection(db, 'Chat', params.id, 'Messages'), newMessages[0])
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            user={{
                _id: user?.primaryEmailAddress?.emailAddress,
                name: user?.fullName,
                avatar: user?.imageUrl
            }}
        />
    )
}