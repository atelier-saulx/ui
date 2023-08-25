export const copyToClipboard = (input: string | number) => {
  const inputElement = document.createElement('input')
  document.body.appendChild(inputElement)
  inputElement.value = typeof input === 'number' ? String(input) : input
  inputElement.select()
  inputElement.setSelectionRange(0, 99999)
  document.execCommand('copy')
  document.body.removeChild(inputElement)
}
