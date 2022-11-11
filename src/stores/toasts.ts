import { defineStore } from 'pinia';

interface Toast {
  id: string,
  text: string
}

interface RootState {
  toasts: Toast[]
}

export const useToasts = defineStore('toasts', {
  state: () => ({
    toasts: []
  } as RootState),
  actions: {
    showToast (text: string) {
      const id = (Math.random() + 1).toString(36).substring(7)
      this.toasts.push({ text, id })
      this.hideToastAfter(id, 3000)
    },
    hideToastAfter (id: string, timeout: number = 5000) {
      setTimeout(() => {
        this.toasts = this.toasts.filter(toast => toast.id !== id)
      }, timeout)
    },
    hideImmediatly (id: string) {
      this.toasts = this.toasts.filter(toast => toast.id !== id)
    }
  }
})
