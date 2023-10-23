export const keyDownHandler = (
  e: any,
  idx: number,
  setFocus: (v) => void,
  makeNewBlock: (v, i) => void,
  deleteBlock: (v) => void,
  type: string
) => {
  console.log(e.key)
  if (e.key === 'Enter' && e.key === 'Shift') {
    console.log('shift Enter was pressed')
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    let selection = window.getSelection()
    // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset

    if (anchorNodeLength === focusOffset) {
      makeNewBlock(type, idx)
      setFocus(idx + 1)
    }
  }
  if (e.key === 'Backspace') {
    let selection = window.getSelection()
    // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset

    if (!anchorNodeLength && focusOffset === 0) {
      deleteBlock(idx)
      setFocus(idx - 1)
      // todo caret at end
    }
  }
}
