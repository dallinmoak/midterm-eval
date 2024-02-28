"use client";

import { useState } from "react";
import IdentificationsByPlaceResults from "./IdentificationsByPlaceResults";

export default function Search() {
  const [placeOptions, setPlaceOptions] = useState([]);
  const [searchPlace, setSearchPlace] = useState({
    name: "",
    id: "",
  });
  const [resultState, setResultState] = useState("");
  const handleSubmitIdentificationSearch = () => {
    setResultState("showing");
    setPlaceOptions([]);
  };
  const getPlacesSearchResults = async (search) => {
    const response = await fetch(
      `https://api.inaturalist.org/v1/places/autocomplete?q=${search}&`
    );
    const data = await response.json();
    if (data.total_results > 0) {
      const options = data.results.map((result) => {
        return {
          name: result.display_name,
          id: result.id,
        };
      });
      setPlaceOptions(options);
    }
  };

  const handleSearchPlaceChange = async (e) => {
    setResultState("");
    setSearchPlace({ name: e.target.value, id: "" });
    if (e.target.value.length > 0) {
      getPlacesSearchResults(e.target.value);
    } else {
      clear();
    }
  };

  const clear = () => {
    setSearchPlace({ name: "", id: "" });
    setPlaceOptions([]);
    setResultState("");
  };

  return (
    <div>
      <h1>Search for Identifications by place</h1>
      <form action={handleSubmitIdentificationSearch}>
        <input
          type='text'
          name='search place'
          value={searchPlace.name}
          onChange={handleSearchPlaceChange}
          placeholder='start typing to get locations...'
        />
        {placeOptions.map((option) => {
          return (
            <li
              onClick={() => {
                setSearchPlace({ ...option });
              }}
              key={option.id}
            >
              {option.name}
            </li>
          );
        })}
        <button onClick={clear} disabled={!searchPlace.name}>
          Clear
        </button>
        <input type='submit' value='Search' disabled={!searchPlace.id} />
      </form>
      {resultState === "showing" && (
        <IdentificationsByPlaceResults
          place_id={searchPlace.id}
          place_name={searchPlace.name}
        />
      )}
    </div>
  );
}
