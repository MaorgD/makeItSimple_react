import Axios from 'axios';
import { API_URL, doApiMethodTokenPatch, RESTAURNAT_ID } from '../services/servise';

export const uploadImage = async (file) => {
    if (file == "" || file == null || file == undefined) {
        return false

    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "makeItSimpleUsers");

    const resp = await Axios.post(
        "https://api.cloudinary.com/v1_1/dukiq0kql/image/upload",
        formData)
    return resp.data.url

}
// לא מוסיף לדטא בייס של מסעדה
export const uploadImageAndAddToGallery = async (file) => {
    if (file == "" || file == null || file == undefined) {
        return false

    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "makeItSimpleUsers");

    const resp = await Axios.post(
        "https://api.cloudinary.com/v1_1/dukiq0kql/image/upload",
        formData)
    if(resp.data.url) {
        let url = API_URL + '/restaurants/addimage/' + localStorage.getItem(RESTAURNAT_ID);
      let data =await doApiMethodTokenPatch(url , "PATCH",{img:resp.data.url})
      console.log(data)
      return resp.data.url
      
    }

}