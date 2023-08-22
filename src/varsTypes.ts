export type ColorContentOptions = 'primary' | 'secondary'
export type ColorContentColors =
  | 'default'
  | 'inverted'
  | 'informative'
  | 'positive'
  | 'warning'
  | 'negative'
  | 'brand'
export type ColorBorderOptions = 'strong' | 'subtle'
export type ColorBorderColors =
  | 'default'
  | 'inverted'
  | 'informative'
  | 'positive'
  | 'warning'
  | 'negative'
  | 'brand'
export type ColorBackgroundOptions =
  | 'strong'
  | 'muted'
  | 'soft'
  | 'subtle'
  | 'surface'
export type ColorBackgroundColors =
  | 'default'
  | 'inverted'
  | 'neutral'
  | 'informative'
  | 'positive'
  | 'warning'
  | 'negative'
  | 'brand'
export type ColorActionOptions =
  | 'normal'
  | 'hover'
  | 'active'
  | 'selected'
  | 'subtleNormal'
  | 'subtleHover'
  | 'subtleActive'
  | 'subtleSelected'
export type ColorActionColors =
  | 'primary'
  | 'neutral'
  | 'system'
  | 'inverted'
  | 'alert'
export type ColorInputBorderOptions = 'default'
export type ColorInputBorderColors =
  | 'normal'
  | 'hover'
  | 'active'
  | 'selected'
  | 'neutralNormal'
  | 'neutralHover'
  | 'neutralActive'
  | 'neutralSelected'
  | 'alert'
export type ColorStandaloneOptions = 'default'
export type ColorStandaloneColors =
  | 'modal'
  | 'dimmer'
  | 'foregroundSubtle'
  | 'foreground'
  | 'foregroundContent'
export type ColorSemanticOptions = number
export type ColorSemanticColors =
  | 'brand'
  | 'neutral'
  | 'neutralAlpha'
  | 'informative'
  | 'positive'
  | 'warning'
  | 'negative'
export type ColorNonSemanticContentOptions = 'primary' | 'secondary'
export type ColorNonSemanticContentColors =
  | 'grey'
  | 'white'
  | 'red'
  | 'raspberry'
  | 'magenta'
  | 'purple'
  | 'grape'
  | 'violet'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'aquamarine'
  | 'green'
  | 'emerald'
  | 'orange'
export type ColorNonSemanticBorderOptions = 'strong' | 'subtle'
export type ColorNonSemanticBorderColors =
  | 'grey'
  | 'white'
  | 'red'
  | 'raspberry'
  | 'magenta'
  | 'purple'
  | 'grape'
  | 'violet'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'aquamarine'
  | 'green'
  | 'emerald'
  | 'orange'
export type ColorNonSemanticBackgroundOptions =
  | 'strong'
  | 'muted'
  | 'soft'
  | 'subtle'
  | 'surface'
export type ColorNonSemanticBackgroundColors =
  | 'grey'
  | 'white'
  | 'red'
  | 'raspberry'
  | 'magenta'
  | 'purple'
  | 'grape'
  | 'violet'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'aquamarine'
  | 'green'
  | 'emerald'
  | 'orange'
export type ColorGlobalOptions = number
export type ColorGlobalColors =
  | 'coolGrey'
  | 'coolGreyAlpha'
  | 'neutralGrey'
  | 'neutralGreyAlpha'
  | 'warmGrey'
  | 'warmGreyAlpha'
  | 'whiteAlpha'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'raspberry'
  | 'magenta'
  | 'purple'
  | 'grape'
  | 'violet'
  | 'cyan'
  | 'teal'
  | 'aquamarine'
  | 'emerald'
export type ColorGroups = {
  content: ColorContentColors
  border: ColorBorderColors
  background: ColorBackgroundColors
  action: ColorActionColors
  inputBorder: ColorInputBorderColors
  standalone: ColorStandaloneColors
  semantic: ColorSemanticColors
  nonSemanticContent: ColorNonSemanticContentColors
  nonSemanticBorder: ColorNonSemanticBorderColors
  nonSemanticBackground: ColorNonSemanticBackgroundColors
  global: ColorGlobalColors
}
export type ColorGroupsOptions = {
  content: ColorContentOptions
  border: ColorBorderOptions
  background: ColorBackgroundOptions
  action: ColorActionOptions
  inputBorder: ColorInputBorderOptions
  standalone: ColorStandaloneOptions
  semantic: ColorSemanticOptions
  nonSemanticContent: ColorNonSemanticContentOptions
  nonSemanticBorder: ColorNonSemanticBorderOptions
  nonSemanticBackground: ColorNonSemanticBackgroundOptions
  global: ColorGlobalOptions
}
