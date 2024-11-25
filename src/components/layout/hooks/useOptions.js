import { optionsLogged, optionsUnlogged } from "../constans/HeaderOptions";

const useOptions = () => {
  const isLogged = false;
  return isLogged ? optionsLogged : optionsUnlogged;
};

export default useOptions;
