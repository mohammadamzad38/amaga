import React from "react";
import Fairtade from "../../components/sustain/fairTade/fairtade";
import BciFiber from "../../components/sustain/bciCotton/bciFiber";
import BciKnowledge from "../../components/sustain/bciCotton/bciKnowledge";
import BciDirectory from "../../components/sustain/bciCotton/bciDirectory";
import OrganicCotton from "../../components/sustain/organicCotton/cottonFiber";
import CottonKnowledge from "../../components/sustain/organicCotton/cottonKnowledge";
import SustainGarments from "../../components/sustain/sustainGarment/sustainGarment";
import MarketKnowledge from "../../components/sustain/organicGarments/marketKnowledge";
import CottonDirectory from "../../components/sustain/organicCotton/cottonDirectory.jsx";

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <div className="px-6 bg-[#ECECEC] min-h-screen">
      <div>
        <div>
          {slug === "bci-fiber" && <BciFiber />}
          {slug === "bci-knowledge" && <BciKnowledge />}
          {slug === "bci-directory" && <BciDirectory />}
        </div>
        <div>
          {slug === "cotton-fiber" && <OrganicCotton />}{" "}
          {slug === "cotton-knowledge" && <CottonKnowledge />}{" "}
          {slug === "cotton-directory" && <CottonDirectory />}
        </div>
        {slug === "garments" && <SustainGarments />}
        {slug === "fairtade-cotton" && <Fairtade />}
        {slug === "market-knowledge" && <MarketKnowledge />}
      </div>
    </div>
  );
}
