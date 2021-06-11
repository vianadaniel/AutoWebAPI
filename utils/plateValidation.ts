export const plateValidation = (value: string) => {
  return value && value.length === 7 ? true : false
}
