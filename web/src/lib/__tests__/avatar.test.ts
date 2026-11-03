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
import { describe, expect, it } from 'vitest'

import { getUserAvatarColor, getUserAvatarStyle } from '../avatar'

describe('user avatar colors', () => {
  it('reads the optional color from stored and session settings safely', () => {
    expect(getUserAvatarColor('{"avatar_color":"#123456"}')).toBe('#123456')
    expect(getUserAvatarColor({ avatar_color: '#abcdef' })).toBe('#abcdef')
    for (const setting of [
      undefined,
      '',
      '{',
      'null',
      '[]',
      { avatar_color: 42 },
    ]) {
      expect(getUserAvatarColor(setting)).toBeUndefined()
    }
  })

  it('uses a configured hex color with readable text', () => {
    expect(getUserAvatarStyle('alice', '#ffffff')).toEqual({
      backgroundColor: '#ffffff',
      color: '#000000',
    })
    expect(getUserAvatarStyle('alice', '#000000')).toEqual({
      backgroundColor: '#000000',
      color: '#ffffff',
    })
  })

  it('keeps the existing deterministic color for automatic or invalid colors', () => {
    const automatic = getUserAvatarStyle('alice')
    expect(getUserAvatarStyle('alice', '')).toEqual(automatic)
    expect(getUserAvatarStyle('alice', 'url(https://example.com)')).toEqual(
      automatic
    )
    expect(getUserAvatarStyle('alice', '#fff')).toEqual(automatic)
  })
})
