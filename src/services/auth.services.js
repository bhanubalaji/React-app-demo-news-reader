import url from "../shared/constant/url";
import { Constants } from "../shared/constant/constants";
export const AuthService = () => {
  const constants = Constants();

  const logout = () => {
    console.log("==============apilog calling========================");
    return url.get(constants.logout);
  };

  const login = (val) => {
    console.log("==============apilog calling========================");
    return url.post(constants.login,val);
  };

  return {
    logout,
    login
  };
};