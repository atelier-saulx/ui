import React, { CSSProperties, FC, ReactNode } from 'react'
import { SearchIcon } from '~/icons'
import { color } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Avatar } from '../Avatar'
import { Input } from '../Input'
import { Link, useRoute } from 'kabouter'
import { Logo } from '../Logo'
import { useQuery, useAuthState } from '@based/react'
import { stringToIcon } from '~/utils/stringToIcon'
import { Text } from '../Text'

type TopbarTabProps = {
  href?: string
  children?: ReactNode
  isActive?: boolean
  icon?: ReactNode | string[]
}

type TopbarProps = {
  data?: object
  selected?: string
  prefix?: string
  onFilter?: (params: any) => any
  onProfile?: () => void
  breadcrumbs?: ReactNode
  logo?: FC | ReactNode
  children?: ReactNode
  noLogo?: boolean
  style?: CSSProperties
  icons?: ReactNode | string
  avatar?: ReactNode
  onClick?: () => void
}

const TopbarTab: FC<TopbarTabProps> = ({ href, children, isActive, icon }) => {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        marginLeft: 24,
        paddingRight: 6,
        alignItems: 'center',
        height: 66,
        gap: 12,
        borderTop: '3px solid transparent',
        borderBottom: `3px solid ${isActive ? color('accent') : 'transparent'}`,
      }}
    >
      {icon && stringToIcon(icon)}
      <Text typo={isActive ? 'subtext600' : 'subtext500'}>{children}</Text>
    </Link>
  )
}

const TopbarSearchbar = ({ onFilter }: { onFilter?: (params: any) => any }) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Search and discover"
        icon={SearchIcon}
        onChange={onFilter}
        style={{ marginLeft: 12, marginRight: 12 }}
      />
    </>
  )
}

const Profile = ({ onProfile }) => {
  const user = useAuthState()
  const {
    data: { email },
  } = useQuery(
    // @ts-ignore
    user
      ? {
          // @ts-ignore
          $id: user.id,
          email: true,
        }
      : null
  )

  return <Avatar onClick={onProfile} label={email} size={32} />
}

export const Topbar: FC<TopbarProps> = ({
  data = {},
  icons,
  prefix = '',
  selected,
  onFilter,
  onProfile,
  avatar,
  breadcrumbs,
  children,
  logo,
  noLogo = false,
  style,
  onClick,
}) => {
  const route = useRoute()

  if (!selected) {
    selected = route.location
  }

  if (!logo && !noLogo) {
    logo = (
      <Logo
        height={32}
        width={32}
        style={{ marginLeft: 32, minHeight: 40, minWidth: 40 }}
        onClick={onClick}
      />
    )
  }

  let firstHref
  const items = Object.keys(data).map((label) => {
    const href = prefix + data[label]
    if (!firstHref) {
      firstHref = href
    }
    return {
      label,
      href,
    }
  })

  const elements = items.map(({ label, href }, i) => {
    const isActive = hrefIsActive(href, route.location, items)
    return (
      <TopbarTab
        key={href}
        href={href}
        isActive={isActive}
        icon={icons ? icons[i] : null}
      >
        {label}
      </TopbarTab>
    )
  })

  return (
    <div
      style={{
        height: 66,
        minHeight: 66,
        display: 'flex',
        borderBottom: `1px solid ${color('border')}`,
        backgroundColor: color('background'),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 24,
        ...style,
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <>
            {logo}
            {breadcrumbs}
            <div
              style={{
                display: 'flex',
                gap: icons ? 12 : 0,
              }}
            >
              {elements}
              {children ? (
                <div style={{ marginLeft: icons ? 42 : 24 }}>{children}</div>
              ) : null}
            </div>
          </>
        </div>
      </div>

      {onFilter || onProfile || avatar ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {onFilter && <TopbarSearchbar onFilter={onFilter} />}
          <div>
            {avatar || (onProfile && <Profile onProfile={onProfile} />)}
          </div>
        </div>
      ) : null}
    </div>
  )
}
