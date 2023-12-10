import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Employee = {
  id: number
  email: string
  first_name: string
  last_name: string
  salary: number
  age: number
  avatar: string
}

type EmployeeStore = {
  employees: Employee[]
  addEmployee: (employee: Employee) => void
  fetchEmployees: () => Promise<void>
  isFetched: boolean
  setIsFetched: (isFetched: boolean) => void
  updateEmployee: (employee: Employee) => void
  deleteEmployee: (employee: Employee) => void
}

const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      isFetched: false,
      addEmployee: (employee) => {
        const maxId = get().employees.reduce(
          (max, cur) => Math.max(max, cur.id),
          -1
        )
        const newEmployee = { ...employee, id: maxId + 1 }
        set((state) => ({
          employees: [...state.employees, newEmployee],
        }))
      },
      setIsFetched: (isFetched) => set({ isFetched }),
      fetchEmployees: async () => {
        if (!get().isFetched) {
          const response = await fetch('https://reqres.in/api/users')
          const data = await response.json()
          set((state) => ({
            employees: [...state.employees, ...data.data],
          }))
        }
      },
      updateEmployee: (employee) => {
        set((state) => ({
          employees: state.employees.map((e) =>
            e.id === employee.id ? employee : e
          ),
        }))
      },
      deleteEmployee: (employee) => {
        set((state) => ({
          employees: state.employees.filter((e) => e.id !== employee.id),
        }))
      },
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
export default useEmployeeStore
