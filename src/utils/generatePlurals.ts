import plur from 'plur'

// /**
//  * Call function once.
//  */
// export const once = <A extends any[], R, T>(
//   fn: (this: T, ...arg: A) => R
// ): ((this: T, ...arg: A) => R | undefined) => {
//   let done = false

//   return function (this: T, ...args: A) {
//     return done ? void 0 : ((done = true), fn.apply(this, args))
//   }
// }

export const generatePlural = (string: string) => {
  return plur(string) || `${string}s`
}

export const getPluralName = (schema: any, type: string) => {
  let pluralName = schema.types[type]?.meta?.pluralName
  if (!pluralName) {
    const name = schema.types[type]?.meta?.name || type
    pluralName = generatePlural(name)
  }
  return capitalize(pluralName)
}

// export const getName = (schema: any, type: string) => {
//   return capitalize(schema.types[type]?.meta?.name || type)
// }

export const capitalize = (name: string, allWords?: boolean): string => {
  if (!name) {
    return ''
  }
  if (allWords) {
    return name
      .split(' ')
      .map((word) => capitalize(word))
      .join(' ')
  }
  return name[0].toUpperCase() + name.substring(1)
}

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'disjunction',
})

export const parseTypeNames = (schema: any, field: any, max = 5): string => {
  let types =
    formatter.format(
      field.meta?.refTypes?.slice(0, max).map((t: string) => {
        return getPluralName(schema, t)
      })
    ) || 'references'

  if (field.meta?.refTypes?.length > max) {
    types += ' (and ' + (field.meta?.refTypes?.length - max) + ' more)'
  }
  return types
}

export const parseDisplayName = (field: any, name: string): string => {
  let displayName = field.meta?.name || name
  if (displayName === 'createdAt') {
    displayName = 'Created At'
  }
  if (displayName === 'updatedAt') {
    displayName = 'Updated At'
  }
  displayName = capitalize(displayName)
  return displayName
}
