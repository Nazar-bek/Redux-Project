import { useCallback, useState } from "react";

export const useHttp = () => {
  const [proccess, setProccess] = useState("waiting");
  const request = useCallback( async (
    url,
    method = "GET",
    body = null,
    headers=  {'Content-Type' : 'application/json'}
  ) => {
    setProccess("loading")
    try {
        const response = await fetch(url, {method, body, headers})
        if(!response.ok){
            throw new Error(`Could not fetch the ${url}, status : ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error()
    }
  }, []);

  const clearerror = useCallback(() => {
    setProccess("loading")
  },[])

  return {
    request,
    proccess,
    setProccess,
    clearerror,
  }
};
