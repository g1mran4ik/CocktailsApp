import { useState } from "react";

interface AsyncCallback {
    (...args : any) : Promise<any>
}

interface Callback {
    (...args : any) : void
}

interface useFetchingProps {
    fetch: AsyncCallback,
    afterFetch ?: Callback|AsyncCallback,
    redirect ?: boolean,
}

export default function useFetching({
  fetch,
  afterFetch = () => {},
  redirect = false,
} : useFetchingProps) {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<any | null>(null);

  async function fetching(...fetchArgs: any[]) {
    let result: any;
    let error = null;

    try {
      setLoading((prev) => !prev);
      result = await fetch(...fetchArgs);
      setError(null);
    } catch (e: any) {
      error = e;
    } finally {
      if (!error) {
        afterFetch(result);
        if (!redirect) setLoading((prev) => !prev);
      } else {
        setError(error);
        setLoading((prev) => !prev);
      }
    }
  }

  return [fetching, loading, error] as const 
}
