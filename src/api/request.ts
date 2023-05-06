export const request = async <T>(
  url: string,
  config?: RequestInit
): Promise<T> => {
  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as T;

  return data;
};
