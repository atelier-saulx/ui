export const systemFields = new Set([
  'id',
  'type',
  'children',
  'parents',
  'createdAt',
  'updatedAt',
])

export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])
