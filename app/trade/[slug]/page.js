import Fiber from "../../components/trade/fiber";
import Machine from "../../components/trade/machine";
import Yarn from "../../components/trade/yarn";
import Fabric from "../../components/trade/fabric";
import Buy from "../../components/trade/buy";
import Design from "../../components/trade/designe";
import Consult from "../../components/trade/consultant";
import Job from "../../components/trade/job";
import Garment from "../../components/trade/garment";
import Knowledge from "../../components/trade/knowledge";
import Logistic from "../../components/trade/logistic";
import Indices from "../../components/trade/indices";
import NaturalFiber from "../../components/trade/naturalFiber";
import ManMadeFiber from "../../components/trade/manMadeFiber";

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <div>
      <div>
        {slug === "fiber" && <Fiber />}
        {slug === "machine" && <Machine />}
        {slug === "yarn" && <Yarn />}
        {slug === "textile" && <Fabric />}
        {slug === "buyer-post" && <Buy />}
        {slug === "portfolio" && <Design />}
        {slug === "consultant" && <Consult />}
        {slug === "job" && <Job />}
        {slug === "garment" && <Garment />}
        {slug === "market-knowledge" && <Knowledge />}
        {slug === "logistic" && <Logistic />}
        {slug === "index-and-chart" && <Indices />}
        {slug === "fiber-natural" && <NaturalFiber />}
        {slug === "fiber-man-made" && <ManMadeFiber />}
      </div>
    </div>
  );
}
