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
import type { CSSProperties } from 'react'

export type UserAvatarStyle = Pick<CSSProperties, 'backgroundColor' | 'color'>

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getUserAvatarStyle(
  name: string,
  avatarColor?: string
): UserAvatarStyle {
  if (avatarColor && /^#[0-9a-f]{6}$/i.test(avatarColor)) {
    const channels = [1, 3, 5].map((offset) => {
      const channel = parseInt(avatarColor.slice(offset, offset + 2), 16) / 255
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4
    })
    const luminance =
      0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    return {
      backgroundColor: avatarColor,
      // Choose the higher WCAG contrast ratio against the selected background.
      color: luminance > 0.179 ? '#000000' : '#ffffff',
    }
  }
  const hash = hashString(name)
  const hue = hash % 360
  const saturation = 54 + (hash % 8)
  const lightness = 52 + ((hash >> 4) % 8)

  return {
    backgroundColor: `hsl(${hue} ${saturation}% ${lightness}%)`,
    color: 'white',
  }
}

export function getUserAvatarColor(setting: unknown): string | undefined {
  try {
    const parsed: unknown =
      typeof setting === 'string' ? JSON.parse(setting) : setting
    if (
      parsed &&
      typeof parsed === 'object' &&
      'avatar_color' in parsed &&
      typeof parsed.avatar_color === 'string'
    ) {
      return parsed.avatar_color
    }
  } catch {
    // Old or malformed settings keep the automatic avatar color.
  }
  return undefined
}

export function getUserAvatarFallback(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?'
}
