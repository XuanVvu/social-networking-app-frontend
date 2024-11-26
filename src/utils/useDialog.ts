import { Component, getCurrentInstance, h, ref, render } from 'vue'
import DialogCommon from '@/components/common/DialogCommon.vue'

export interface IOptionDialog {
  opening?: () => Promise<void>
  closing?: () => Promise<void>
}
export const useDialog = () => {
  const instance = getCurrentInstance()

  const openDialog = async (
    component: Component & IOptionDialog,
    data?: Record<string, any>,
    options?: any
  ) => {
    const vNodeComponent = h(component, data)

    const appContext = instance?.appContext

    const divWrap = document.createElement('div')
    const vNode = h(
      DialogCommon,
      {
        onClose: () => closeDialog()
      },
      {
        default: () => vNodeComponent
      }
    )

    const closeDialog = async () => {
      if (component?.closing) {
        await component?.closing()
      }
      document.body.removeChild(divWrap)
    }
    vNode.appContext = appContext!

    console.log(vNode)

    // vNodeComponent.appContext = appContext!
    render(vNode, divWrap)
    console.log(123)

    // console.log(vNodeComponent)
    // vNodeComponent.component?.exposed?.opening()
    // setTimeout(() => {
    //   vNodeComponent.component?.exposed?.opening()
    // })
    document.body.appendChild(divWrap)
  }

  return { openDialog }
}
