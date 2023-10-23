export const keyDownHandler = (
  e: any,
  idx: number,
  setFocus: (v) => void,
  makeNewBlock: (v, i) => void,
  deleteBlock: (v) => void,
  type: string,
  blocksLength: number
) => {
  console.log(e.key)
  let selection = window.getSelection()
  if (e.key === 'Enter' && e.key === 'Shift') {
    console.log('shift Enter was pressed')
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset

    if (anchorNodeLength === focusOffset) {
      makeNewBlock(type, idx)
      setFocus(idx + 1)
    }
  }
  if (e.key === 'Backspace') {
    // @ts-ignore
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset

    if (!anchorNodeLength && focusOffset === 0) {
      deleteBlock(idx)
      setFocus(idx - 1)
      // todo caret at end
    }
  }
  if (e.key === 'ArrowUp') {
    if (selection.anchorOffset === 0) {
      setFocus(idx > 0 ? idx - 1 : 0)
    }
  }
  if (e.key === 'ArrowDown') {
    console.log(selection)
    console.log(blocksLength)
    let anchorNodeLength = selection.anchorNode.length
    let focusOffset = selection.anchorOffset

    if (anchorNodeLength === focusOffset) {
      e.preventDefault()
      setFocus(idx < blocksLength - 1 ? idx + 1 : blocksLength - 1)
    }
  }
}
