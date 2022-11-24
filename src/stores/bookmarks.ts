import { defineStore } from 'pinia'
import { IBookmark } from '@/types'

interface RootState {
  items: IBookmark[]
}

export const useBookmarks = defineStore('bookmarks', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('bookmarks') || '[]')
  } as RootState),
  actions: {
    add (id: number) {
      if (this.items.find(bookmark => bookmark.id === id)) {
        this.items = this.items.filter(bookmark => bookmark.id !== id)
      } else {
        this.items.push({ id })
      }
      localStorage.setItem('bookmarks', JSON.stringify(this.items))
    }
  }
})
