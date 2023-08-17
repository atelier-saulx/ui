import { useContext, useMemo, ReactNode } from 'react'
import {
  DialogContext,
  DialogContextType,
  defaultDialogContext,
} from './DialogContext'
import { AllContexts, useAllContexts } from '../Provider'

export const useDialog = (): DialogContextType => {
  const dialog = useContext(DialogContext) || defaultDialogContext
  const allContext = useAllContexts()
  return useMemo(() => {
    const dialogInstance: DialogContextType = (
      children: ReactNode,
      onClose?: () => void,
      ctx: AllContexts = allContext
    ) => {
      return dialog(children, onClose, ctx)
    }
    dialogInstance._id = dialog._id
    dialogInstance.open = dialogInstance
    dialogInstance.close = dialog.close
    dialogInstance.confirm = dialog.confirm
    dialogInstance.alert = dialog.alert
    dialogInstance.prompt = dialog.prompt
    dialogInstance.useCount = dialog.useCount
    return dialogInstance
  }, [])
}
