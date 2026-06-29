---
description: "How to use @owlmeans/native-db — AsyncStorage-backed ClientDb adapter. makeNativeDbService() creates a multi-store persistent key/value service; appendNativeDbService() registers it on a context."
applyTo: "**/*.ts, **/*.tsx"
---

# @owlmeans/native-db

**Layer:** Native (storage adapter for `@owlmeans/client-resource`'s `ClientDb` interface)
**Install:** `"@owlmeans/native-db": "^0.1.2"`

## Core exports

- `makeNativeDbService(alias?)` — creates an AsyncStorage-backed `NativeDbService`
- `appendNativeDbService(context, alias?)` — registers the db service on any `ClientContext`
- `NativeDbService` — extends `ClientDbService` with `initialize(alias?): Promise<ClientDb>` and `erase(): Promise<void>`
- `DEFAULT_ALIAS` — default service alias

## ClientDb methods

- `get<T>(id): Promise<T>` — JSON-deserialized read
- `set<T>(id, value): Promise<void>` — JSON-serialized write
- `has(id): Promise<boolean>`
- `del(id): Promise<boolean>` — returns whether item existed

## Usage

```typescript
import { appendNativeDbService } from '@owlmeans/native-db'

// appendNativeDbService is called automatically by makeContext() from @owlmeans/native-client
const dbService = context.service<NativeDbService>('storage')
const userDb = await dbService.initialize('users')

await userDb.set('profile', { name: 'Alice' })
const profile = await userDb.get<Profile>('profile')
await dbService.erase() // wipe all AsyncStorage (logout / reset)
```

Keys are namespaced as `<storeAlias>:<id>` — no collisions across stores.

## Depends on

`@owlmeans/client-resource`, `@owlmeans/context`
Peer: `@react-native-async-storage/async-storage`
