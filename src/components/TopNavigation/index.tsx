import React, { Children, FC, ReactNode } from 'react'
import { styled, Style, color } from '~'

export type TopNavigationProps = {
  children?: ReactNode | ReactNode[]
  style?: Style
}

export const TopNavigation: FC<TopNavigationProps> = ({ style, children }) => {
  return (
    <styled.div
      style={{
        height: '40px',
        padding: '12px 24px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color('background', 'default', 'strong'),
        borderBottom:
          '1px solid ' + color('inputBorder', 'neutralNormal', 'default'),
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}

//maybe?
// import React, { Children, FC, ReactNode } from 'react'
// import {
//   styled,
//   Style,
//   color,
//   IconBased,
//   Tabs,
//   Tab,
//   Breadcrumbs,
//   Avatar,
//   Button,
// } from '../..'
// import { BasedLogo } from '../../icons/BasedLogo'

// export type TopNavigationProps = {
//   logo?: any
//   breadcrumbData: any
//   tabData: any
//   children?: ReactNode | ReactNode[]
// }
// // {
// //     flip: 'flip',
// //     flap: 'flap',
// //     flup: 'flup',
// //     snip: 'snip',
// //     snap: 'snap',
// //     snurp: 'snurp',
// //   }
// export const TopNavigation: FC<TopNavigationProps> = ({
//   logo = true,
//   breadcrumbData,
//   tabData,
//   children,
// }) => {
//   return (
//     <styled.div
//       style={{
//         // width: '100%',
//         height: '40px',
//         padding: '12px 24px',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: color('background', 'default', 'strong'),
//         borderBottom:
//           '1px solid ' + color('inputBorder', 'neutralNormal', 'default'),
//       }}
//     >
//       {logo && <BasedLogo style={{ marginRight: '32px' }} />}
//       {tabData ? (
//         <Tabs style={{ marginTop: '6px' }}>
//           {tabData.map((label, children) => (
//             <Tab label={label}>{children}</Tab>
//           ))}
//         </Tabs>
//       ) : breadcrumbData ? (
//         <Breadcrumbs data={breadcrumbData} onChange={(v) => console.log(v)} />
//       ) : (
//         <></>
//       )}
//       {children}
//       <Avatar style={{ marginLeft: 'auto', marginRight: '0' }} size="small">
//         Kyle
//       </Avatar>
//     </styled.div>
//   )
// }
