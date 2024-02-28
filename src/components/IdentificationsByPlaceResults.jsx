"use client";

import { useEffect, useState } from "react";
import TaxonName from "./TaxonName";

export default function IdentificationsByPlaceResults({
  place_id,
  place_name,
}) {
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    const getSearchResults = async (search_place_id) => {
      setLoading(true);
      const res = await fetch(
        `https://api.inaturalist.org/v1/identifications?current=true&place_id=${search_place_id}&order=desc&order_by=created_at`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.total_results > 0) {
          const newResults = data.results.map((result) => {
            return {
              name: result.taxon.id,
              id: result.id,
            };
          });
          setResults(newResults);
        } else {
          console.error("no results");
          setNoResults(true);
        }
      } else {
        console.error("Error fetching search results");
      }
      setLoading(false);
    };
    if (place_id !== "") getSearchResults(place_id);
  }, [place_id]);
  return (
    <div>
      <h2>
        Search Results for {place_name} id {place_id}
      </h2>
      {loading && <p>Loading...</p>}
      {noResults ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result) => {
            return (
              <li key={result.id}>
                <TaxonName taxon_id={result.name} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
