'use client'
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
