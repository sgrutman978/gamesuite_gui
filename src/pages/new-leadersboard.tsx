import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NewLeaderboardForm } from "../components/new-leaderboard-form";

export default function NewLeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/leaderboards" className="bg-white">
          <Button variant="outline" size="icon" className="bg-white">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
          Create New Leaderboard
        </h1>
      </div>

      <NewLeaderboardForm />
    </div>
  );
}
