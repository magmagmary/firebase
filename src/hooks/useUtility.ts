import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useUtility = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const findQueryParams = (key: string): string => {
    return searchParams.get(key.toString()) || "";
  };

  return { navigate, findQueryParams, pathName: location.pathname };
};

export default useUtility;
