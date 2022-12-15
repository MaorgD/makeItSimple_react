import axios from 'axios';
export const getCountries = async () => {
   const { data } = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
   );
   // console.log(data.data)
   return data.data;


}
export const getCities = async (_country) => {
   const { data } = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      { "country": _country });
   // console.log(data.data)
   return data.data;


}