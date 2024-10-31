import axios from 'axios';

const API_URL = 'https://assignment.stage.crafto.app';

export const loginUser = async (username, otp) => {
    const response = await axios.post(`${API_URL}/login`, { username, otp });
    return response.data;
};

export const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData);
    return response.data;
};

export const createQuote = async (token, text, mediaUrl) => {
    const response = await axios.post(`${API_URL}/postQuote`, { text, mediaUrl }, {
        headers: { Authorization: token }
    });
    return response.data;
};

export const fetchQuotes = async (token, limit, offset) => {
    const response = await axios.get(`${API_URL}/getQuotes?limit=${limit}&offset=${offset}`, {
        headers: { Authorization: token }
    });
    return response.data;
};
