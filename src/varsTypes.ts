
export type Background = "informativeOnSubtle" | "positiveOnSubtle" | "warningOnSubtle" | "negativeOnSubtle" | "brandOnSubtle" | "default" | "neutralStrong" | "neutralOnSubtle" | "informativeStrong" | "positiveStrong" | "warningStrong" | "negativeStrong" | "brandStrong"
export type Action = "primarySubtle" | "primarySubtleHover" | "primarySubtleActive" | "primarySubtleSelected" | "alertSubtle" | "alertSubtleHover" | "alertSubtleActive" | "alertSubtleSelected" | "backgroundModeless" | "primary" | "primaryHover" | "primaryActive" | "primarySelected" | "neutral" | "neutralHover" | "neutralActive" | "neutralSelected" | "neutralSubtle" | "neutralSubtleHover" | "neutralSubtleActive" | "neutralSubtleSelected" | "ghost" | "ghostHover" | "ghostActive" | "ghostSelected" | "inverted" | "alert" | "alertHover" | "alertActive" | "alertSelected" | "borderActive" | "borderNeutral" | "borderNeutralHover" | "borderNeutralActive" | "borderNeutralSelected" | "borderAlert"
export type NonSemantic = "borderGreyStrong" | "backgroundRedMuted" | "backgroundRedOnSubtle" | "backgroundRaspberryMuted" | "backgroundRaspberryOnSubtle" | "backgroundMagentaMuted" | "backgroundMagentaOnSubtle" | "backgroundPurpleMuted" | "backgroundPurpleOnSubtle" | "backgroundGrapeMuted" | "backgroundGrapeOnSubtle" | "backgroundVioletMuted" | "backgroundVioletOnSubtle" | "backgroundBlueMuted" | "backgroundBlueOnSubtle" | "backgroundCyanMuted" | "backgroundCyanOnSubtle" | "backgroundTealMuted" | "backgroundTealOnSubtle" | "backgroundAquamarineMuted" | "backgroundAquamarineOnSubtle" | "backgroundGreenMuted" | "backgroundGreenOnSubtle" | "backgroundEmeraldMuted" | "backgroundEmeraldOnSubtle" | "backgroundOrangeMuted" | "backgroundOrangeOnSubtle" | "contentWhitePrimary" | "contentRedPrimary" | "contentRaspberryPrimary" | "contentMagentaPrimary" | "contentPurplePrimary" | "contentGrapePrimary" | "contentVioletPrimary" | "contentBluePrimary" | "contentCyanPrimary" | "contentTealPrimary" | "contentAquamarinePrimary" | "contentGreenPrimary" | "contentEmeraldPrimary" | "contentOrangePrimary" | "backgroundRedStrong" | "backgroundRaspberryStrong" | "backgroundMagentaStrong" | "backgroundPurpleStrong" | "backgroundGrapeStrong" | "backgroundVioletStrong" | "backgroundBlueStrong" | "backgroundCyanStrong" | "backgroundTealStrong" | "backgroundAquamarineStrong" | "backgroundGreenStrong" | "backgroundEmeraldStrong" | "backgroundOrangeStrong"
export type Global = "coolGrey" | "coolGreyAlphaGreya" | "neutralGrey" | "whiteAlphaTransparent" | "whiteAlphaWhitea2" | "whiteAlphaWhitea0" | "whiteAlphaWhitea" | "blue" | "green" | "red" | "orange" | "raspberry" | "magenta" | "purple" | "grape" | "violet" | "cyan" | "teal" | "aquamarine" | "emerald"
export type Radius = "xs" | "s" | "m" | "l" | "xxl"
export type Content = "primary" | "secondary" | "invertedPrimary" | "informativePrimary" | "positivePrimary" | "warningPrimary" | "negativePrimary" | "brandPrimary"
export type Border = "default" | "brandStrong"
export type Semantic = "brand" | "neutral" | "neutralAlphaNeutrala" | "informative" | "positive" | "warning" | "negative"
export type ColorGroups = {
  background: Background,
  action: Action,
  nonSemantic: NonSemantic,
  global: Global,
  radius: Radius,
  content: Content,
  border: Border,
  semantic: Semantic,}