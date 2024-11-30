"use client"
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

// Schedule veri tipini tanımla
interface Match {
  title: string;
  date: string;
  venue: string;
}

const BoxingSchedulePage: React.FC = () => {
  const [schedule, setSchedule] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const url = "https://boxing-api1.p.rapidapi.com/schedule";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": "boxing-api1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log(data); // Yanıtın yapısını burada kontrol edin

        // Yanıt bir dizi değilse uygun şekilde alın
        const formattedData: Match[] =
          Array.isArray(data) ? data : data.matches || data.schedule || [];

        setSchedule(
          formattedData.map((match: any) => ({
            title: match.title || "Unknown Match",
            date: match.date || "TBD",
            venue: match.venue || "Unknown Venue",
          }))
        );
      } catch (error: any) {
        setError(error.message || "Failed to fetch schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-4">
      <Separator className="my-4" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : schedule.length > 0 ? (
        <div>
          <div className="flex text-sm font-medium">
            <div className="flex-1 text-left">Title</div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex-1 text-left">Date</div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex-1 text-left">Venue</div>
          </div>
          <Separator className="my-2" />
          {schedule.map((match, index) => (
            <div key={index} className="flex text-sm items-center">
              <div className="flex-1 text-left">{match.title}</div>
              <Separator orientation="vertical" className="mx-2" />
              <div className="flex-1 text-left">{match.date}</div>
              <Separator orientation="vertical" className="mx-2" />
              <div className="flex-1 text-left">{match.venue}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No schedule found.</p>
      )}
    </div>
  );
};

export default BoxingSchedulePage;
