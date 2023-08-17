import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useClient } from '@based/react'
import { useRoute } from 'kabouter'

import { Toast, useToast } from '../Toast'

import { IconAlarmClock } from '../../icons'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const client = useClient()
  const toast = useToast()
  const [showLoader, setShowLoader] = useState(false)

  const { authType } = useRoute('auth-[authType]').path

  const isGoogleRedirect = authType === 'google'
  const isMicrosoftRedirect = authType === 'microsoft'
  const isGithubRedirect = authType === 'github'

  const thirdPartyRedirect = isGoogleRedirect
    ? 'google'
    : isMicrosoftRedirect
    ? 'microsoft'
    : isGithubRedirect
    ? 'github'
    : false

  useEffect(() => {
    // TODO nuno fix => if we need to check for window, use typeof window !== 'undefined'
    if (thirdPartyRedirect && window) {
      setShowLoader(true)
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      const redirect = global.location.origin + `/auth-${thirdPartyRedirect}`
      let state: any
      try {
        state = JSON.parse(params.get('state'))
      } catch (error) {
        console.warn(error)
      }
      const clientId = window.sessionStorage.getItem('client_id')
      const codeVerifier = window.sessionStorage.getItem('code_verifier')
      client
        .call(
          `auth${
            thirdPartyRedirect.charAt(0).toUpperCase() +
            thirdPartyRedirect.slice(1)
          }`,
          {
            code,
            redirect,
            state,
            clientId,
            ...(codeVerifier ? { codeVerifier } : null),
          }
        )
        .then(async (response) => {
          const { token, refreshToken, email, id } = response
          // @ts-ignore
          await client.auth(token, { id, refreshToken })
          toast.add(<Toast label={'Signedin as ' + email} type="success" />)
          window.sessionStorage.removeItem('client_id')
          window.sessionStorage.removeItem('code_verifier')
          setShowLoader(false)
          // TODO nuno fix (cant check window like this)
          if (window && state.redirectUrl) {
            window.location.href = state.redirectUrl
          }
        })
        .catch((error) => {
          console.error(error)
          // TODO: get better error messages. Passing a BasedError?
          const description = error.message.includes('User already registered')
            ? 'The email is already registered'
            : error.message
          toast.add(
            <Toast
              label="Authentication Error"
              type="error"
              description={description}
            />
          )
          setShowLoader(false)
        })
    }
  }, [isGoogleRedirect, isMicrosoftRedirect])

  return showLoader ? (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%,-50%,0)',
        }}
      >
        <IconAlarmClock />
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
