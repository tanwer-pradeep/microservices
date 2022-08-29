import axios from 'axios';

export const AxiosGet = async (url) =>{
    const response = await axios.get(url);
    if(response.status === 200) return response.data;
    else return {};
}

export const AxiosPost = async(url, body) => {
    const response = await axios.post(url, body);
    return response;
}

