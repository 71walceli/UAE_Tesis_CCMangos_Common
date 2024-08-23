import { format } from "date-fns";


export const dateFormatter = (date: Date | undefined) => {
  if (date) {
    try {
      return format(date, "yyyy-MM-dd")
    } catch(e) {
      console.warn("Invalid date received")
      console.warn(date)
      throw e
    }
  }
  return null;
}

export const numberFormatter = (value: string | number | undefined) => {
  const valueConverted = Number(value)
  return !Number.isNaN(valueConverted) ? valueConverted : null
}

export const formatNumber = (value: number | undefined, docimals=2) => {
  return value ? Number(value).toFixed(docimals) : null
}
