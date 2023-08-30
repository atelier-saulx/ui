import React, {
  FC,
  CSSProperties,
  FunctionComponent,
  ReactNode,
  MouseEventHandler,
} from 'react'
import {
  Color,
  Size,
  Icon,
  AudioIcon,
  PlayIcon,
  FileIcon,
  TextIcon,
  AttachmentIcon,
  color,
  renderOrCreateElement,
  boxShadow,
  resizeImage,
  border,
} from '~'
import { Text } from '../Text'
import { styled } from 'inlines'

type ThumbnailProps = {
  size?: Size
  img?: string
  icon?: FunctionComponent<Icon> | ReactNode
  color?: Color
  style?: CSSProperties
  label?: string
  outline?: boolean
  counter?: number
}

const CounterBadge = styled('div', {
  width: 20,
  height: 20,
  borderRadius: 10,
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  position: 'absolute',
  right: -10,
  top: -10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: boxShadow('small'),
})

const GreySquareBg = styled('div', {
  position: 'absolute',
  top: -4,
  width: 32,
  borderRadius: 4,
  height: 32,
  backgroundColor: color('background2'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

type ThumbnailFileProps = {
  mimeType?: string
  src?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ThumbnailFile: FC<ThumbnailFileProps> = ({
  mimeType,
  src,
  onClick,
}) => {
  const isImg = mimeType?.includes('image/')
  const isVideo = mimeType?.includes('video/')
  const isAudio = mimeType?.includes('audio/')
  const isTextFile = mimeType?.includes('text/')
  const isFontFile = mimeType?.includes('font/')

  return isImg ? (
    <styled.div style={{ position: 'relative' }}>
      <styled.div
        style={{
          position: 'absolute',
          top: -4,
          width: 32,
          borderRadius: 4,
          height: 32,
          backgroundPosition: 'center',
          backgroundColor: color('accent', true),
          backgroundSize: 'cover',
          backgroundImage: `url(${resizeImage(src, 32)})`,
        }}
      />
    </styled.div>
  ) : isVideo ? (
    <styled.div style={{ position: 'relative' }}>
      <styled.div
        style={{
          position: 'absolute',
          top: -4,
          width: 32,
          height: 32,
          borderRadius: 4,
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PlayIcon style={{ color: 'white', position: 'absolute' }} size={14} />
        <video src={src + '#t=5'} />
      </styled.div>
    </styled.div>
  ) : isAudio ? (
    <styled.div style={{ position: 'relative' }}>
      <GreySquareBg>
        <AudioIcon />
      </GreySquareBg>
    </styled.div>
  ) : isTextFile ? (
    <styled.div style={{ position: 'relative' }}>
      <GreySquareBg>
        <FileIcon />
      </GreySquareBg>
    </styled.div>
  ) : isFontFile ? (
    <styled.div style={{ position: 'relative' }}>
      <GreySquareBg>
        <TextIcon size={14} />
      </GreySquareBg>
    </styled.div>
  ) : (
    <styled.div style={{ position: 'relative' }}>
      <styled.div
        style={{
          position: 'absolute',
          top: -4,
          width: 32,
          borderRadius: 4,
          height: 32,
          backgroundColor: color('lightaccent'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AttachmentIcon color="accent" size={14} />
      </styled.div>
    </styled.div>
  )
}

export const Thumbnail: FC<ThumbnailProps> = ({
  size = 40,
  img,
  color: colorProp = 'accent',
  icon,
  style,
  label,
  outline,
  counter,
  ...props
}) => {
  return (
    <styled.div
      style={{
        backgroundColor: color(colorProp),
        borderRadius: 8,
        color: color(colorProp, 'contrast'),
        border: outline ? `1px solid ${color(colorProp, 'hover')}` : 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: img ? `url(${img})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        position: 'relative',
        minWidth: size,
        width: size,
        height: size,
        ...style,
      }}
      {...props}
    >
      {counter && (
        <CounterBadge>
          <Text typography="caption600">{counter}</Text>
        </CounterBadge>
      )}
      {label ? (
        <Text
          color="inherit"
          size={(+size / 2) as Size}
          style={{ lineHeight: '32px' }}
        >
          {label[0].toUpperCase() + label[1].toUpperCase()}
        </Text>
      ) : icon ? (
        renderOrCreateElement(icon, {
          size: typeof size === 'number' && size > 40 ? 20 : 16,
        })
      ) : null}
    </styled.div>
  )
}
