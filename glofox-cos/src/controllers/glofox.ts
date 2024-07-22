// import { NextFunction, RequestHandler } from "express";
// import axios from "axios";

// export const glofoxApi: RequestHandler = async (req, res) => {
//     const link = 'https://api.glofox.com/2.0/programs?private=false';
//     try {
//         const response = await axios.get(link);
//         res.json(response.data);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };
  
import { NextFunction, RequestHandler } from "express";
import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJfIiwiZXhwIjoxNzI0MDU5MDE5LCJpYXQiOjE3MjEzODA2MTksImlzcyI6Il8iLCJ1c2VyIjp7Il9pZCI6Imd1ZXN0IiwibmFtZXNwYWNlIjoiamF6emVyY2l6ZWRlbW8iLCJicmFuY2hfaWQiOiI2NTBjNjJiNDQwMjhjZDEyMzkwZTFiOGQiLCJmaXJzdF9uYW1lIjoiR3Vlc3QiLCJsYXN0X25hbWUiOiJVc2VyIiwidHlwZSI6IkdVRVNUIiwiaXNTdXBlckFkbWluIjpmYWxzZX19.3uXdzC2ScYoEYA7JrVvSgQ7jr5pLDp9bF9kIy5qP9f0';

export const glofoxApi: RequestHandler = async (req, res) => {
    const link = 'https://api.glofox.com/2.0/programs?private=false';
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.get(link, config);
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};