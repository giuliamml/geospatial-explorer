import { useState } from "react";
import axios, { AxiosError } from "axios";
import { FeatureCollection } from "../types/types";

const useFetchData = () => {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async (url: string, params: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await axios.get(url, { params });
      setData(response.data);
      setError(null);
      setLoading(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Response error:", axiosError.response.data);
          setError(axiosError.response.data);
        } else if (axiosError.request) {
          console.error("Request error:", axiosError.request);
          setError(axiosError.request);
        } else {
          console.error("Error", axiosError.message);
          setError(axiosError.message);
        }
      } else {
        console.error("Unexpected error", error);
        setError(error);
      }
      setError(error);
      setData(null);
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchData;
