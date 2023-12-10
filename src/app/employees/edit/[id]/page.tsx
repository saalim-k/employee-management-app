'use client'
import useEmployeeStore from '@/store/employee'
import React, { useState, useEffect } from 'react'
import { Employee } from '../../add/page'
import EmployeeForm from '@/components/molecules/employee-form'
import usePageStore from '@/store/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div className='mt-10'>
      <Tabs defaultValue="edit-employee">
        <TabsList>
          <TabsTrigger value="edit-employee">Edit Employee</TabsTrigger>
        </TabsList>
        <TabsContent value="edit-employee">
          <EmployeeForm
            initialData={employee}
            type={'edit'}
            setView={setView}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditEmployeePage
