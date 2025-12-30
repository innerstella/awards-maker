import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Category {
  name: string
  value: string | number
  url?: string
}

interface AwardsState {
  author: string | null
  selectedMonth: number | null
  categories: Category[]
  comment: string | null
  setComment: (comment: string | null) => void
  setAuthor: (author: string | null) => void
  setSelectedMonth: (month: number | null) => void
  addCategory: (name: string, value: string | number, url?: string) => void
  updateCategory: (
    index: number,
    name: string,
    value: string | number,
    url?: string
  ) => void
  removeCategory: (index: number) => void
  clearAll: () => void
}

const initialCategories: Category[] = [
  { name: "", value: "", url: "" },
  { name: "", value: "", url: "" },
  { name: "", value: "", url: "" },
  { name: "", value: "", url: "" },
]

const initialComment: string = ""

export const useMonthlyAwardsStore = create<AwardsState>()(
  persist(
    (set) => ({
      author: null,
      selectedMonth: null,
      categories: initialCategories,
      comment: initialComment,
      setAuthor: (author) => set({ author }),
      setSelectedMonth: (month) => set({ selectedMonth: month }),
      setComment: (comment) => set({ comment }),
      addCategory: (name, value) =>
        set((state) => ({
          categories: [...state.categories, { name, value }],
        })),
      updateCategory: (index, name, value, url) =>
        set((state) => ({
          categories: state.categories.map((cat, i) =>
            i === index ? { ...cat, name, value, url: url ?? cat.url } : cat
          ),
        })),
      removeCategory: (index) =>
        set((state) => ({
          categories: state.categories.filter((_, i) => i !== index),
        })),
      clearAll: () =>
        set({
          author: null,
          selectedMonth: null,
          categories: initialCategories,
          comment: initialComment,
        }),
    }),
    {
      name: "monthly-awards-storage",
    }
  )
)
