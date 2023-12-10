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
import View from './view'

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
  const fullName = `${employee.first_name} ${employee.last_name}`
  const truncatedName =
    fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName

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
                
                <View employee={employee} />
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditEmployeePage
