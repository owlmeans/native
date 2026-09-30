
import { entrypoints as auth } from '@owlmeans/client-auth'
import { entrypoints as config } from '@owlmeans/native-client'

export const entrypoints = [...auth, ...config]
export const modules = entrypoints
