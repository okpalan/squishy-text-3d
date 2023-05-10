export function mixin(base, obj) {
  for (var key in obj) {
    if (!base.hasOwnProperty(key))
      base[key] = obj[key]
  }
  return base
}
