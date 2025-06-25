import useSWR from 'swr';
export function useFetch<T>(url: string) {
  const { data, error } = useSWR<T>(url, (u) => fetch(u).then(r => r.json()));
  return { data, error, loading: !data && !error };
}