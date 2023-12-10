import React from 'react'
import { Employee } from '../../add/page'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface ViewProps {
  employee: Employee
}

const View: React.FC<ViewProps> = ({ employee }) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-primary-foreground rounded-lg m-2 p-2 ">
      <div className="col-span-2 m-4 p-4">
        <div className="">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="abc@def.com"
            id="email"
            name="email"
            value={employee.email}
            disabled

          />
        </div>
        <div className="">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            type="text"
            placeholder="First Name"
            id="first_name"
            name="first_name"
            value={employee.first_name}
            disabled
          />
        </div>
        <div className="">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            placeholder="Last Name"
            id="last_name"
            name="last_name"
            value={employee.last_name}
            disabled
          />
        </div>
        <div className="">
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            placeholder="Age"
            id="age"
            name="age"
            value={employee.age}
            disabled
          />
        </div>
        <div className="">
          <Label htmlFor="salary">Salary</Label>
          <Input
            type="number"
            placeholder="null"
            id="salary"
            name="salary"
            disabled
          />
        </div>
      </div>
      <div className="col-span-1 mx-auto my-auto">
        <img
          src={
            employee.avatar.includes('http')
              ? employee.avatar
              : `/avatars/${employee.avatar}`
          }
          alt="avatar"
          className="rounded-full h-60 w-60 "
        />
      </div>
    </div>
  )
}

export default View
