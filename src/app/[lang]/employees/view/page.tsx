'use client'
import React, { Suspense, use, useEffect, useState } from 'react'
import Loading from './loading'
import useEmployeeStore from '@/store/employee'
import { DataTable } from './data-table'
import { columns } from './columns'
import usePageStore from '@/store/page'

export function ViewEmployeesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees)
  const setIsFetched = useEmployeeStore((state) => state.setIsFetched)
  const isFetched = useEmployeeStore((state) => state.isFetched)
  const employees = useEmployeeStore((state) => state.employees)
  const view = usePageStore((state) => state.view)
  const setView = usePageStore((state) => state.setView)
  const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee)

  useEffect(() => {
    if (!isFetched) {
      fetchEmployees()
      setIsFetched(true)
    }
    setIsLoading(false)
  }, [isFetched, fetchEmployees, setIsFetched])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container p-4 mx-auto shadow-black">
      <Suspense fallback={<Loading />}>
        <DataTable
          columns={columns(setView, deleteEmployee)}
          data={employees}
          setView={setView}
        />
      </Suspense>
    </div>
  )
}

export default ViewEmployeesPage
