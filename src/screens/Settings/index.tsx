import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'
import * as Location from 'expo-location'
import { Switch } from 'react-native'

import {
  Container, 
  SettingsContainer,
  Option,
  Label,
  Footer,
  FooterText,
  OptionButton
} from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function Settings() {
  const navigation = useNavigation()

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const handleChangePassword = () => {
    navigation.navigate('ChangePassword')
  }
  
  return (
    <Container>
      <SettingsContainer>
        <OptionButton
          onPress={handleChangePassword}
        >
          <Label>
            {t("Trocar senha")}
          </Label>
          <Feather
            name="chevron-right"
            size={20}
            color="#999"
          />
        </OptionButton>
      </SettingsContainer>
     
      <Footer>
        <FooterText>
          Version 1.1.8
        </FooterText>
      </Footer>
    </Container>
  )
}