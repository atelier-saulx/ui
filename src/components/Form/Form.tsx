import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useForm, UseFormProps } from './useForm.js'
import { FormFieldProps } from './FormField.js'
import { SelectInputProps } from '../SelectInput/index.js'
import { DateInputProps } from '../DateInput/index.js'
import { IconProps } from '../Icon/index.js'
import { FormValues } from './types.js'
import { FormSidebar } from './FormSidebar.js'
import { FormFields as FormFieldsComponent } from './FormFields.js'

const FormContext = createContext<{
  fields: FormFields
  groups: FormProps['groups']
  form: ReturnType<typeof useForm>
} | null>(null)

type TextFormField = { type: 'text' }
type TextAreaFormField = { type: 'textarea' }
type NumberFormField = { type: 'number' }
type SwitchFormField = { type: 'switch' }
type CheckboxFormField = { type: 'checkbox' }
type DateTimeFormField = { type: 'datetime' } & Pick<DateInputProps, 'variant'>
type SelectFormField = {
  type: 'select'
} & Pick<SelectInputProps, 'options' | 'filterable'>
type RichTextFormField = { type: 'richtext' }
type FormFields = {
  [key: string]: (
    | TextFormField
    | TextAreaFormField
    | NumberFormField
    | SwitchFormField
    | CheckboxFormField
    | DateTimeFormField
    | SelectFormField
    | RichTextFormField
  ) &
    Pick<FormFieldProps, 'label' | 'description' | 'note'>
}

type FormProps = {
  children: ReactNode | ((form: ReturnType<typeof useForm>) => React.ReactNode)
  groups?: {
    label: string
    description?: string
    icon?: IconProps['variant']
    fields: string[]
  }[]
  fields: FormFields | ((values: FormValues) => FormFields)
} & UseFormProps

function Form({
  fields: fieldsProp,
  groups,
  children,
  ...useFormProps
}: FormProps) {
  const form = useForm(useFormProps)
  const fields =
    typeof fieldsProp === 'function' ? fieldsProp(form.values) : fieldsProp

  if (groups) {
    const allFieldsInGroups = groups.flatMap((e) => e.fields)
    const allFields = Object.keys(fields)

    if (
      allFieldsInGroups.length !== allFields.length ||
      !allFieldsInGroups.every((e) => allFields.includes(e)) ||
      !allFields.every((e) => allFieldsInGroups.includes(e))
    ) {
      throw new Error('Form: mismatch in fields and groups.')
    }
  }

  return (
    <FormContext.Provider
      value={{
        fields,
        groups,
        form,
      }}
    >
      {typeof children === 'function' ? children(form) : children}
    </FormContext.Provider>
  )
}

Form.Fields = FormFieldsComponent
Form.Sidebar = FormSidebar

export { Form, FormContext }
export type { FormProps, FormFields }
