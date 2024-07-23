import axios from "axios";

const baseUrl="http://localhost:3000/";

export const apiService = () => {

    const postData = async (url, body) => {
        try  {

            const response = await axios.post(`${baseUrl}${url}`, body);
        return response; // Add this line to return the response
        }
        catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received from the server', err.request);
            } else {
                // Something happened in setting up the request
                console.error('Error setting up the request', err.message);
            }
        }

    }

    const getData = async (url) => {
        
        try {
           console.log(`${baseUrl}${url}`)
            return await axios.get(`${baseUrl}${url}`);
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const updateData = async (url, params, body) => {
        try {
            console.log(`${baseUrl}${url}/${params}`);
            console.log(body);
            const res = await axios.put(`${baseUrl}${url}/${params}`, body);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const deleteData = async (url, params,query) => {
        try {
            console.log(url);
            const res = await axios.delete(`${baseUrl}${url}${params}${query}`);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const methodAuthData = async (url, body,method) => {
        try  {
            const token =  localStorage.getItem("token")
            const response = await axios({
                url: `${baseUrl}${url}`,
                method: method,
                data: body,
                headers: {
                  "x-api-key": token
                }
              })
        return response; // Add this line to return the response
        }
        catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received from the server', err.request);
            } else {
                // Something happened in setting up the request
                console.error('Error setting up the request', err.message);
            }
        }

    }



    return { getData, postData, updateData, deleteData,methodAuthData }
}