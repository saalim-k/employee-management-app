'use client'
import useEmployeeStore from '@/store/employee'
import React, { useState, useEffect } from 'react'
import { Employee } from '../../add/page'
import EmployeeForm from '@/components/molecules/employee-form'
import usePageStore from '@/store/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function EditEmployeePage({ params }: { params: { id: string } }) {
  const { id } = params
  const [employee, setEmployee] = useState<Employee | null>(null)
  const editEmployee = useEmployeeStore((state) => state.updateEmployee)
  const view = usePageStore((state) => state.view)
  const setView = usePageStore((state) => state.setView)

  useEffect(() => {
    //fetch employee from zustand state
    const employee = useEmployeeStore
      .getState()
      .employees.find((employee) => employee.id.toString() === id)
    if (employee) {
      setEmployee(employee)
    }
  }, [id])

  useEffect(() => {
    if (view !== '') {
      setView(view)
    } else {
      setView('edit-employee')
    }
  }, [view, setView])

  if (!employee) {
    return <div>Loading...</div>
  }
  const truncatedName =
    `${employee.first_name} ${employee.last_name}`.slice(0, 25) + '...'

  return (
    <div className="mt-10">
      <Tabs defaultValue={view}>
        <TabsList>
          <TabsTrigger
            value="view-employee"
            className="px-4"
            onClick={() => {
              setView('view-employee')
            }}
          >
            View Employee
          </TabsTrigger>
          <TabsTrigger
            value="edit-employee"
            className="px-4"
            onClick={() => {
              setView('edit-employee')
            }}
          >
            Edit Employee
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit-employee">
          <EmployeeForm
            initialData={employee}
            type={'edit'}
            setView={setView}
          />
        </TabsContent>
        <TabsContent value="view-employee">
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>{truncatedName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Employee Details</p>
                <div className="grid grid-cols-2 gap-2">
                  <Label>First Name</Label>
                  <p>{employee.first_name}</p>
                  <Label>Last Name</Label>
                  <p>{employee.last_name}</p>
                  <Label>Email</Label>
                  <p>{employee.email}</p>
                  <Label>Age</Label>
                  <p>{employee.age}</p>
                  <Label>Salary</Label>
                  <p>{employee.salary}</p>
                  <Label>Avatar</Label>
                  <Avatar>
                    <AvatarImage
                      src={
                        employee.avatar.includes('http')
                          ? employee.avatar
                          : `/avatars/${employee.avatar}`
                      }
                      alt="default avatar"
                    />
                    <AvatarFallback>
                      {employee.first_name[0]}
                      {employee.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditEmployeePage
