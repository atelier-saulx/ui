import { useCallback, useEffect, useRef } from 'react'
import { useRerender } from '../../hooks/useRerender.js'
import { FormErrors, FormState, FormValues } from './types.js'
import { deepEqual } from '../../utils/deepEqual.js'

type UseFormProps = {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => void | Promise<void>
  validate?: (values: FormValues) => FormErrors | Promise<FormErrors>
}

function useForm({ initialValues = {}, onSubmit, validate }: UseFormProps) {
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
    if (Object.keys(state.current.errors).length !== 0) {
      state.current.isSubmitting = false
      rerender()
      return
    }

    try {
      await onSubmit(state.current.mergedValues)
    } catch {
      // no-op
    } finally {
      state.current.isSubmitting = false
      rerender()
    }
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

export { useForm }
export type { UseFormProps }
