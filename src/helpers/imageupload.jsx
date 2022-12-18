import Axios from 'axios';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "makeItSimpleUsers");

    const resp = await Axios.post(
        "https://api.cloudinary.com/v1_1/dukiq0kql/image/upload",
        formData)
        return resp.data.url
        
}