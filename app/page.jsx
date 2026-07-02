import Post from "./home/post/post";
import Saller from "./Home/saller/saller";
import Support from "./home/support/support";
import AgamaMap from "./home/agamaMap/agamaMap";
import CoverText from "./home/coverBanner/coverText";
import QuickAccess from "./home/coverBanner/quickAccess";

export default function Home() {
  return (
    <div className="container mx-auto ">
      <div className="px-5 lg:px-12.5 min-h-screen">
        <CoverText />
        <QuickAccess />
        <AgamaMap />
        <Post
          title="Recent Posts"
          query={{
            type: "fiber",
            mode: "recent",
            top: 4,
          }}
        />
        <Post
          title="Popular Posts"
          query={{
            type: "fiber",
            mode: "popular",
            top: 4,
          }}
        />
        <Saller />
        <Support />
      </div>
    </div>
  );
}
