import { BasedSchema, alwaysIgnore, IdIcon, systemFields } from '~'

export const createRootEditor = (schema: BasedSchema): any => {
  const typeSchema = schema.types.root
  const getFields: any = {}
  // let mimeType
  let fields = []
  for (const field in typeSchema.fields) {
    if (!alwaysIgnore.has(field)) {
      const f = typeSchema.fields[field]
      fields.push({
        name: f?.meta?.name ?? field,
        key: field,
        type: f.type,
      })
    }
  }
  fields.sort((a, b) => {
    return a.index > b.index ? 1 : a.index < b.index ? -1 : 0
  })
  for (const f of fields) {
    getFields[f.key] = true
  }
  return {}
}

export const createTypeTable = (schema: BasedSchema, type: string): any => {
  const typeSchema = schema.types[type]

  if (!typeSchema) {
    return {
      id: 'type-' + type,
      name: type,
      description: typeSchema.meta?.description || '',
      category: 'default',
      hidden: false,
      config: {},
    }
  }

  const MAX_FIELDS = 6
  const prettyName =
    typeSchema.meta?.name || type[0].toUpperCase() + type.slice(1)
  let idKey: string
  const getFields: any = {}
  let fields = []

  for (const field in typeSchema.fields) {
    if (!alwaysIgnore.has(field)) {
      const f = typeSchema.fields[field]

      if (!f) {
        console.info(field)
        continue
      }

      if (!idKey && field === 'name') {
        idKey = 'name'
      }

      if (field === 'title') {
        idKey = 'title'
      }

      const isFile =
        // @ts-ignore
        f.meta?.ui === 'file' ||
        f.meta?.format === 'file' ||
        (f.meta?.refTypes &&
          f.meta?.refTypes.length === 1 &&
          f.meta?.refTypes[0] === 'file')

      const fType = isFile && type === 'file'
      const isBytes = f.meta?.format === 'bytes'

      let d = false
      let mimeTypeKey = ''
      if (f.type === 'reference') {
        getFields[field] = {
          src: true,
          id: true,
          mimeType: true,
        }
        d = true
        mimeTypeKey = `${field}.mimeType`
      } else if (fType) {
        mimeTypeKey = 'mimeType'
        getFields.mimeType = true
      }

      fields.push({
        index: f.meta?.index ?? systemFields.has(field) ? 1e6 : 100,
        label:
          field === 'src' && type === 'file' ? 'Src' : f.meta?.name || field,
        key: field,
        customLabelComponent: field === 'id' ? IdIcon : undefined,
        type: isFile
          ? 'file'
          : isBytes
          ? 'bytes'
          : field === 'id'
          ? 'id'
          : f.type,
        mimeTypeKey,
      })
    }
  }

  fields.sort((a, b) => {
    return a.index > b.index ? 1 : a.index < b.index ? -1 : 0
  })

  fields = fields.slice(0, MAX_FIELDS)

  for (const f of fields) {
    if (!getFields[f.key]) {
      getFields[f.key] = true
    }
  }

  return {
    id: 'type-' + type,
    name: prettyName,
    description: typeSchema.meta?.description || '',
    category: 'default',
    hidden: false,
    config: {
      showFilter: !!idKey,
      type: 'content',
      view: 'table',
      target: {
        id: 'root',
        type: type,
        name: type[0].toUpperCase() + type.slice(1),
        filter: '',
      },
      function: {
        name: 'db',
        type: 'query',
        payload: {
          $language: 'en',
          $id: 'root',
          descendants: {
            $list: {
              $find: {
                $filter: idKey
                  ? [
                      {
                        $field: 'type',
                        $value: '$target.type',
                        $operator: '=',
                      },

                      {
                        $field: idKey,
                        $value: '$target.filter',
                        $operator: 'includes',
                      },
                    ]
                  : {
                      $field: 'type',
                      $value: '$target.type',
                      $operator: '=',
                    },
              },
              $sort: {
                $field: 'createdAt',
                $order: 'desc',
              },
            },
            id: true,
            ...getFields,
          },
        },
      },
      props: {
        button: {
          onClick: {
            function: {
              name: 'db:set',
              payload: idKey
                ? {
                    $language: 'en',
                    [idKey]: 'New ' + prettyName.toLocaleLowerCase(),
                    type: '$target.type',
                  }
                : {
                    $language: 'en',
                    type: '$target.type',
                  },
            },
          },
          children: ['Add new ', '$target.type'],
        },
        name: ['$target.name'],
        onClick: {
          target: {
            id: '$args.1.id',
            name: '$args.1.name',
          },
          overlay: 'type-' + type,
        },
        data: '$data.descendants',
        headers: fields,
      },
    },
  }
}

export const createTypeModal = (schema: BasedSchema, type: string): any => {
  const typeSchema = schema.types[type]

  if (!typeSchema) {
    console.log('no typeschema', type)
    return
  }

  const prettyName =
    typeSchema.meta?.name || type[0].toUpperCase() + type.slice(1)
  const getFields: any = {
    id: true,
    type: true,
  }
  let fields = []
  for (const field in typeSchema.fields) {
    if (!alwaysIgnore.has(field) && !systemFields.has(field)) {
      const f = typeSchema.fields[field]

      if (!f) {
        console.log('no', f)
        continue
      }
      // mime
      let mField: string
      // @ts-ignore
      if (type === 'file' && f.meta?.ui === 'file' && f.type === 'string') {
        mField = 'mimeType'
      } else if (
        f.type === 'reference' &&
        (f.meta?.format === 'file' ||
          (f.meta?.refTypes &&
            f.meta?.refTypes.length === 1 &&
            f.meta?.refTypes[0] === 'file'))
      ) {
        mField = `${field}.mimeType`

        getFields[field] = {
          src: true,
          id: true,
          mimeType: true,
          name: true,
        }
      }

      fields.push({
        name: f.meta?.name ?? field,
        key: field,
        type: f.type,
        index: f.meta?.index ?? 1e6,
        mimeTypeKey: mField,
        meta: f.meta,
      })
    }
  }

  fields.sort((a, b) => {
    return a.index > b.index ? 1 : a.index < b.index ? -1 : 0
  })

  for (const f of fields) {
    if (!getFields[f.key]) {
      getFields[f.key] = true
    }
  }

  // target langiahe
  return {
    id: 'type-' + type,
    name: prettyName,
    description: typeSchema.meta?.description || '',
    category: 'default',
    hidden: false,
    config: {
      type: 'content-modal',
      hidden: true,
      function: {
        name: 'db',
        payload: {
          $language: 'en',
          $id: '$target.id',
          ...getFields,
        },
      },
      props: {
        saveButton: {
          fill: true,
          large: true,
          textAlign: 'center',
          children: 'Publish',
          onClick: {
            function: {
              name: 'db:set',
              payload: {
                $language: 'en',
                $id: '$target.id',
                type: '$target.type',
                '...': '$state',
              },
            },
          },
        },
        deleteButton: {
          fill: true,
          large: true,
          textAlign: 'center',
          children: 'Delete',
          onClick: {
            function: {
              name: 'db:delete',
              payload: {
                $id: '$target.id',
              },
            },
          },
        },
        // history
        name: ['$target.name'],
        data: '$data',
        fields,
      },
    },
  }
}
