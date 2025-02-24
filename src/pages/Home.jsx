import React from "react";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import Card from "../components/Card";

const Home = () => {
  const [smoothies, setSmoothies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      setIsLoading(true);
      setFetchError(null);

      const { data, error } = await supabase.from("supabase").select();

      if (error) {
        setFetchError(error.message);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        console.log(data);
      }
      setIsLoading(false);
    };

    fetchSmoothies();
  }, []);

  return (
    <>
      <div className="page home">
        {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
        {fetchError && <h2 style={{ textAlign: "center" }}>{fetchError}</h2>}
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <Card key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
