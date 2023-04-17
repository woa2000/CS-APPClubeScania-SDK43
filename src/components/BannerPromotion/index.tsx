import React from 'react'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { BlurView } from 'expo-blur'

import ScaniaLogo from "../../assets/scania-logo.png";

import { styles } from './styles'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ButtonBack } from '../ButtonBack'
import { useNavigation } from '@react-navigation/native'

import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = TouchableOpacityProps & {
  urlImage: string,
  title: string,
  subtitle: string | undefined,
  date?: string,
  showButtonBack?: boolean,
}

export function BannerPromotion({ 
  urlImage, 
  title, 
  subtitle, 
  date, 
  showButtonBack = false,
  ...rest } : Props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Image 
        style={styles.image}
        uri={urlImage}
      />
      {
        showButtonBack ? (
          <View style={styles.buttonBack}>
            <ButtonBack 
              onPress={() => navigation.goBack()}
            />
          </View>
        ) : (
          <View />
        )
      }
      <BlurView intensity={90} tint="dark" style={styles.content}>
        <View style={styles.contentIcon}>
          {/* <Image 
            uri={'https://img.icons8.com/color/480/scania.png'}
            style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} 
          /> */}
          <FontAwesome name="compass" size={70} color="#d97d54" />
        </View>
        <View>
          {
            title?.length > 250 ? (
              <Text style={styles.title}>
                {title.substring(0, 250)}...
              </Text>
            ) : (
              <Text style={styles.title}>
                {title}
              </Text>
            )
          }

          <View style={styles.line}/>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
          <Text style={styles.date}>
            {date}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  )
}