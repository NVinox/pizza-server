export function getEmptyFields(fields) {
  return Object.keys(fields)
    .reduce((acc, key) => {
      if (!fields[key] && fields[key] !== 0) {
        acc.push(key)
      }

      return acc
    }, [])
    .join(", ")
}
