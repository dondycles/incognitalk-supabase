import LoadMoreTalks from "@/components/ui/LoadMoreTalks";
import SearchBar from "@/components/ui/SearchBar";
import TalksFeed from "@/components/ui/TalksFeed";

export default function Talks() {
  return (
    <div className="flex flex-col h-full gap-4 overflow-auto">
      <SearchBar />
      <TalksFeed />
      <LoadMoreTalks />
    </div>
  );
}
