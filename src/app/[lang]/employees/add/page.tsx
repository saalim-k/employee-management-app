'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import useEmployeeStore from '@/store/employee'
import { Input } from '@/components/ui/input'
import EmployeeForm from '@/components/molecules/employee-form'

export type Employee = {
  id: number
  email: string
  first_name: string
  last_name: string
  age: number
  salary: number
  avatar: string
}

type AddEmployeePageProps = {
  setView: (view: string) => void
}

const AddEmployeePage: React.FC<AddEmployeePageProps> = ({ setView }) => {
  // const [employee, setEmployee] = useState<Employee>({
  //   id: 0,
  //   email: '',
  //   first_name: '',
  //   last_name: '',
  //   age: 0,
  //   salary: 0,
  //   avatar: '',
  // })
  //   const addEmployee = useStore(useEmployeeStore, (state) => state.addEmployee)
  // const addEmployee = useEmployeeStore((state) => state.addEmployee)

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmployee({
  //     ...employee,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (addEmployee) {
  //     addEmployee(employee)
  //     setView('view')
  //   } else {
  //     console.error('addEmployee function is undefined')
  //   }
  // }

  const employee = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    age: 0,
    salary: 0,
    avatar: '',
  }

  return <EmployeeForm initialData={employee} type="add" setView={setView} />
}

export default AddEmployeePage
