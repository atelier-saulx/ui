import React, { useState, useRef, useEffect } from 'react'
import { Text, Select, color, CloseCircleIcon, removeAllOverlays } from '~'
import { styled } from 'inlines'

// TODO: Onclick altijd focus op filter typ veld.
// TODO: CLick on middle en dan tab should move to next
// TODO: Mag nooit leeg zijn of iets wat niet bestaat.
// TODO: auto hover focus on eerste resultaat en submit met enter

// move this
const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']

export const FirstFilterPill = ({ setIsFocus }) => {
  const [pillInputValue, setPillInputValue] = useState('Type Is Flappie')
  const [pillIsSelected, setPillIsSelected] = useState(false)

  const inputRef = useRef(null)

  const controller = new AbortController()

  useEffect(() => {
    if (pillIsSelected) {
      setIsFocus(true)
      document.addEventListener('keydown', (e) => onKeyHandler(e), {
        signal: controller.signal,
      })
    } else if (!pillIsSelected) {
      setIsFocus(false)
      controller.abort()
    }
  }, [pillIsSelected])

  useEffect(() => {
    setPillIsSelected(false)
    setIsFocus(false)
    controller.abort()
  }, [pillInputValue])

  let cnt = 0

  const onKeyHandler = (e) => {
    if (pillIsSelected) {
      if (e.key === 'Tab') {
        cnt++
      }
      if (cnt === 1) {
        removeAllOverlays()
        console.log('TAB cnt  ===> 👻', cnt)
        inputRef.current.nextElementSibling.childNodes[1].childNodes[0].click()
      }
      if (cnt === 2) {
        removeAllOverlays()
        inputRef.current.nextElementSibling.childNodes[2].childNodes[0].click()
      }
      if (cnt === 3) {
        removeAllOverlays()
        setPillIsSelected(false)
        setIsFocus(false)
        cnt = 0
        controller.abort()
      }
      console.log('Count', cnt)
    }

    if (e.key === 'Backspace' && pillIsSelected) {
      deletePill()
    }

    if (e.key !== 'Tab') {
      setPillIsSelected(false)
      cnt = 0
      controller.abort()
    }
  }

  const deletePill = () => {
    setPillIsSelected(false)
    setPillInputValue('')
  }

  return (
    <>
      <input
        ref={inputRef}
        value={pillInputValue}
        onChange={(e) => setPillInputValue(e.target.value)}
        style={{ border: '1px solid green', position: 'absolute', top: 20 }}
      />
      <div style={{ display: 'flex', position: 'relative' }}>
        {pillInputValue.split(' ').map((item, idx) => (
          <styled.div
            style={{
              height: 28,
              padding: idx === 0 ? 8 : 0,
              display: 'flex',
              alignItems: 'center',
              borderTopLeftRadius: idx === 0 ? 4 : 0,
              borderBottomLeftRadius: idx === 0 ? 4 : 0,
              borderTopRightRadius: idx === 2 ? 4 : 0,
              borderBottomRightRadius: idx === 2 ? 4 : 0,
              backgroundColor: pillIsSelected
                ? 'rgba(44, 60, 234, 0.08)'
                : color('lightgrey'),
              borderRight: `1px solid ${color('border')}`,
              position: 'relative',
              cursor: 'text',
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: pillIsSelected
                    ? 'rgba(44, 60, 234, 0.08)'
                    : color('lightgrey:hover'),
                },
              },
            }}
            key={idx}
            onClick={() => {
              cnt = 0
              setPillIsSelected(true)
            }}
          >
            {idx === 0 && <Text color="text2">{item}</Text>}

            {idx !== 0 && (
              <Select
                ghost
                value={pillInputValue.split(' ')[idx]}
                filterable
                // @ts-ignore
                style={{
                  // @ts-ignore
                  '& div': { padding: '8px', display: 'flex' },
                  '& svg': { display: 'none' },
                }}
                onChange={(e: string) => {
                  console.log('Change --> ', e)
                  const temp = pillInputValue.split(' ')
                  temp[idx] = e
                  setPillInputValue(temp.join(' '))
                  setPillIsSelected(false)
                  controller.abort()
                }}
                options={
                  idx === 1
                    ? compareOperators
                    : ['Snurpie', 'Flurpie', 'Snorkies']
                }
                placeholder=""
                onClick={() => {
                  setIsFocus(true)

                  if (idx === 1) {
                    setPillIsSelected(true)
                    cnt = 2
                  }
                }}
              />
            )}
          </styled.div>
        ))}
        {pillIsSelected && (
          <CloseCircleIcon
            color="accent"
            size={12}
            style={{
              position: 'absolute',
              top: -4,
              right: -5,
              cursor: 'pointer',
            }}
            onClick={() => deletePill()}
          />
        )}
      </div>
    </>
  )
}
