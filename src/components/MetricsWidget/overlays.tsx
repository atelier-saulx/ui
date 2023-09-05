import React from 'react'
import {
  styled,
  color,
  IconCheckLarge,
  IconChartBar,
  Text,
  removeOverlay,
  IconChartLine,
  IconChartPie,
  IconHash,
  IconPercentage,
  IconChartBarHorizontal,
} from '../..'

const StyledSelectItem = styled('div', {
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  gap: 10,
  padding: '8px 12px',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: color('action', 'primary', 'subtleSelected'),
  },
})

// todo move to different file
export const CalculateOptionsOverlay = ({
  calculationOption,
  setCalculationOption,
}) => {
  return (
    <styled.div
      style={{
        padding: 8,
        backgroundColor: color('standalone', 'foreground', 'default'),
        width: 210,
      }}
    >
      <StyledSelectItem
        onClick={() => {
          setCalculationOption('numbers')
          removeOverlay()
        }}
      >
        <IconCheckLarge
          style={{
            opacity: calculationOption === 'numbers' ? 1 : 0,
          }}
        />
        <IconHash />
        <Text weight="medium">Total count</Text>
      </StyledSelectItem>
      <StyledSelectItem
        onClick={() => {
          setCalculationOption('percentage')
          removeOverlay()
        }}
      >
        <IconCheckLarge
          style={{ opacity: calculationOption === 'percentage' ? 1 : 0 }}
        />
        <IconPercentage />
        <Text weight="medium">Percentage</Text>
      </StyledSelectItem>
    </styled.div>
  )
}

export const ChartOptionsOverlay = ({ chartOption, setChartOption }) => {
  return (
    <styled.div
      style={{
        padding: 8,
        backgroundColor: color('standalone', 'foreground', 'default'),
        width: 210,
      }}
    >
      <StyledSelectItem
        onClick={() => {
          setChartOption('bar')
          removeOverlay()
        }}
      >
        <IconCheckLarge
          style={{
            opacity: chartOption === 'bar' ? 1 : 0,
          }}
        />
        <IconChartBarHorizontal />
        <Text weight="medium">Bar</Text>
      </StyledSelectItem>
      <StyledSelectItem
        onClick={() => {
          setChartOption('line')
          removeOverlay()
        }}
      >
        <IconCheckLarge style={{ opacity: chartOption === 'line' ? 1 : 0 }} />
        <IconChartLine />
        <Text weight="medium">Line</Text>
      </StyledSelectItem>
      <StyledSelectItem
        onClick={() => {
          setChartOption('pie')
          removeOverlay()
        }}
      >
        <IconCheckLarge style={{ opacity: chartOption === 'pie' ? 1 : 0 }} />
        <IconChartPie />
        <Text weight="medium">Pie</Text>
      </StyledSelectItem>
    </styled.div>
  )
}
