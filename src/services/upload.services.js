import url from "../shared/constant/url";
import { Constants } from "../shared/constant/constants";
export const UploadService = () => {
  const constants = Constants();


  const upload = (val) => {
    console.log("==============apilog calling========================");
    return url.post(constants.upload,val);
  };

  const getupload = (val) => {
    console.log("==============apilog calling========================");
    return url.get(constants.getupload,val);
  };
  return {
    upload,
    getupload
  };
};