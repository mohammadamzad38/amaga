import Fiber from "../../components/trades/fiber";
import Machine from "../../components/trades/machine";
import Yarn from "../../components/trades/yarn";
import Fabric from "../../components/trades/fabric";
import Buy from "../../components/trades/buy";
import Design from "../../components/trades/designe";
import Consult from "../../components/trades/consultant";
import Job from "../../components/trades/job";
import Garment from "../../components/trades/garment";
import Knowledge from "../../components/trades/knowledge";
import Logistic from "../../components/trades/logistic";
import Indices from "../../components/trades/indices";
import NaturalFiber from "../../components/trades/naturalFiber";
import ManMadeFiber from "../../components/trades/manMadeFiber";
import SupplyChain from "../../components/trades/supplyChain";

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <div className="px-6 bg-[#ECECEC] h-screen">
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
