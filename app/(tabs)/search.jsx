import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../../config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem';
import { collection, getDocs } from 'firebase/firestore';

export default function Search() {
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        GetPets();
    }, []);

    const GetPets = async () => {
        const snapshot = await getDocs(collection(db, 'Pets'));
        const petsData = [];
        snapshot.forEach((doc) => {
            petsData.push({ id: doc.id, ...doc.data() });
        });
        setPets(petsData);
    };

    const handleInputChange = (value) => {
        setSearchTerm(value);
    };


    const filteredPets = searchTerm
        ? pets.filter(pet =>
            pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) // Pencarian tidak sensitif terhadap huruf besar/kecil
        )
        : pets;

    // console.log('Received pets:', pets);
    // console.log('Search term:', searchTerm);
    // console.log('Filtered pets:', filteredPets);

    return (
        <SafeAreaView style={{ padding: 20, marginTop: 20 }}>
            <Text style={{
                fontFamily: 'PSemiBold',
                fontSize: 30,
            }}>Find Your Pet</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Search by Breed'
                    style={styles.input}
                    onChangeText={handleInputChange}
                    value={searchTerm}
                />
                <Ionicons name="search" size={24} color={Colors.gray} />
            </View>
            <FlatList
                data={filteredPets}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()} // Pastikan setiap hewan peliharaan memiliki ID unik
                renderItem={({ item }) => <PetListItem pet={item} />}
                style={{ marginTop: 20, marginBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No pets found</Text>} // Pesan jika tidak ada hewan peliharaan ditemukan
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 7,
        fontFamily: 'PRegular',
        marginRight: 10,
    },
});