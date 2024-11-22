import { computed, ComputedRef } from 'vue'

/**
 * Check if the form is dirty.
 * @param form
 * @param initialForm
 * @returns dirty status
 */
export const useIsDirty = <T extends Record<string, any>>(
  form: T,
  initialForm: T
): ComputedRef<boolean> => {
  return computed(() => {
    return Object.keys(initialForm).some((key) => form[key] !== initialForm[key])
  })
}
