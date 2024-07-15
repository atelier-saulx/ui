type Theme = 'light' | 'dark'

const theme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light'

const rawColors = {
  neutral100: { light: '#09090B', dark: '#F4F4F5' },
  neutral80: { light: '#09090BCC', dark: '#F4F4F5CC' },
  neutral60: { light: '#09090B99', dark: '#F4F4F566' },
  neutral20: { light: '#09090B33', dark: '#F4F4F533' },
  neutral20Adjusted: { light: '#09090B1A', dark: '#F4F4F533' },
  neutral10: { light: '#09090B1A', dark: '#F4F4F51A' },
  neutral10Adjusted: { light: '#09090B0D', dark: '#F4F4F51A' },
  neutral10Background: { light: '#F4F4F5', dark: '#F4F4F51A' },
  neutral5: { light: '#09090B0D', dark: '#F4F4F50D' },
  neutralInverted100: { light: '#F4F4F5', dark: '#09090B' },
  neutralInverted80: { light: '#F4F4F5', dark: '#09090BCC' },
  neutralInverted60: { light: '#F4F4F566', dark: '#09090B99' },
  neutralInverted20: { light: '#F4F4F533', dark: '#09090B33' },
  neutralInverted10: { light: '#F4F4F533', dark: '#09090B1A' },
  neutralInverted5: { light: '#F4F4F51A', dark: '#09090B0D' },
  red100: { light: '#ED3131', dark: '#EF4444' },
  red80: { light: '#ED3131CC', dark: '#EF4444CC' },
  red60: { light: '#ED313199', dark: '#EF444499' },
  red20: { light: '#ED313133', dark: '#EF444433' },
  red10: { light: '#ED31311A', dark: '#EF44441A' },
  red5: { light: '#ED31310D', dark: '#EF44440D' },
  amber100: { light: '#EB980A', dark: '#F59E0B' },
  amber80: { light: '#EB980ACC', dark: '#F59E0BCC' },
  amber60: { light: '#EB980A99', dark: '#F59E0B99' },
  amber20: { light: '#EB980A33', dark: '#F59E0B33' },
  amber10: { light: '#EB980A1A', dark: '#F59E0B1A' },
  amber5: { light: '#EB980A0D', dark: '#F59E0B0D' },
  indigo100: { light: '6366F1#', dark: '#7C7EF4' },
  indigo80: { light: '#6366F1CC', dark: '#7C7EF4CC' },
  indigo60: { light: '#6366F199', dark: '#7C7EF499' },
  indigo20: { light: '#6366F133', dark: '#7C7EF433' },
  indigo10: { light: '#6366F11A', dark: '#7C7EF41A' },
  indigo5: { light: '#6366F10D', dark: '#7C7EF40D' },
  green100: { light: '#0FA976', dark: '#10B981' },
  green80: { light: '#0FA976CC', dark: '#10B981CC' },
  green60: { light: '#0FA97699', dark: '#10B98199' },
  green20: { light: '#0FA97633', dark: '#10B98133' },
  green10: { light: '#0FA9761A', dark: '#10B9811A' },
  green5: { light: '#0FA9760D', dark: '#10B9810D' },
  white100: { light: '#F4F4F5', dark: '#F4F4F5' },
  white80: { light: '#F4F4F5CC', dark: '#F4F4F5CC' },
  white60: { light: '#F4F4F599', dark: '#F4F4F599' },
  white20: { light: '#F4F4F533', dark: '#F4F4F533' },
  white10: { light: '#F4F4F51A', dark: '#F4F4F51A' },
  white5: { light: '#F4F4F50D', dark: '#F4F4F50D' },
  black100: { light: '#09090B', dark: '#09090B' },
  black80: { light: '#09090BCC', dark: '#09090BCC' },
  black60: { light: '#09090B99', dark: '#09090B99' },
  black20: { light: '#09090B33', dark: '#09090B33' },
  black10: { light: '#09090B1A', dark: '#09090B1A' },
  black5: { light: '#09090B0D', dark: '#09090B0D' },
}

type Color = keyof typeof rawColors

const colors = new Proxy(rawColors, {
  get: (target, prop) => {
    if (!(prop in target)) {
      throw new Error('invalid color')
    }

    return target[prop as keyof typeof target][theme]
  },
  set: () => false,
}) as unknown as Record<keyof typeof rawColors, string>

export { colors, Color }
