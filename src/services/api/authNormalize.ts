// Normalizes auth responses from TapSwap backend (see Swagger embedded in api-docs/swagger-ui-init.js).
// Backend may return `{ data: ... }` or flat JSON; tokens may be nested under different keys.

import type { AuthToken, User } from '@/types'

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

/** Prefer server `data` envelope when present */
export function unwrapPayload<T = unknown>(json: unknown): T {
  if (isRecord(json) && 'data' in json && json.data !== undefined) {
    return json.data as T
  }
  return json as T
}

export function mapUser(raw: unknown): User | null {
  if (!isRecord(raw)) return null
  const id = raw.id ?? raw.userId ?? raw.sub
  if (typeof id !== 'string' || !id) return null

  const email = typeof raw.email === 'string' ? raw.email : undefined
  const name =
    typeof raw.name === 'string'
      ? raw.name
      : typeof raw.fullName === 'string'
        ? raw.fullName
        : typeof raw.displayName === 'string'
          ? raw.displayName
          : undefined

  return {
    id,
    email,
    name,
    displayName: typeof raw.displayName === 'string' ? raw.displayName : name,
    avatar: typeof raw.avatar === 'string' ? raw.avatar : typeof raw.imageUrl === 'string' ? raw.imageUrl : undefined,
    phone: typeof raw.phone === 'string' ? raw.phone : undefined,
    role: typeof raw.role === 'string' ? raw.role : undefined,
  }
}

export function extractTokens(body: unknown): AuthToken | null {
  const root = unwrapPayload(body)
  if (!isRecord(root)) return null

  const nested =
    isRecord(root.token) ? root.token : isRecord(root.tokens) ? root.tokens : root

  const accessToken =
    typeof nested.accessToken === 'string'
      ? nested.accessToken
      : typeof (root as Record<string, unknown>).access_token === 'string'
        ? ((root as Record<string, unknown>).access_token as string)
        : undefined

  const refreshToken =
    typeof nested.refreshToken === 'string'
      ? nested.refreshToken
      : typeof (root as Record<string, unknown>).refresh_token === 'string'
        ? ((root as Record<string, unknown>).refresh_token as string)
        : undefined

  if (!accessToken || !refreshToken) return null

  const expiresInRaw =
    nested.expiresIn ?? nested.expires_in ?? root.expiresIn ?? root.expires_in
  const expiresIn = typeof expiresInRaw === 'number' ? expiresInRaw : 0

  return { accessToken, refreshToken, expiresIn }
}

export function extractUser(body: unknown): User | null {
  const root = unwrapPayload(body)
  if (!isRecord(root)) return null
  const userRaw = root.user ?? root.profile ?? root.account
  return mapUser(userRaw ?? root)
}
