import React, {useState} from 'react'
import { MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { View, Text} from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { BlurView } from 'expo-blur'

import { styles } from './styles'
import { ButtonBack } from '../ButtonBack'
import { useNavigation } from '@react-navigation/native'
import {ButtonLike} from '../ButtonLike'

interface Props {
	icon?: string
	urlImage: string,
	title: string,
	showFavorite?: boolean,
	showIcon?: boolean,
	isLiked?: boolean,
	handleLikeActivity: () => Promise<boolean>,
}

export function BannerActivity({ icon, urlImage, title, showFavorite = true, showIcon=true, isLiked, ...rest}: Props) {
	const navigation = useNavigation()	
	const [stateLike, setStateLike] = useState(isLiked)
	const [loading, setLoading] = useState(false)

	async function handleLikeActivity() {
		console.log('like')
		setLoading(true)
		rest.handleLikeActivity().then(() => {
			setStateLike(!stateLike)
			setLoading(false)
		})
	}

	return (
		<View>
			<Image 
				style={styles.image}
				uri={urlImage}
			/>
			<View style={styles.buttonBack}>
				<ButtonBack 
					onPress={() => navigation.goBack()}
				/>
			</View>
			<BlurView intensity={90} tint="dark" style={styles.content}>
				{
					showIcon ? (
						<View style={styles.contentIcon}>
							<Image 
								uri={'https://img.icons8.com/color/480/scania.png'}
								style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} 
							/>
						</View>
					) : (
						<View />
					)
				}
			
				<View>
					{
						title.length > 250 ? (
							<Text style={styles.title}>
								{title.substring(0, 250)}...
							</Text>
						) : (
							<Text style={styles.title}>
								{title}
							</Text>
						)
					}
				</View>
				
				{ 
					showFavorite ? (
						<ButtonLike
							isLiked={stateLike}
							onPress={() => handleLikeActivity()}
						/>						
					) : (
						<View />
					)
				}
			</BlurView>
		</View>
	)
}