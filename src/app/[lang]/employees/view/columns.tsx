'use client'

import { ColumnDef as BaseColumnDef } from '@tanstack/react-table'
import { Employee } from '../add/page'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ColumnDef<T extends object> = BaseColumnDef<T> & {
  setView?: (view: string) => void
  deleteEmployee?: (id: number) => void
}

export const columns = (
  setView: (view: string) => void,
  deleteEmployee: (employee: Employee) => void
): ColumnDef<Employee>[] => [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'First Name',
    accessorKey: 'first_name',
    //if name is too long truncate it
    cell: ({ row }) => {
      const employee = row.original
      const name = employee.first_name
      if (name.length > 10) {
        return name.slice(0, 10) + '...'
      }
      return name
    },
  },
  {
    header: 'Last Name',
    accessorKey: 'last_name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
  },
  {
    header: 'Avatar',
    accessorKey: 'avatar',
    cell: ({ row }) => {
      const employee = row.original
      return (
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
      )
    },
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild={true}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(employee.id.toString())
              }
            >
              Copy employee ID
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="bg-red-500 hover:bg-red-700 hover:text-white"
                  onSelect={(e) => e.preventDefault()}
                >
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone and will permanently delete
                    this employees data
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteEmployee(employee)
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                window.location.href = `/employees/edit/${employee.id}`
                setView('edit-employee')
              }}
            >
              Edit Emplyee
            </DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
