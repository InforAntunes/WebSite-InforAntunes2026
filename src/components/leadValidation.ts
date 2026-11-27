export const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]{0,99}$/u
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_PATTERN = /^\+?[\d\s()./-]{9,25}$/
export const NIF_PATTERN = /^\d{9}$/

export function isValidPhone(value: string) {
  return PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 9
}
