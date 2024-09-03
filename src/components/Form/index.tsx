import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { Text } from '../Text/index.js'
import { useRerender } from '../../hooks/useRerender.js'
import { deepEqual } from '../../utils/deepEqual.js'

type FormValues = { [key: string]: string | boolean | number }
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

type UseFormProps = {
  initialValues: FormValues
  onSubmit: (values: FormValues) => void | Promise<void>
  validate?: (values: FormValues) => FormErrors | Promise<FormErrors>
}

function useForm({ initialValues, onSubmit, validate }: UseFormProps) {
  const rerender = useRerender()
  const state = useRef<FormState>({
    values: initialValues,
    changes: {},
    mergedValues: initialValues,
    errors: {},
    isSubmitting: false,
    isValidating: false,
    isDirty: false,
    prevInitialValues: initialValues,
    failedAtLeastOneValidation: false,
    numberOfInFlightValidations: 0,
  })

  useEffect(() => {
    if (state.current.isSubmitting) return

    if (!deepEqual(initialValues, state.current.prevInitialValues)) {
      state.current.prevInitialValues = initialValues
      state.current.values = initialValues
      state.current.mergedValues = {
        ...state.current.values,
        ...state.current.changes,
      }
      rerender()
    }
  }, [initialValues])

  const validateForm = useCallback(async () => {
    if (!validate) return

    state.current.numberOfInFlightValidations += 1
    state.current.isValidating = true
    rerender()

    const validationErrors = await validate(state.current.mergedValues)
    state.current.numberOfInFlightValidations -= 1

    if (state.current.numberOfInFlightValidations !== 0) return

    if (!deepEqual(state.current.errors, validationErrors)) {
      state.current.errors = validationErrors
    }
    if (
      !state.current.failedAtLeastOneValidation &&
      Object.keys(state.current.errors).length
    ) {
      state.current.failedAtLeastOneValidation = true
    }

    state.current.isValidating = false
    rerender()
  }, [validate])

  const setValue = useCallback(
    (key: string, value: string | boolean | number) => {
      if (state.current.isSubmitting) return

      state.current.changes[key] = value
      state.current.mergedValues = {
        ...state.current.values,
        ...state.current.changes,
      }
      state.current.isDirty = !deepEqual(
        state.current.mergedValues,
        state.current.prevInitialValues,
      )
      if (state.current.failedAtLeastOneValidation) {
        validateForm()
      }
      rerender()
    },
    [validateForm],
  )

  const submitForm = useCallback(async () => {
    if (state.current.isSubmitting) return

    state.current.isSubmitting = true
    rerender()

    await validateForm()
    if (Object.keys(state.current.errors).length === 0) {
      await onSubmit(state.current.mergedValues)
    }

    state.current.isSubmitting = false
    rerender()
  }, [validateForm, onSubmit])

  const resetForm = useCallback(() => {
    state.current = {
      values: initialValues,
      changes: {},
      mergedValues: initialValues,
      errors: {},
      isSubmitting: false,
      isValidating: false,
      isDirty: false,
      prevInitialValues: initialValues,
      failedAtLeastOneValidation: false,
      numberOfInFlightValidations: 0,
    }

    rerender()
  }, [initialValues])

  return {
    values: state.current.mergedValues,
    errors: state.current.errors,
    isSubmitting: state.current.isSubmitting,
    isValidating: state.current.isValidating,
    isDirty: state.current.isDirty,
    setValue,
    submitForm,
    validateForm,
    resetForm,
  }
}

type FormFieldProps = {
  label: string
  children: ReactNode
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        gap: 16,
      }}
    >
      <div style={{ width: 160, paddingTop: 9.5 }}>
        <Text variant="display-regular" color="neutral60">
          {label}
        </Text>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

export { FormField, useForm }
export type { FormFieldProps, UseFormProps, FormErrors, FormValues }
