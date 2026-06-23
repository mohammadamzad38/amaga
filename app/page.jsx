import CoverText from "./home/coverBanner/coverText";
import QuickAccess from "./home/coverBanner/quickAccess";
import AgamaMap from "./home/agamaMap/agamaMap";
import Post from "./home/post/post";
import Saller from "./Home/saller/saller";
import Support from "./home/support/support";

export default function Home() {
  return (
    <div className="container mx-auto ">
      <div className="px-5 lg:px-12.5 min-h-screen">
        <CoverText />
        <QuickAccess />
        <AgamaMap />
        <Post title="Recent Posts" type="fiber" mode="recent" />
        <Post title="Popular Posts" type="fiber" mode="popular" />
        <Saller />
        <Support />
      </div>
    </div>
  );
}
