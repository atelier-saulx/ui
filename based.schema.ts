export default {
  languages: ['en'],
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
