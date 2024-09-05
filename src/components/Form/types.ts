type FormValues = { [key: string]: string | boolean | number | null }
type FormErrors = { [key: string]: string }
type FormState = {
  values: FormValues
  changes: FormValues
  mergedValues: FormValues
  errors: FormErrors
  isSubmitting: boolean
  isValidating: boolean
  isDirty: boolean
  prevInitialValues: FormValues
  failedAtLeastOneValidation: boolean
  numberOfInFlightValidations: number
}

export type { FormValues, FormErrors, FormState }
