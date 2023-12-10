import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type PageStore = {
  view: string
  setView: (view: string) => void
  pageIndex: number
  setPageIndex: (pageIndex: number) => void
}

const usePageStore = create<PageStore>()(
  persist(
    (set) => ({
      view: '',
      setView: (view) => set({ view }),
      pageIndex: 0,
      setPageIndex: (pageIndex) => set({ pageIndex }),
    }),
    {
      name: 'page-store',
    }
  )
)

export default usePageStore
