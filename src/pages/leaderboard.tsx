import { Link } from "react-router-dom";
import { LeaderboardsTable } from "../components/leaderboards-table";
import { Button } from "../components/ui/button";
import { PlusCircle } from "lucide-react";

export default function LeaderboardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start md:gap-0 gap-4 md:items-center justify-between md:flex-row flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
        <Link to="/admin/leaderboards/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Leaderboard
          </Button>
        </Link>
      </div>

      <LeaderboardsTable />
    </div>
  );
}
