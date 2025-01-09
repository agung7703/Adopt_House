import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

export default function UserItem({ UserInfo }) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            borderWidth: 1,
            padding: 10,
            margin: 10,
            gap: 15,
            borderRadius: 10,
            backgroundColor: Colors.lightPrimary

        }}>
            <Link href={'/chat?id=' + UserInfo.docId}>
                <View style={{
                    marginVertical: 7,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                }}>
                    <Image source={{ uri: UserInfo?.imageUrl }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 99,
                        }} />
                    <Text style={{
                        fontFamily: 'PRegular',
                        fontSize: 18,
                    }}>{UserInfo?.name}</Text>
                </View>
            </Link>
        </View>
    );
}