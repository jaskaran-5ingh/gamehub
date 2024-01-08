import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useQueryParameter(key: string, defaultValue: string = ''): [string, (value: string) => void] {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(() => {
    const params = new URLSearchParams(location.search);
    return params.get(key) || defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (value !== defaultValue || params.get(key)) {
      params.set(key, value);
      navigate({ search: params.toString() });
    }
  }, [key, value, defaultValue, navigate, location.search]);

  return [value, setValue];
}

export default useQueryParameter;
