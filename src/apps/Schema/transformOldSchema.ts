import { BasedSchema } from '@based/schema'
import { useClient } from '@based/react'

export const updateSchema = (obj, client) => {
  //   const client = useClient()

  client.call('db:set-schema', obj)
}

// const fieldWalker =(x): any => {

//     let nSchema
//         //

//     for (let key in x) {
//         //

//         return {  f...field , ...meta }
//     }

// }

const fieldWalker = (x) => {
  if (x.meta) {
    console.log('ALARM ', x)
    for (const key in x.meta) {
      console.log('keyy>? ', key)
      x[key] = x.meta[key]
    }
  }

  return x
}

// TODO jim: add if new schema
export const transformOldToNew = (oldSchema: any): BasedSchema => {
  console.log('oldScheam -->', oldSchema)

  // loop through all these objects and see if there are meta fields
  // if there are meta fields put them on object

  const newSchema = { ...oldSchema }

  for (const key in oldSchema) {
    newSchema[key] = fieldWalker(oldSchema[key])
  }

  console.log('NEW SCHEMA', newSchema)
  return newSchema
}
