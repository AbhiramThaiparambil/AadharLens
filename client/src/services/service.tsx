import axios from "axios";

const axiosInstance= axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
});



export const parseAadhaar = async (frontFile: File, backFile: File) => {
    const formData = new FormData();
    formData.append('frontFile', frontFile);
    formData.append('backFile', backFile);
    const response=await axiosInstance.post('/parse-aadhaar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}


export const pingServer = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/');
    
    if (response.status === 200) {
      console.log("Backend is awake and active!");
      return true;
    }
    return false;
  } catch (error) {
    console.warn("Server is warming up or unreachable:", error);
    return false;
  }
}