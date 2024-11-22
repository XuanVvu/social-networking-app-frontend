import { Component, createApp } from 'vue'
import DialogComponent from '@/components/common/DialogCommon.vue'

interface IOptionDialog {
  opening: () => Promise<void>
  closing: () => void
}
export const useDialog = () => {
  const openDialog = async (component: Component, data?: Record<string, any>, options?: any) => {
    if (options?.opening) {
      await options?.opening()
    }

    const dialog = createApp(component, data)
    const container = document.createElement('div')
    const instance = dialog.mount(container)
    document.body.appendChild(instance.$el)

    // const container = document.createElement('div')
    // document.body.appendChild(container)

    // const dialog = createApp(component, { data })
    // const instance = dialog.mount(document.createElement('div')) as unknown as IOptionDialog
    // console.log('instance', instance)
    // dialog.mount(container)

    // if (typeof instance.opening === 'function') {
    //   await instance.opening()
    // }

    // const closing = () => {
    //   if (typeof instance.closing === 'function') {
    //     instance.closing()
    //   }

    //   dialog.unmount()
    //   document.body.removeChild(container)
    // }

    // if (instance.closing) {
    //   instance.closing = closing
    // }
  }

  return { openDialog }
}
