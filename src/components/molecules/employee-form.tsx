import { Employee } from '@/app/employees/add/page'
import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useEmployeeStore from '@/store/employee'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'
import { removeSpaces } from '@/lib/utils'
// import fs from 'fs'
// import path from 'path'

interface EmployeeFormProps {
  initialData?: Employee
  setView: (view: string) => void
  type: 'add' | 'edit'
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData = null,
  setView,
  type,
}) => {
  const [employee, setEmployee] = useState<Employee>(
    initialData || {
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      age: 0,
      salary: 0,
      avatar: '',
    }
  )
  const addEmployee = useEmployeeStore((state) => state.addEmployee)
  const editEmployee = useEmployeeStore((state) => state.updateEmployee)
  const router = useRouter()
  console.log(employee.avatar)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file' && e.target.files) {
      const file = e.target.files[0]
      const fileName = removeSpaces(file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        let data = null
        if (reader.result && typeof reader.result === 'string') {
         data = reader.result.split(',')[1];
        }
        fetch('/api/save-avatar', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            fileName,
            data,
          }),
        })
        setEmployee({
          ...employee,
          avatar: file.name as string,
        })
      }
    } else {
      setEmployee({
        ...employee,
        [e.target.name]: e.target.value,
      })
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === 'add') {
      if (addEmployee) {
        addEmployee(employee)
        setView('view')
      } else {
        console.error('addEmployee function is undefined')
      }
    } else if (type === 'edit') {
      if (editEmployee) {
        editEmployee(employee)
        setView('view')
        router.push('/employees')
      } else {
        console.error('editEmployee function is undefined')
      }
    }
  }

  const isValidAvatar = (avatar: string) => {
    return avatar.match(/\.(jpeg|jpg|gif|png)$/)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto mt-10 grid grid-cols-4 gap-7">
        <div className="col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="abc@def.com"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            type="text"
            placeholder="First Name"
            id="first_name"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            placeholder="Last Name"
            id="last_name"
            name="last_name"
            value={employee.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            placeholder="Age"
            id="age"
            name="age"
            value={employee.age}
            onChange={handleChange}
            min={15}
            max={99}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            type="number"
            placeholder="Salary"
            id="salary"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div
          className={`${
            employee.avatar && isValidAvatar(employee.avatar)
              ? 'col-span-1'
              : 'col-span-2'
          }`}
        >
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            type="file"
            placeholder="Avatar"
            id="avatar"
            value=""
            name="avatar"
            onChange={handleChange}
          />
        </div>
        {employee.avatar && isValidAvatar(employee.avatar) && (
          <div className="col-span-1">
            <Label htmlFor="avatar">Preview</Label>
            <img
              alt="avatar"
              src={employee.avatar.includes('http') ? employee.avatar : `/avatars/${employee.avatar}`}
              className="w-10 h-10 rounded-full"
            ></img>
          </div>
        )}
        <Button type="submit" className="col-span-2">
          Save
        </Button>
      </div>
    </form>
  )
}

export default EmployeeForm
