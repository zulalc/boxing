// pages/api/champions.js
import axios from 'axios';

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    url: 'https://boxing-api1.p.rapidapi.com/champions',
    params: { category: 'men' }, // Erkekler kategorisi
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY, // .env.local'dan API anahtarı
      'x-rapidapi-host': 'boxing-api1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('API Response:', response.data); // Yanıtı terminalde görüntüle
    res.status(200).json(response.data); // Yanıtı frontend'e döndür
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: error.message || 'Internal Server Error' });
  }
}
