'use client'

export function printNameAndDate(nameIn: string, dateIn: string) {
  function printDate(input: any) {
    if (input === undefined) {
      return undefined
    }
    const d = new Date(input);
    return (d.getUTCMonth() + 1) + '/' +
          d.getUTCDate() + '/' +
          d.getUTCFullYear();
  }
 
  const date = printDate(dateIn)
  const name = nameIn

  if (date === undefined) {
    return nameIn
  }
  return `${date}: ${name}`
}