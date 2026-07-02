import Buy from "../../components/trades/buy/buy";
import Job from "../../components/trades/job/job";
import Yarn from "../../components/trades/yarn/yarn";
import Fiber from "../../components/trades/fiber/fiber";
import Fabric from "../../components/trades/fabric/fabric";
import Indices from "../../components/trades/indices/indices";
import Design from "../../components/trades/designer/designe";
import Machine from "../../components/trades/machine/machine";
import Garment from "../../components/trades/garments/garment";
import Consult from "../../components/trades/consult/consultant";
import Logistic from "../../components/trades/logistics/logistic";
import Knowledge from "../../components/trades/knowledge/knowledge";
import SupplyChain from "../../components/trades/supplyChain/supplyChain";
import NaturalFiber from "../../components/trades/naturalFiber/naturalFiber";
import ManMadeFiber from "../../components/trades/manMadeFiber/manMadeFiber";

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <div className="px-6 bg-[#ECECEC] min-h-screen">
      <div>
        {slug === "fiber" && <Fiber />}
        {slug === "machine" && <Machine />}
        {slug === "yarn" && <Yarn />}
        {slug === "fabric" && <Fabric />}
        {slug === "buyer-post" && <Buy />}
        {slug === "design" && <Design />}
        {slug === "consultant" && <Consult />}
        {slug === "job" && <Job />}
        {slug === "garment" && <Garment />}
        {slug === "market-knowledge" && <Knowledge />}
        {slug === "logistic" && <Logistic />}
        {slug === "index-and-chart" && <Indices />}
        {slug === "fiber-natural" && <NaturalFiber />}
        {slug === "supply-chain" && <SupplyChain />}
        {slug === "fiber-man-made" && <ManMadeFiber />}
      </div>
    </div>
  );
}
