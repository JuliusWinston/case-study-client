import { QueryProps } from "../types";

export const formatDateTime = (date: string) => {
  const isoDate = new Date(date);
  return isoDate.toLocaleString();
}

export const createQueryParams = (query: QueryProps): string => {
  const queryString = Object.entries(query)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&")

  return queryString ? `?${queryString}` : ""
}
