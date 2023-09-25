import React from 'react'

export const BasedLogo = (props) => {
  return (
    <svg
      width="25"
      height="32"
      viewBox="0 0 25 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.7597 10.24L10.8798 21.1198H0L10.8798 10.24H21.7597Z"
        fill="#4B41FF"
      />
      <path
        d="M24.3199 21.1201L13.44 31.9999H0L10.8798 21.1201H24.3199Z"
        fill="#FF1F85"
      />
      <path d="M10.8798 0L0 10.8798V21.1198L10.8798 10.24V0Z" fill="#008CFF" />
    </svg>
  )
}
