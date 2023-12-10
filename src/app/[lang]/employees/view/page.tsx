'use client'
import React, { Suspense, use, useEffect, useState } from 'react'
import Loading from './loading'
import useEmployeeStore from '@/store/employee'
import useStore from '@/hooks/useStore'
import { DataTable } from './data-table'
import { toTitleCase } from '@/lib/utils'
import { columns } from './columns'
import usePageStore from '@/store/page'

type Employee = {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
}
// async function fetchEmployees() {
//   const employees = await fetch(`https://reqres.in/api/users`, {
//     cache: 'force-cache',
//   })
//     .then((response) => response.json())
//     .then((data) => data.data)
//     .catch((error) => console.log(error))

//   return employees
// }

export function ViewEmployeesPage() {
  const [isLoading, setIsLoading] = useState(true)
  // const isFetched = useEmployeeStore.getState().isFetched
  // if (!isFetched) {
  //   useStore(useEmployeeStore, (state) => state.fetchEmployees())
  //   useStore(useEmployeeStore, (state) => state.setIsFetched(true))
  //   setIsLoading(false)
  // }
  // const employees = useEmployeeStore.getState().employees
  // // useStore(useEmployeeStore, (state) => state.employees)
  // if (isLoading) {
  //   return <Loading />
  // }
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
