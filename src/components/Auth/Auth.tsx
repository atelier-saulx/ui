import React, { FC, useState, CSSProperties, ReactNode, useEffect } from 'react'
import { Container, Login, Register, ResetRequest } from '~'
import { Tab, Tabs } from '../Tabs'
import { LargeLogo } from '../Logo'
import { useAuthState } from '@based/react'
import useGlobalState from '@based/use-global-state'

export type ThirdPartyProvider = 'google' | 'microsoft' | 'github'
type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  register?: boolean
  onResetRequest?: () => void
  logo?: boolean | ReactNode
  overlay?: boolean
  style?: CSSProperties
  app?: FC<any | { user: { id: string; email: string } }>
  googleClientId?: string
  microsoftClientId?: string
  githubClientId?: string
  children?: ReactNode
}

export const Authorize: FC<AuthProps> = ({
  onLogin,
  onRegister,
  register = true,
  app,
  onResetRequest,
  overlay = true,
  logo,
  style,
  children,
  googleClientId,
  microsoftClientId,
  githubClientId,
}) => {
  const [showResetRequest, setShowResetRequest] = useState(false)
  // TODO nuno fix
  const [email = ''] = useGlobalState('email')
  const [fadeIn, setFade] = useState(false)

  useEffect(() => {
    if (children) {
      console.warn(
        "Don't use children with Authorize component. Use app argument instead so unauthorized components don't get rendered"
      )
    }
    const t = setTimeout(() => setFade(true), 300)
    return () => {
      clearTimeout(t)
    }
  }, [])

  const user = useAuthState()
  const [activeTab, setActiveTab] = useState(0)

  const auth = (
    <Container
      style={{
        padding: '24px 32px',
        maxWidth: 456,
        width: '100%',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s',
        boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.08)`,
        borderRadius: 8,
        ...style,
      }}
    >
      {logo === true ? <LargeLogo style={{ marginBottom: 16 }} /> : logo}
      {!showResetRequest ? (
        <Tabs
          style={{ marginBottom: 24 }}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        >
          <Tab label="Sign in">
            <Login
              onLogin={onLogin}
              onRegisterRequest={() => {
                setActiveTab(1)
              }}
              onResetRequest={() => {
                setShowResetRequest(true)
              }}
              googleClientId={googleClientId}
              microsoftClientId={microsoftClientId}
              githubClientId={githubClientId}
            />
          </Tab>
          {register || onRegister ? (
            <Tab label="Sign up">
              <Register
                email={email}
                onRegister={onRegister}
                googleClientId={googleClientId}
                microsoftClientId={microsoftClientId}
                githubClientId={githubClientId}
              />
            </Tab>
          ) : null}
        </Tabs>
      ) : (
        <ResetRequest
          style={{ marginTop: 24 }}
          onSuccess={() => {
            setShowResetRequest(false)
            onResetRequest()
          }}
          onCancel={() => {
            setShowResetRequest(false)
          }}
        />
      )}
    </Container>
  )

  if (user && user.userId) {
    if (app) {
      return React.createElement(app, { user })
    } else {
      return <div>Loggedin!</div>
    }
  }

  return overlay ? (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {auth}
    </div>
  ) : (
    auth
  )
}
