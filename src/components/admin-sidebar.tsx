import { FolderKanban, ListOrdered, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { cn } from "../lib/utils";
import Sidebar, { CollapsibleSection } from "./sidebar";
import { getMyProjects } from "../lib/SuiConnection";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import GameSuiteClient from "gamesuite_connect";
import { useEffect, useState } from "react";

export function AdminSidebar({
  className,
  hidden = false,
}: {
  className?: string;
  hidden?: boolean;
}) {
  const { pathname } = useLocation();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const gsl = new GameSuiteClient(useCurrentAccount(), signAndExecuteTransaction);
  const [sidebarItems, setSidebarItems] = useState<{}[]>([]);

  useEffect(() => {
    setSidebarItems([]);
    if(gsl.myAddy){
      console.log("gggg");
      getMyProjects("leaderboard::ProjectCap", gsl.myAddy).then((data) => {
        data.nodes.forEach((projWrapper: any) => {
          const proj = projWrapper.asMoveObject!.contents.json;
          console.log("iiiiii");
          console.log(proj);
          const newOne = {
            title: proj.name,
            icon: "game",
            subItems: [
              {
                title: "Leaderboards",
                path: `/admin/leaderboards/${proj.projectId}/${proj.id}`,
                icon: "list"
              },
              {
                title: "Achievements",
                path: `/admin/achievements/${proj.id}`,
                icon: "trophy"
              },
            ]
          };
          setSidebarItems(prev => [...prev, newOne]);
        })
    });
  }
  }, [gsl.myAddy])

  // const items = [
  //   {
  //     to: "/admin/leaderboards",
  //     title: "Leaderboards",
  //     icon: <ListOrdered className="mr-2 h-4 w-4" />,
  //     subItems: null
  //   },
  // ];

  return (
    <div
      className={` border-r h-full bg-white md:w-64 ${className} ${
        hidden ? "block" : "hidden md:block"
      }`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-4" style={{zIndex: 600}}>
         <Link
              to="/"
              className="flex-shrink-0 gap-2 flex items-center group"
            >
              <img
                src="/logo-icon.png"
                className="w-full max-w-[40px]"
                alt=""
              />
              <img
                src="/logo-text.png"
                className="w-full max-w-[130px]"
                alt=""
              />
            </Link>
        </div>
        <Sidebar sidebarItems={sidebarItems} admin={true} />
        {/* <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {items.map((item) => (
               item.subItems ? (
                            <CollapsibleSection
                              key={item.title}
                              {...item}
                              setOpen={setOpen}
                            />
                          ) : (
                            <Link
                              key={item.title}
                              to={item.path}
                              onClick={() => setOpen(false)}
                              className={`flex items-center text-sm p-2 text-gray-700 rounded-lg hover:bg-gray-100 group ${
                                location.pathname === item.path && "bg-gray-100"
                              }`}
                            >
                              <span className="ml-3">{item.title}</span>
                            </Link>
                          )
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.to
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea> */}
        <div className="mt-auto border-t p-4 z-[501]">
          <Button
            variant="outline"
            className="w-full bg-transparent justify-start"
            asChild
          >
            <Link to="/admin/projects/new">
              <FolderKanban className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
