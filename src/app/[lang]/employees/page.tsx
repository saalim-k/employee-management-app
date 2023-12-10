'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddEmployeePage from './add/page'
import ViewEmployeesPage from './view/page'
import usePageStore from '@/store/page'
import Loading from './loading'
import { getDictionary } from '../dictionaries/getDictionary'

const EmployeesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const view = usePageStore((state) => state.view)
  const setView = usePageStore((state) => state.setView)
  const lang = useEffect(() => {
    if (!view || view === '') {
      setView('view')
    }
    setIsLoading(false)
  }, [view, setView])

  if (isLoading) {
    return <Loading />
  }

  const viewEmployees = () => {
    setView('view')
  }
  const addEmployees = () => {
    setView('add')
  }

  // const intl = await getDictionary(params.lang)

  return (
    <div className="container p-4">
      <Card className="col">
        <CardHeader>
          <CardTitle>Employees</CardTitle>
          <CardDescription>Manage your employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-1 py-2">
            <Button
              onClick={addEmployees}
              variant={view === 'add' ? 'secondary' : 'default'}
            >
              Add
            </Button>
            <Button
              onClick={viewEmployees}
              variant={view === 'view' ? 'secondary' : 'default'}
            >
              View
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {view === 'add' && <AddEmployeePage setView={setView} />}
      {view === 'view' && <ViewEmployeesPage />}
    </div>
  )
}

export default EmployeesPage
