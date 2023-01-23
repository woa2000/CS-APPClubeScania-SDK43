import api from './api'
import { JWT } from '../interfaces/interfaces'

export function RegisterService(
  username: string, 
  password: string, 
  email: string, 
  birthDate: string
  ) : Promise<JWT> {
    const data = {
      cpf: username,
      birthdate: birthDate,
      email: email,
      password: password
    }
    console.log(data)
    return new Promise(resolve => {
      api.post('auth/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
      const data = response.data as JWT
      resolve({
        token: data.token,
        user : {
          id: data.user?.id,
          nome : data.user?.nome,
          cpf : data.user?.cpf,
          email : data.user?.email,
          dataNascimento: data.user?.dataNascimento,
          celular : data.user?.celular,
        },
        fileServer: data.fileServer,
        error: data.error
      })
    })

    .catch((err) => {
      resolve({
          token : null,
          user: null,
          fileServer: null,
          error: err.response.data
      })
    });
  })
}

