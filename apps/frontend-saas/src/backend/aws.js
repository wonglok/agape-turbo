import { AWSBackend } from '@/../aws.config.js'
import md5 from 'md5'
import { v4 } from 'uuid'
import { proxy, useSnapshot } from 'valtio'
import { useEffect } from 'react'

export const AWSData = proxy({ jwt: '', canShow: false, userIDFromServer: false })

export function Hydration({}) {
  let aws = useSnapshot(AWSData)
  useEffect(() => {
    AWSData.jwt = localStorage.getItem('jwt')
    if (AWSData.jwt) {
      fetch(`${getBackendURL().rest}/auth-center`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          action: 'verifyJWT',
          payload: {
            jwt: AWSData.jwt,
          },
        }),
      })
        .then((resp) => {
          if (!resp.ok) {
            throw resp.json()
          } else {
            return resp.json()
          }
        })
        .then((data) => {
          AWSData.userIDFromServer = data.userID
        })
        .finally(() => {
          //
          AWSData.canShow = true
        })
        .catch((e) => {
          console.error(e)
        })
    } else {
      AWSData.canShow = true
    }
  }, [aws.jwt])

  return null
}

export const getMD5ID = () => {
  return '_' + md5(v4() + '') + ''
}

export const getID = getMD5ID

export function checkIsAddressCorrect(address) {
  try {
    return Boolean(utils.getAddress(address))
  } catch (e) {
    console.error(e)
    return false
  }
}
export const getBackendURL = () => {
  let env = process.env.NODE_ENV
  return AWSBackend[env]
}
export const loginWithPW = async ({ userID, password }) => {
  return fetch(`${getBackendURL().rest}/auth-center`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({
      action: 'getAdminJWT',
      payload: {
        userID: userID,
        password: password,
      },
    }),
  })
    .then(async (r) => {
      let data = await r.json()

      if (r.ok) {
        return data
      } else {
        throw data
      }
    })
    .then((data) => {
      console.log(data)
      localStorage.setItem('jwt', data.jwt)
      AWSData.jwt = data.jwt
    })
    .catch((data) => {
      console.error(data)
    })
}
export const loginMetamask = async () => {
  let ethers = await import('@ethersproject/providers').then((r) => r)

  let provider
  if (typeof window !== 'undefined' && window.ethereum) {
    provider = new ethers.Web3Provider(window.ethereum, 'any')
  } else {
    provider = null
  }

  await provider.send('eth_requestAccounts', [])

  let signer = provider?.getSigner()

  const providerAddress = await signer.getAddress()

  let dataObject = {
    userID: providerAddress,
    uri: `${window.location.origin}`,
  }

  let nonce = `${md5(JSON.stringify(dataObject))}`

  let rawMessage = `Login to AGAPE Engine
You: ${dataObject.userID}
Domain: ${dataObject.uri}
Nonce: ${nonce}
`
  const signature = await signer.signMessage(rawMessage)

  return fetch(`${getBackendURL().rest}/auth-center`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({
      action: 'getMetamaskJWT',
      payload: {
        rawMessage,
        signature,
        userID: providerAddress,
      },
    }),
  })
    .then(async (r) => {
      let data = await r.json()

      if (r.ok) {
        return data
      } else {
        throw data
      }
    })
    .then((data) => {
      console.log(data)
      localStorage.setItem('jwt', data.jwt)
      AWSData.jwt = data.jwt
    })
    .catch((data) => {
      console.error(data)
    })
}

export const logout = () => {
  localStorage.removeItem('jwt')
  AWSData.jwt = false
  AWSData.userIDFromServer = false
}

export const processResponse = async (r) => {
  let data = await r.json()

  if (r.ok) {
    return data
  } else {
    throw data
  }
}

export const handleError = async (r) => {
  console.error(r)
  return r
}

export class OClass {
  constructor({ baseURL = '/art-project' }) {
    this.baseURL = baseURL
    this.state = proxy({ items: [], currentID: '' })
    this.reset()
  }
  getByOID({ oid }) {
    return this.state.items.find((e) => e.oid === oid)
  }
  reset() {
    this.state = proxy({ items: [], currentID: '' })
  }
  listAll({}) {
    return fetch(`${getBackendURL().rest}${this.baseURL}`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        action: 'listAll',
        jwt: AWSData.jwt,
        payload: {},
      }),
    }).then(processResponse)
  }
  create({ object }) {
    //
    return fetch(`${getBackendURL().rest}${this.baseURL}`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        action: 'create',
        jwt: AWSData.jwt,
        payload: object,
      }),
    }).then(processResponse)
  }
  remove({ oid }) {
    //
    return fetch(`${getBackendURL().rest}${this.baseURL}`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        action: 'remove',
        jwt: AWSData.jwt,
        payload: { oid },
      }),
    }).then(processResponse)
  }

  get({ oid }) {
    //
    return fetch(`${getBackendURL().rest}${this.baseURL}`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        action: 'get',
        jwt: AWSData.jwt,
        payload: { oid },
      }),
    }).then(processResponse)
  }

  update({ object, updateState = false }) {
    //
    return fetch(`${getBackendURL().rest}${this.baseURL}`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        action: 'update',
        jwt: AWSData.jwt,
        payload: object,
      }),
    }).then(processResponse)
  }
}
