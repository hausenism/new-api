/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'

import type { User } from '../../types'
import { useUsersColumns } from '../users-columns'

function UserIdentity() {
  const columns = useUsersColumns().filter(
    (column) => 'accessorKey' in column && column.accessorKey === 'username'
  )
  const table = useReactTable({
    columns,
    data: [
      {
        id: 1,
        username: 'alice',
        display_name: 'Alice',
        setting: '{"avatar_color":"#123456"}',
      } as User,
    ],
    getCoreRowModel: getCoreRowModel(),
  })
  const cell = table.getRowModel().rows[0].getAllCells()[0]
  return <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
}

it('shows the saved avatar color next to the user identity', () => {
  const { container } = render(<UserIdentity />)
  expect(screen.getByText('alice')).toBeVisible()
  expect(container.querySelector('[data-slot="avatar-fallback"]')).toHaveStyle({
    backgroundColor: '#123456',
  })
})
