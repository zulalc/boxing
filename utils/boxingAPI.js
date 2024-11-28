// services/boxingAPI.js
export const fetchChampions = async () => {
  try {
    const response = await fetch('/api/champions'); // Backend API'ye istek
    if (!response.ok) {
      throw new Error(`Failed to fetch champions: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched Champions:', data.champions); // Gelen veriyi kontrol edin
    return data.champions; // Şampiyonları döndür
  } catch (error) {
    console.error('Error fetching champions:', error);
    throw error;
  }
};
