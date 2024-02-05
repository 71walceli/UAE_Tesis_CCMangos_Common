
export const printStackTrace = (e: Error): string[] => 
  e.stack?.split("\n").slice(1).map(s => s.replace(/^\s+at\s/, "")) || []

interface indexedT {
  id: number;
}
export const arrayIndexer = <T extends indexedT>(values: T[]): {[key: number]: number} => 
  values.reduce( (actual, cur, i) => Object.assign(actual, { [cur.id]: i} ), {} )
