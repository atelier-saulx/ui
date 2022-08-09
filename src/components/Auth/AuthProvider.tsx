import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useClient } from '@based/react'
import { useRoute } from 'wouter'
import { LoadingIcon } from '~/icons'
import { Toast, useToast } from '../Toast'

type AuthProviderProps = {
  children: ReactNode
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const client = useClient()
  const toast = useToast()
  const [showLoader, setShowLoader] = useState(false)

  const [isGoogleRedirect] = useRoute('/auth-google')
  const [isMicrosoftRedirect] = useRoute('/auth-microsoft')
  const [isGithubRedirect] = useRoute('/auth-github')
  const [isAppleRedirect] = useRoute('/auth-apple')
  const thirdPartyRedirect = isGoogleRedirect
    ? 'google'
    : isMicrosoftRedirect
    ? 'microsoft'
    : isGithubRedirect
    ? 'github'
    : isAppleRedirect
    ? 'apple'
    : false
  useEffect(() => {
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
      console.log({ params, code })
      const clientId = window.sessionStorage.getItem('client_id')
      const codeVerifier = window.sessionStorage.getItem('code_verifier')
      const teamId = window.sessionStorage.getItem('team_id')
      const keyId = window.sessionStorage.getItem('key_id')
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
            ...(teamId ? { teamId } : null),
            ...(keyId ? { keyId } : null),
          }
        )
        .then(async (response) => {
          const { token, refreshToken, email, id } = response
          await client.auth(token, { id, refreshToken })
          toast.add(<Toast label={'Signedin as ' + email} type="success" />)
          window.sessionStorage.removeItem('client_id')
          window.sessionStorage.removeItem('code_verifier')
          window.sessionStorage.removeItem('team_id')
          window.sessionStorage.removeItem('key_id')
          setShowLoader(false)
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
        <LoadingIcon size={32} />
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
