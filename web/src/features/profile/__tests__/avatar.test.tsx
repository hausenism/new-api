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
import { render } from '@testing-library/react'
import { expect, it } from 'vitest'

import { ProfileHeader } from '../components/profile-header'
import type { UserProfile } from '../types'

it('updates the profile avatar when the saved color changes', () => {
  const profile = {
    username: 'alice',
    role: 1,
    quota: 0,
    used_quota: 0,
    request_count: 0,
    setting: '{"avatar_color":"#123456"}',
  } as UserProfile
  const { container, rerender } = render(
    <ProfileHeader profile={profile} loading={false} />
  )
  expect(container.querySelector('[data-slot="avatar-fallback"]')).toHaveStyle({
    backgroundColor: '#123456',
  })
  rerender(
    <ProfileHeader
      profile={{ ...profile, setting: '{"avatar_color":"#abcdef"}' }}
      loading={false}
    />
  )
  expect(container.querySelector('[data-slot="avatar-fallback"]')).toHaveStyle({
    backgroundColor: '#abcdef',
  })
})
