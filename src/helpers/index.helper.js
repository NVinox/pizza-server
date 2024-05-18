export function getEmptyFields(fields) {
  return Object.keys(fields)
    .reduce((acc, key) => {
      if (!fields[key]) {
        acc.push(key)
      }

      return acc
    }, [])
    .join(", ")
}
