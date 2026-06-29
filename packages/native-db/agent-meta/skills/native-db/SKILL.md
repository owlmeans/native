---
name: native-db
description: How to use @owlmeans/native-db — React Native AsyncStorage-backed ClientDb adapter. Use makeNativeDbService() to create a multi-store persistent key/value service, or appendNativeDbService() to register it on a context. Auto-invoked when importing from native-db or wiring local storage in a React Native app.
user-invocable: false
---
<!-- AUTO-GENERATED — do not edit. Regenerate via sync-agent-meta. -->

# @owlmeans/native-db

**Layer:** Native (storage adapter for `@owlmeans/client-resource`'s `ClientDb` interface)
**Install:** `"@owlmeans/native-db": "^0.1.2"` in `dependencies`

## Key Exports

| Export | Description |
|--------|-------------|
| `makeNativeDbService(alias?)` | Create an AsyncStorage-backed `NativeDbService` |
| `appendNativeDbService(context, alias?)` | Register the db service on any `ClientContext` |
| `NativeDbService` | Service interface extending `ClientDbService` with `initialize(alias?)` and `erase()` |
| `DEFAULT_ALIAS` | Default service alias constant |

## ClientDb interface (from `@owlmeans/client-resource`)

| Method | Signature |
|--------|-----------|
| `get<T>(id)` | `Promise<T>` — deserializes JSON from AsyncStorage |
| `set<T>(id, value)` | `Promise<void>` — serializes to JSON |
| `has(id)` | `Promise<boolean>` |
| `del(id)` | `Promise<boolean>` — returns whether item existed |

## Usage

```typescript
import { appendNativeDbService } from '@owlmeans/native-db'
import { makeContext } from '@owlmeans/native-client'

// 1. Register on context (makeContext does this automatically)
const context = makeContext(config)
appendNativeDbService(context, 'storage')

// 2. Obtain a namespaced store
const dbService = context.service<NativeDbService>('storage')
const userDb = await dbService.initialize('users')
const settingsDb = await dbService.initialize('settings')

// 3. CRUD
await userDb.set('profile', { name: 'Alice' })
const profile = await userDb.get<Profile>('profile')
await userDb.del('profile')

// 4. Wipe everything (logout / factory reset)
await dbService.erase()
```

## Notes

- Keys are namespaced as `<storeAlias>:<id>` in AsyncStorage — no collisions across stores.
- `makeContext()` from `@owlmeans/native-client` calls `appendNativeDbService` automatically; call it manually only when composing a custom context.

## Depends On

- `@owlmeans/client-resource` (for `ClientDbService` / `ClientDb` interfaces)
- `@owlmeans/context` (for `createService`)
- `@react-native-async-storage/async-storage` (peer)
