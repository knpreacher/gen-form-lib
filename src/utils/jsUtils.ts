/**
 * Copies an object by creating a deep copy using JSON.stringify and JSON.parse.
 *
 * @param {T} obj - The object to be copied.
 * @return {T} - The copied object.
 */
export function copyObject<T = any>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

export function joinObjects<Type = Object>(...objs: Type[]): Type {
  let result = {} as Type
  objs.forEach(value => {
    if (!value || typeof value !== 'object') return
    result = {
      ...result,
      ...value
    }
  })
  return result
}

export function deepJoinObjects<Type = Object>(...objs: Type[]): Type {
  let result = {} as Type
  objs.forEach(obj => {
    if (!obj || typeof obj !== 'object') return
    // TODO: skip arrays
    if (Array.isArray(obj)) return
    Object.entries(obj as Record<string, any>).forEach((entry: [string, any]) => {
      const [key, value] = entry;
      if (typeof value === 'object' && typeof value !== 'undefined') {
        result = ((result as Record<string, any>)[key] === undefined) ? ({
          ...result,
          [key]: value
        }) : ({
          ...result,
          [key]: {
            ...deepJoinObjects((result as Record<string, any>)[key], value)
          }
        })
      } else {
        result = {
          ...result,
          [key]: value ?? undefined
        }
      }
    })
  })
  console.log('call deepJoinObjects', objs, result)
  return result
}