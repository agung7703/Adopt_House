import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { query, orderBy } from "firebase/firestore"
import Colors from './../../constants/Colors'
import { TouchableOpacity } from 'react-native'

export default function Category({ category }) {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Dog')

    useEffect(() => {
        GetCategories();
    }, [])

    const GetCategories = async () => {
        setCategoryList([]);

        try {

            const categoriesRef = collection(db, 'Category');
            const q = query(categoriesRef, orderBy('id', 'asc'));
            const snapshot = await getDocs(q);


            const categories = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));


            setCategoryList(categories);

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'PSemiBold',
                fontSize: 20
            }}>Category</Text>

            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedCategory(item.name);
                            category(item.name)
                        }}
                        style={{ flex: 1 }}>
                        <View style={[styles.conatiner,
                        selectedCategory == item.name && styles.selectedCategoryContainer
                        ]}>
                            <Image
                                source={{ uri: item?.imageUrl }}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </View>
                        <Text style={{
                            textAlign: "center",
                            fontFamily: 'PRegular'
                        }}>{item?.name}</Text>
                    </TouchableOpacity>
                )
                } />
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: Colors.lightPrimary,
        padding: 15,
        marginRight: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.primary,
        margin: 5
    },
    selectedCategoryContainer: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.secondary,
    }
})