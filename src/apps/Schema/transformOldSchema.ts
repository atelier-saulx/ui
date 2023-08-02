import { BasedSchema } from '@based/schema'
import { useClient } from '@based/react'

// type is schema name/type
export const updateSchema = (client, db, obj, type) => {
  //   const client = useClient()

  const newFields = transformOldToNew(obj)

  // client.call('db:set-schema', obj)

  console.log('NEW FIELDS -->', newFields)

  return client.call('db:set-schema', {
    mutate: true,
    db,
    schema: {
      [type]: {
        newFields,
      },
    },
  })
}

const fieldWalker = (x) => {
  if (x.meta) {
    for (const key in x.meta) {
      x[key] = x.meta[key]
    }

    delete x.meta
  }

  return x
}

// TODO jim: add if new schema
export const transformOldToNew = (oldFields: any): BasedSchema => {
  //  console.log('oldScheam -->', oldFields)

  // loop through all these objects and see if there are meta fields
  // if there are meta fields put them on object
  const newFields = { ...oldFields }

  for (const key in oldFields) {
    newFields[key] = fieldWalker(oldFields[key])
  }

  console.log('NEW FIELDS', newFields)
  return newFields
}
