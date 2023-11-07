import React, {
  FC,
  useState,
  useRef,
  TouchEventHandler,
  useEffect,
} from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { useWindowResize } from '../../hooks'
import { ColorActionColors } from '../../varsTypes'
import { prettyNumber, NumberFormat } from '@based/pretty-number'
import { BpMobile } from 'src/utils'

const StyledBgSlider = styled('div', {
  backgroundColor: genColor('action', 'neutral', 'subtleNormal'),
  borderRadius: 4,
  height: 6,
  width: '100%',
  position: 'absolute',
  bottom: 0,
})

const StyledStepProgress = styled('div', {
  backgroundColor: genColor('action', 'primary', 'normal'),
  height: 6,
  borderRadius: 4,
  width: '20%',
  position: 'absolute',
  bottom: 0,
})

const StyledThumb = styled('div', {
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: genColor('content', 'inverted', 'primary'),
  border: `5px solid ${genColor('action', 'primary', 'normal')} `,
  cursor: 'pointer',
  position: 'absolute',
  right: '-4px',
  bottom: '-2px',
  [BpMobile]: {
    width: '14px',
    height: '14px',
    right: '-2px',
    bottom: '-4px',
  },
})

const StyledLabel = styled('div', {
  padding: '4px 8px',
  width: 'fit-content',
  borderRadius: '4px',
  overflow: 'inherit',
  border: 'none',
  position: 'absolute',
  boxShadow: 'none',
  backgroundColor: genColor('background', 'inverted', 'strong'),
  transform: 'translateX(-50%)',
  bottom: 24,
  marginLeft: '-5px',
  '&::after': {
    content: `''`,
    bottom: '-4px',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '3px',
    width: '12px',
    height: '12px',
    backgroundColor: genColor('background', 'inverted', 'strong'),
    transform: 'rotate(45deg)',
    position: 'absolute',
  },
})

type Item = {
  id: string
  title: string
  index: number
}

type SliderProps = {
  color?: ColorActionColors
  data?: Item[]
  min?: number
  max?: number
  value?: number | { id: string; title: string; index: number }
  steps?: number
  style?: Style
  valueFormat?: NumberFormat
  onChange?: (value: number) => void
}

const preventBehavior = (e: Event) => {
  e.preventDefault()
}

const preventBodyScroll = () => {
  document.addEventListener('touchmove', preventBehavior, {
    passive: false,
  })
}

const getClosestIndex = (
  xPosArray: number[],
  newPercentage: number
): number => {
  for (let i = 0; i < xPosArray.length; i++) {
    const val = xPosArray[i]
    const next = xPosArray[i + 1]
    if (newPercentage === val) {
      return i
    } else if (newPercentage < next && newPercentage > val) {
      const valDiff = Math.abs(val - newPercentage)
      const nextDiff = Math.abs(next - newPercentage)
      if (valDiff <= nextDiff) {
        return i
      } else {
        return i + 1
      }
    }
  }
  return 0
}

export const Slider: FC<SliderProps> = ({
  data: items,
  min = 0,
  max,
  value,
  onChange = () => null,
  color = 'primary',
  steps = 1,
  valueFormat,
  style,
}) => {
  if (steps && max === undefined) {
    max = 10
  }

  if (steps !== 1 && !items && max) {
    items = []
    let counter = 0
    for (let i = min; i <= max; i += steps) {
      items.push({ id: `blah${i}`, index: counter, title: i.toString() })
      counter++
    }
  }

  const [containerWidth, setContainerWidth] = useState(0)
  //  const [leftContainerSide, setLeftContainerSide] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [index, setIndex] = useState(value || 0)
  const [percentageX, setPercentageX] = useState(0)

  const refRangeContainer = useRef<HTMLDivElement>(null)
  const refLeftPart = useRef<HTMLDivElement>(null)
  const refThumb = useRef<HTMLDivElement>(null)

  const windowSize = useWindowResize()

  // change on window resize
  useEffect(() => {
    setContainerWidth(
      refRangeContainer.current?.getBoundingClientRect().width || 0
    )
  }, [windowSize])

  // split number of items
  const splitUpRange: any = items
    ? 100 / (items.length - 1)
    : max
    ? max - min
    : undefined
  const xPosArray: number[] = []

  if (items) {
    for (let i = 0; i < items.length; i++) {
      xPosArray.push(items[i].index * splitUpRange)
    }
  }

  // make percentages
  const percentage = containerWidth / 100

  useEffect(() => {
    if (max) {
      if (value !== undefined && !isUpdating) {
        setPercentageX(((value as number) / max) * 100)
      }
    } else if (value !== undefined && !isUpdating) {
      setPercentageX(xPosArray[index as number])
    }
  }, [isUpdating, value, max])

  useEffect(() => {
    if (xPosArray.length) {
      setIndex(getClosestIndex(xPosArray, percentageX))
    }
  }, [xPosArray, percentageX])

  const setValue = (newPercentage: number, snap?: boolean) => {
    if (xPosArray.length) {
      if (snap && refLeftPart.current !== null) {
        refLeftPart.current.style.transition = 'width 0.4s ease'
        if (refThumb.current) {
          refThumb.current.style.transition =
            'transform 0.4s ease, opacity 0.2s'
        }
      }
      const index = getClosestIndex(xPosArray, newPercentage)
      setPercentageX(snap ? xPosArray[index] : newPercentage)
      if (value !== index) {
        onChange(index)
      }
    } else {
      setPercentageX(newPercentage)
      const newValue = max && (newPercentage * (max - min)) / 100 + min
      if (value !== newValue && typeof newValue === 'number') {
        onChange(Math.trunc(newValue))
      }
    }
  }

  const moveHandler = (x: number) => {
    if (
      refRangeContainer.current !== null &&
      refThumb.current !== null &&
      refLeftPart.current !== null
    ) {
      refRangeContainer.current.style.cursor = 'grabbing'
      refThumb.current.style.cursor = 'grabbing'
      refLeftPart.current.style.transition = 'width 0s'
      if (refThumb.current) {
        refThumb.current.style.transition = 'transform 0s, opacity 0.2s'
      }

      if (x > 0 && x < containerWidth) {
        refRangeContainer.current.style.cursor = 'pointer'

        setValue(Math.round(x / percentage))
      }
      if (x < 0) {
        setValue(0)
      }
      if (x > containerWidth) {
        setValue(100)
      }
    }
  }

  const mouseMoveHandler = (e) => {
    if (refRangeContainer.current !== null) {
      moveHandler(
        e.clientX - refRangeContainer.current.getBoundingClientRect().left
      )
    }
  }

  const mouseUpHandler = () => {
    if (refRangeContainer.current !== null && refThumb.current !== null) {
      refRangeContainer.current.style.cursor = 'pointer'
      refThumb.current.style.cursor = 'pointer'
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('mouseup', mouseUpHandler)

      setContainerWidth(
        refRangeContainer.current?.getBoundingClientRect().width || 0
      )

      setIsUpdating(false)
      // if (onEndSliding) {
      //   onEndSliding()
      // }
    }
  }

  const onMouseDownHandler = () => {
    setIsUpdating(true)

    if (refRangeContainer.current !== null) {
      refRangeContainer.current.style.cursor = 'grabbing'
    }
    // if (onStartSliding) {
    //   onStartSliding()
    // }

    window.addEventListener('mouseup', mouseUpHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
  }

  const onTouchStart = () => {
    preventBodyScroll()
    setIsUpdating(true)
    // if (onStartSliding) {
    //   onStartSliding()
    // }
  }

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    document.removeEventListener('touchmove', preventBehavior)
    setIsUpdating(false)
    // if (onEndSliding) {
    //   onEndSliding()
    // }
    onClickSnap(e)
  }

  // Touch functions
  const onTouchMoveHandler: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()

    if (refRangeContainer.current !== null) {
      moveHandler(
        e.touches[0].clientX -
          refRangeContainer.current?.getBoundingClientRect().left
      )
    }
  }

  const onClickSnap = (e) => {
    if (refRangeContainer.current) {
      const correctedMouseXPos =
        e.clientX - refRangeContainer.current?.getBoundingClientRect().left
      if (correctedMouseXPos > 0 && correctedMouseXPos < containerWidth) {
        setValue(Math.round(correctedMouseXPos / percentage), true)
      }
    }
  }

  const keyDownHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const index = getClosestIndex(xPosArray, percentageX)
    if (e.key === 'ArrowRight' && percentageX !== 100) {
      setValue(xPosArray[index + 1])
    }
    if (e.key === 'ArrowLeft') {
      setValue(xPosArray[index - 1])
    }
  }

  return (
    <styled.div
      style={{ width: '100%', position: 'relative', minWidth: 340, ...style }}
    >
      <styled.div
        tabIndex={0}
        onKeyDown={keyDownHandler}
        onMouseDown={onMouseDownHandler}
        onClick={onClickSnap}
        ref={refRangeContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEnd}
      >
        <StyledLabel style={{ left: `${percentageX}%` }}>
          <Text color="inverted" selectable="none" weight="strong">
            {items
              ? valueFormat
                ? prettyNumber(
                    Number(items[index as number]?.title),
                    valueFormat
                  )
                : items[index as number]?.title
              : max
              ? (percentageX * max) / 100
              : ''}
          </Text>
        </StyledLabel>

        <StyledBgSlider />
        <StyledStepProgress
          ref={refLeftPart}
          style={{
            width: `${percentageX}%`,
            backgroundColor: genColor('action', color, 'normal'),
          }}
        >
          <StyledThumb
            ref={refThumb}
            style={{
              border: `5px solid ${genColor('action', color, 'normal')} `,
            }}
          />
        </StyledStepProgress>
      </styled.div>
    </styled.div>
  )
}
