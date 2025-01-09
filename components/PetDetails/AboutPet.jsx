import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';

export default function AboutPet({pet}) {
    const [readMore, setReadMore]=useState(false);
  return (
    <View style={{
        padding:20,
    }}>
        <Text style={{
        fontFamily:'PSemiBold',
        fontSize:17
      }}>About {pet?.name}</Text>
        <Text 
            numberOfLines={readMore ? undefined : 3} 
            style={{
                fontFamily: 'PRegular',
                fontSize: 15,
                textAlign:'justify'
                }}
            >{pet?.about}</Text>
        <Pressable onPress={() => setReadMore(!readMore)}>
            <Text style={{
                fontFamily: 'PSemiBold',
                fontSize: 15,
                color: Colors.secondary,
            }}>{readMore ? "Show Less" : "Show More"}</Text>
        </Pressable>
    </View>
  )
}