import axios from "axios";
import { apiRoutes } from "../lib/constant";

const axiosInstance= axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
});



export const parseAadhaar = async (frontFile: File, backFile: File) => {
    const formData = new FormData();
    formData.append('frontFile', frontFile);
    formData.append('backFile', backFile);
    const response=await axiosInstance.post(apiRoutes.parseAadhaar, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}