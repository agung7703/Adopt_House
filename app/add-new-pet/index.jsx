import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, orderBy, query, setDoc, then, doc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {

    const navigation = useNavigation();
    const [formData, setFormData] = useState(
        { category: 'Dog', sex: 'Male' }
    );
    const [gender, setGender] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState()
    const [image, setImage] = useState();
    const [loader, setLoader] = useState(false);

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Pet'
        })
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

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const onSubmit = () => {
        if (Object.keys(formData).length != 8) {
            ToastAndroid.show('Enter All Details', ToastAndroid.SHORT)
            return;
        }
        UploadImage();
    }

    const UploadImage = async () => {
        setLoader(true);
        const resp = await fetch(image);
        const blobImage = await resp.blob();
        const storageRef = ref(storage, '/PetAdopt/' + Date.now() + '.jpg')

        uploadBytes(storageRef, blobImage).then((snapshot) => {
            console.log('File Uploaded')
        }).then(res => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                // console.log(downloadUrl);
                SaveFormData(downloadUrl);
            })
        })
    }

    const SaveFormData = async (imageUrl) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'Pets', docId), {
            ...formData,
            imageUrl: imageUrl,
            username: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            id: docId,
        })
        setLoader(false);
        router.replace('/(tabs)/home')
    }

    return (
        <ScrollView style={{
            padding: 20,

        }}>
            <Text style={{
                fontFamily: 'PMedium',
                fontSize: 20
            }}>Add New Pet for adoption</Text>

            <Pressable onPress={imagePicker}>

                {!image ? <Image source={require('./../../assets/images/icon.png')}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: Colors.gray,
                    }}
                /> :
                    <Image source={{ uri: image }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15,
                        }}
                    />}
            </Pressable>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Name *</Text>
                <TextInput placeholder='Pet Name' style={styles.input}
                    onChangeText={(value) => handleInputChange('name', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Category *</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedCategory(itemValue);
                        handleInputChange('category', itemValue)
                    }}>
                    {categoryList.map((category, index) => (
                        <Picker.Item key={index} label={category.name} value={category.name} />
                    ))}
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Breed *</Text>
                <TextInput placeholder='Breed' style={styles.input}
                    onChangeText={(value) => handleInputChange('breed', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age *</Text>
                <TextInput placeholder='Age' style={styles.input}
                    keyboardType='number-pad'
                    onChangeText={(value) => handleInputChange('age', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender *</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        setGender(itemValue);
                        handleInputChange('sex', itemValue)

                    }}>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Weight *</Text>
                <TextInput placeholder='Weight' style={styles.input}
                    keyboardType='number-pad'
                    onChangeText={(value) => handleInputChange('weight', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address *</Text>
                <TextInput placeholder='Address' style={styles.input}
                    onChangeText={(value) => handleInputChange('address', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>About *</Text>
                <TextInput placeholder='About' style={styles.input}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={(value) => handleInputChange('about', value)} />
            </View>

            <TouchableOpacity
                style={styles.button}
                disabled={loader}
                onPress={onSubmit}>
                {loader ? <ActivityIndicator size={'large'} /> :
                    <Text style={{ fontFamily: 'PSemiBold', textAlign: 'center' }}>Submit</Text>
                }
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5
    },
    input: {
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 7,
        fontFamily: 'PRegular'
    },
    label: {
        marginVertical: 5,
        fontFamily: 'PRegular'
    },
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 7,
        marginVertical: 20,
        marginBottom: 50,

    }
})