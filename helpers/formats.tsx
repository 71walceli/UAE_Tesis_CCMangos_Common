import { format } from "date-fns";


export const dateFormatter = (date: Date | undefined) => date ? format(date, "yyyy-MM-dd") : null
