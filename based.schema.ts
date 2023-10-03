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
    theme: {
      prefix: 'th',
      fields: {
        name: { type: 'string' },
        config: { type: 'json' },
      },
    },
  },
}
