export default {
  languages: ['en'],
  rootType: {
    fields: {
      demoState: { type: 'record', values: { type: 'string' } },
    },
  },
  types: {
    file: {
      prefix: 'fi',
    },
    user: {
      prefix: 'us',
    },
    todo: {
      meta: {
        pluralName: '',
        description: 'We have many things todo!',
        name: 'Todo',
      },
      fields: {
        done: {
          meta: {
            name: 'done',
            index: 6,
          },
          type: 'boolean',
        },
        name: {
          meta: {
            name: 'name',
            index: 4,
          },
          type: 'string',
        },
        cycle: {
          meta: {
            name: 'cycle',
            index: 5,
          },
          type: 'int',
        },
      },
    },
    theme: {
      prefix: 'th',
      fields: {
        name: { type: 'string' },
        config: { type: 'json' },
      },
    },
  },
}
