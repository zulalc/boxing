// app/boxers/page.js
"use client";

import React, { useEffect, useState } from 'react';
import { fetchChampions } from '@/utils/boxingAPI';

const BoxingChampionsPage = () => {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChampions = async () => {
      try {
        const data = await fetchChampions(); // Şampiyonları getir
        setChampions(data); // Şampiyonları state'e kaydet
      } catch (error) {
        setError(error.message || 'Failed to load champions');
      } finally {
        setLoading(false);
      }
    };

    getChampions();
  }, []);

  return (
    <div>
      <h1>Boxing Champions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : champions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Division</th>
              <th>Organization</th>
              <th>Champion</th>
            </tr>
          </thead>
          <tbody>
            {champions.map((champion, index) => (
              <tr key={index}>
                <td>{champion.division}</td>
                <td>{champion.organization}</td>
                <td>{champion.champion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No champions found.</p>
      )}
    </div>
  );
};

export default BoxingChampionsPage;
