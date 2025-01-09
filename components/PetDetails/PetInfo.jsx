import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MarkFav from '../MarkFav';

export default function PetInfo({ pet }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: pet?.imageUrl }}
                style={styles.image}
            // onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
            />

            <View style={styles.content}>
                <View>
                    <Text style={styles.petName}>{pet?.name}</Text>

                    <Text style={{
                        fontFamily: 'PLight',
                        fontSize: 14
                    }}>{pet?.address}</Text>
                </View>
                <MarkFav pet={pet} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 500,
    },
    content: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shape: {
        position: 'absolute',
        top: 420,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 1,
    },
    shadow: {
        position: 'absolute',
        top: 410,
        width: '100%',
        height: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        zIndex: 0,
        opacity: 0.7,
    },
    petName: {
        fontFamily: 'PExtraBold',
        fontSize: 25,
    },
})