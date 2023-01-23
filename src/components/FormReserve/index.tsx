import { Moment } from 'moment-timezone'
import React from 'react'
import { Input } from '../Input'
import { InputDate } from '../InputDate'

import { 
  Container, 
  FormTitle,
  Label, 
} from './styles'

interface Props {
  type: number
  title?: string
  name?: string
  RG?: string
  phone?: string
  register?: string
  birthDate?: string
  shownRGField?: boolean
  shownPhoneField?: boolean
  shownRegisterField?: boolean
  shownBirthDateField?: boolean
  onChangeName?: (value: string) => void
  onChangeRG?: (value: string) => void
  onChangePhone?: (value: string) => void
  onChangeRegister?: (value: string) => void
  onChangeBirthDate?: (value: string) => void
}

export function FormReserve({ 
  type,
  title,
  name,
  RG,
  birthDate,
  register,
  phone,
  onChangeName,
  onChangeRG,
  onChangeBirthDate,
  onChangeRegister,
  onChangePhone,
  shownRGField,
  shownPhoneField,
  shownRegisterField,
  shownBirthDateField,
}: Props) {
  
  return (
    <Container type={type}>
      <FormTitle>
        { title }
      </FormTitle>
      
      <Label>Nome (Obrigatório)</Label>
      <Input 
        value={name}
        onChangeText={onChangeName}
        autoCapitalize='words'
      />

      {
        shownRGField ? (
          <>
            <Label>RG</Label>
            <Input 
              value={RG}
              onChangeText={onChangeRG}
              keyboardType='numeric'
              maxLength={11}
            />
          </>
        ) : null
      }

      {
        shownBirthDateField ? (
          <>
            <Label>Data de Nascimento</Label>
            <InputDate
              type={'datetime'}
              options={{
                format: 'DD-MM-YYYY',
              }}
              placeholder={'DD-MM-YYYY'}
              value={birthDate}
              onChangeText={onChangeBirthDate}
            />
          </>
        ) : null
      }

      {
        shownRegisterField ? (
          <>
            <Label>Registro</Label>
            <Input 
              value={register}
              onChangeText={onChangeRegister}
              keyboardType='numeric'
              maxLength={15}
            />
          </>
        ) : null
      }

      
      {
        shownPhoneField ? (
          <>
            <Label>Celular</Label>
            <Input 
              value={phone}
              onChangeText={onChangePhone}
              keyboardType='numeric'
              maxLength={11}
            />
          </>
        ) : null
      }
      
    </Container>
  )
}