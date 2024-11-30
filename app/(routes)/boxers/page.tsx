"use client";

import React, { useEffect, useState } from "react";
import { fetchChampions } from "@/utils/boxingAPI";
import { Separator } from "@/components/ui/separator";

interface Champion {
  champion: string;
  organization: string;
  division: string;
}

const BoxingChampionsPage: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Champion | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const getChampions = async () => {
      try {
        const data: Champion[] = await fetchChampions();

        // Tekrarlayan championları temizle
        const uniqueChampions = data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.champion === item.champion)
        );

        setChampions(uniqueChampions);
      } catch (error: any) {
        setError(error.message || "Failed to load champions");
      } finally {
        setLoading(false);
      }
    };

    getChampions();
  }, []);

  const handleSort = (column: keyof Champion) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedChampions = [...champions].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setChampions(sortedChampions);
  };

  return (
    <div className="p-4 m-4">
      <Separator className="my-4" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : champions.length > 0 ? (
        <div>
          <div className="flex text-sm font-medium">
            <div className="flex-1 text-left flex items-center">
              Champion
              <button
                className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={() => handleSort("champion")}
              >
                ↑↓
              </button>
            </div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex-1 text-left flex items-center">
              Organization
              <button
                className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={() => handleSort("organization")}
              >
                ↑↓
              </button>
            </div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex-1 text-left flex items-center">
              Division
              <button
                className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={() => handleSort("division")}
              >
                ↑↓
              </button>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="space-y-4"> 
            {champions.map((champion, index) => (
              <div key={index} className="flex text-sm items-center">
                <div className="flex-1 text-left">{champion.champion}</div>
                <Separator orientation="vertical" className="mx-2" />
                <div className="flex-1 text-left">{champion.organization}</div>
                <Separator orientation="vertical" className="mx-2" />
                <div className="flex-1 text-left">{champion.division}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No champions found.</p>
      )}
    </div>
  );
};

export default BoxingChampionsPage;
