import postgres from 'postgres'
import { postgressConfig } from "../config";

export const sql = postgres(postgressConfig);

export const filterByType = <T>(Type, data: T, clean_empty = true): Partial<T> => {
  const response = {};

  Object.entries(data).forEach(([key, rawValue]) => {
    const value = Type(rawValue);
    if (!value) return;
    response[key] = Type(value);
  });

  return response;
}


export const cleanIds = (ids): string => {
  if (Array.isArray(ids)) return ids.join(';');
  if (ids) return String(ids);
  return null;
}
