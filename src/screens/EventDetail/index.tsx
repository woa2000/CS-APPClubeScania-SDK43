import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'
import { Dimensions, View } from 'react-native'

import {
  Container,
  Information,
  Title,
  Description,
  Vacancys,
  Group,
  Line,
  Total
} from './styles'

import { ItemGroupReserve } from '../../components/ItemGroupReserve'
import { BannerPromotion } from '../../components/BannerPromotion'
import { ButtonStandard } from '../../components/ButtonStandard'

import {
  EventDetailProps,
  NavigationParams
} from '../../interfaces/interfaces'

import * as eventService from '../../services/events'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function EventDetail() {
  const route = useRoute()
  const { fileServer } = useAuth()
  const navigation = useNavigation()
  const params = route.params as NavigationParams
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0.00)
  const [ticketTypeValue, setTicketTypeValue] = useState<Array<{ id: string; quantidade: number; }>>([])
  const [associateAdultValue, setAssociateAdultValue] = useState(0)
  const [associateChildValue, setAssociateChildValue] = useState(0)
  const [notAssociateAdultValue, setNotAssociateAdultValue] = useState(0)
  const [notAssociateChildValue, setNotAssociateChildValue] = useState(0)
  const [event, setEvent] = useState<EventDetailProps>({} as EventDetailProps)
  const [eventDate, setEventDate] = useState('')

  const { t, i18n } = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt: string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  function changeDate(date: string) {
    let dateEvent = new Date(date)

    let mm = `0${dateEvent.getUTCMonth() + 1}`.slice(-2)
    let dd = `0${dateEvent.getUTCDate()}`.slice(-2)

    let dateEventFormat = `${dd}/${mm}`

    setEventDate(dateEventFormat)
  }

  async function loadEvents(id: string) {
    try {
      const response = await eventService.getEvent(id)
      setEvent(response as EventDetailProps)
      changeDate(response.startEvent)
      console.log('Evento =>', response as EventDetailProps)
    }
    catch (error) {
      console.error('erro -> ', error)
    }
  }

  async function sumTotal() {
    if (event?.id !== undefined) {
      setTotalValue(
        associateAdultValue * event.costAssociateAdult +
        associateChildValue * event.costAssociateChild +
        notAssociateAdultValue * event.costAdult +
        notAssociateChildValue * event.costChild
      )
    }
  }

  async function handleReserveEvent() {
    navigation.navigate('EventReserve', {
      id: event.id,
      title: event.title,
      subtitle: event.subTitle,
      date: eventDate,
      forms: [
        {
          id: '1',
          type: 0,
          title: t('Associado Adulto'),
          value: associateAdultValue
        },
        {
          id: '2',
          type: 1,
          title: t('Associado Infantil'),
          value: associateChildValue
        },
        {
          id: '3',
          type: 2,
          title: t('Adulto'),
          value: notAssociateAdultValue
        },
        {
          id: '4',
          type: 3,
          title: t('Infantil'),
          value: notAssociateChildValue
        }
      ],
      hasName: event.hasName,
      hasRg: event.hasRg,
      hasBirthDate: event.hasBirthDate,
      hasCellphone: event.hasCellphone,
      hasRegister: event.hasRegister,
    })
  }

  async function handleUpdateTicketTypeValue() {

  }

  useEffect(() => {
    loadEvents(params.id as string)
      .then(() => {
        setLoading(false);

        if (event.eventsTicketTypes) {
          const initialStates = event.eventsTicketTypes?.map(objeto => ({
            id: objeto.id,
            quantidade: 0
          }));

          setTicketTypeValue(initialStates);
        }

        sumTotal();
      })
  }, [

  ])

  useEffect(() => {
    sumTotal()
  }, [
    associateAdultValue,
    associateChildValue,
    notAssociateAdultValue,
    notAssociateChildValue,
  ])

  return (
    <Container>
      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: '100%', height: '100%' }}
        animationDirection="horizontalRight"
        isLoading={loading}
        layout={[
          {
            key: 'banner',
            width: Dimensions.get('window').width,
            height: 297,
            marginBottom: 20
          },
          {
            key: 'titleAndButton',
            width: 180,
            height: 20,
            marginHorizontal: 20,
            marginBottom: 40
          },
          {
            key: 'text 1',
            width: '90%',
            height: 20,
            marginHorizontal: 20,
            marginBottom: 8
          },
          {
            key: 'text 2',
            width: '90%',
            height: 20,
            marginHorizontal: 20,
            marginBottom: 8
          },
          {
            key: 'text 3',
            width: '90%',
            height: 20,
            marginHorizontal: 20,
            marginBottom: 60
          },
          {
            key: 'button',
            width: '90%',
            height: 60,
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 40
          }
        ]}
      > */}
        <View key={event.id}>
          <BannerPromotion
            urlImage={fileServer + event.image}
            title={td(event.title, event.title_EN)}
            subtitle={td(event.subTitle, event.subTitle_EN)}
            date={eventDate}
            activeOpacity={1}
            showButtonBack={true}
          />

          <Information>
            <Title>
              {t("Informações")}
            </Title>
            <Description>
              {td(event.description, event.description_EN)}
            </Description>

            <Vacancys style={{ fontSize: 14 }}>
              {t("Vagas restantes")}
            </Vacancys>
            <Vacancys>
              0 / {event.totalRemainingVacancies}
            </Vacancys>

            {
              event.eventsTicketTypes?.map((eventsTicketType, index) => (
                <ItemGroupReserve
                  title={td(eventsTicketType.ticketType?.description ?? '', eventsTicketType.ticketType?.description_EN ?? '')}
                  price={eventsTicketType.cost}
                  vacancy={eventsTicketType.remainingVacancies}
                  value={associateAdultValue}
                  onChangeValue={handleUpdateTicketTypeValue}
                />
              ))
            }

            <Line />

            <Group>
              <Title>
                {t("Total")}
              </Title>
              <Total>
                R$ {totalValue.toFixed(2)}
              </Total>
            </Group>

            <ButtonStandard
              title={t("Eu quero")}
              onPress={() => handleReserveEvent()}
            />
          </Information>
        </View>
      {/* </SkeletonContent> */}
    </Container>
  )
}