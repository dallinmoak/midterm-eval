"use client";

import { useEffect, useState } from "react";

export default function TaxonName({ taxon_id }) {
  const [taxonName, setTaxonName] = useState("");

  useEffect(() => {
    const getTaxonName = async (taxon_id) => {
      const res = await fetch(
        `https://api.inaturalist.org/v1/taxa/${taxon_id}`
      );
      if (res.ok) {
        const data = await res.json();
        const taxonResult = data.results[0];
        setTaxonName(
          `${taxonResult.name} (${taxonResult.preferred_common_name})`
        );
      } else {
        console.error(
          "***************Error fetching taxon name***************"
        );
      }
    };
    getTaxonName(taxon_id);
  }, [taxon_id]);

  return <div>{taxonName}</div>;
}
