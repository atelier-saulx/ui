import React, { FC } from 'react'
import { Button, AppleIcon } from '~'

type AppleButtonProps = {
  width?: number | string
  label?: string
  clientId: string
  teamId: string
  keyId: string
}
export const AppleButton: FC<AppleButtonProps> = ({
  width = '100%',
  label = 'Continue with Apple',
  clientId,
  teamId,
  keyId,
}) => {
  console.log({ clientId, teamId, keyId })
  return (
    <Button
      icon={AppleIcon}
      color="grey"
      textAlign="center"
      style={{
        width,
        height: 48,
        marginBottom: 8,
      }}
      onClick={async () => {
        const state = { redirectUrl: window.location.href }
        const thirdPartyRedirect = global.location.origin + '/auth-apple'
        window.sessionStorage.setItem('client_id', clientId)
        window.sessionStorage.setItem('team_id', teamId)
        window.sessionStorage.setItem('key_id', keyId)
        const scope = 'openid email name'
        const url = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${thirdPartyRedirect}&scope=${scope}&response_mode=form_post`
        global.location.href = `${url}&state=${encodeURIComponent(
          JSON.stringify(state)
        )}`
      }}
      space
    >
      {label}
    </Button>
  )
}
