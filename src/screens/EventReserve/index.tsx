import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { 
  Container,
  Header,
  ContainerIcon,
  Icon,
  Information,
  Title,
  Line,
  Subtitle,
  Date,
  Body,
  Forms,
  Form
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { EventReserveProps } from '../../interfaces/interfaces'
import { FormReserve } from '../../components/FormReserve'
import { useAuth } from '../../contexts/auth'
import { Alert } from 'react-native'

import * as eventService from '../../services/events'
import { Moment } from 'moment'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface FormProps {
  id?: string
  type: number
  title?: string
  name: string
  Rg?: string
  birthDateLabel?: string
  birthDate?: string | undefined
  register?: string
  cell: string
}

export function EventReserve() {
  const route = useRoute()
  const { user } = useAuth()
  const navigation = useNavigation()
  const params = route.params as EventReserveProps
  const [event, setEvent] = useState({} as EventReserveProps)
  const [forms, setForms] = useState<FormProps[]>([] as FormProps[])

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleSubmit() {
    const formData = forms.map(form => {
      return {
        type: form.type,
        eventID: event.id,
        name: form.name,
        Rg: form.Rg,
        birthDateLabel: form.birthDateLabel,
        Cellphone: form.cell,
        register: form.register,
        requestingUserId: user?.id,
        paid: false
      }
    })
    
    try {
      const response = await eventService.createReservation(formData as any)
      navigation.navigate('Payment', { linkPayment: response.result.sandboxInitPoint })


    } catch (error) {
      Alert.alert(
        t('Erro'), 
        t('Ocorreu um erro ao realizar sua reserva, tente novamente mais tarde.')
      )
    }
  }

  useEffect(() => {
    setEvent(params)
    
    let form = []

    for (let i = 0; i < params.forms.length; i++) {
      for(let g = 0; g < params.forms[i].value; g++) {
        form.push({
          id: params.forms[i].id + g,
          type: params.forms[i].type,
          title: params.forms[i].title + ' ' + (g + 1),
          name: '',
          Rg: '',
          birthDateLabel: '',
          register: '',
          cell: '',
        })
      }
    }

    setForms(form)
   
  }, [])

  return (
    <Container>
      <Header>
        <ContainerIcon>
          <Icon name="sports-club" />
        </ContainerIcon>
        <Information>
          <Title>
            {td(event.title, event.title_EN)}
          </Title>

          <Line />

          <Subtitle>
            {td(event.subtitle, event.subtitle_EN)}
          </Subtitle>
          <Date>
            {event.date}
          </Date>
        </Information>
      </Header>


      <Body>
        <Forms>
          <Form>
          {
            forms.map(form => (
              <FormReserve
                key={form.id}
                title={form.title}
                name={form.name}
                RG={form.Rg}
                birthDate={form.birthDateLabel}
                register={form.register}
                phone={form.cell}
                type={form.type}
                shownRGField={event.hasRg}
                shownPhoneField={event.hasCellphone}
                shownRegisterField={event.hasRegister}
                shownBirthDateField={event.hasBirthDate}
                onChangeName={(value) => {
                  form.name = value
                  setForms([...forms])
                }}
                onChangeRG={(value) => {
                  form.Rg = value
                  setForms([...forms])
                }}
                onChangeBirthDate={(value) => {
                  form.birthDateLabel = value
                  setForms([...forms])
                }}
                onChangeRegister={(value) => {
                  form.register = value
                  setForms([...forms])
                }}
                onChangePhone={(value) => {
                  form.cell = value
                  setForms([...forms])
                }}
              />
            ))
          }
          </Form>
        </Forms>

        <ButtonStandard 
          
          title={t("Reservar")}
          onPress={() => handleSubmit()}
        />
      </Body>

     
    </Container>
  )
}
                