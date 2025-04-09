import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const sidebarItems = [
  { title: "Overview", path: "/docs/overview" },
  {
    title: "Developer Guides",
    subItems: [
      {
        title: "Getting Started",
        path: "/docs/developer-guides/getting-started",
      },
      { title: "Install Sui", path: "/docs/developer-guides/install-sui" },
      {
        title: "Connect to a Sui Network",
        path: "/docs/developer-guides/connect-network",
      },
      // Add more items as needed
    ],
  },
  { title: "Sui 101", path: "/docs/sui-101" },
  {
    title: "Advanced Topics",
    subItems: [
      { title: "App Examples", path: "/docs/advanced-topics/app-examples" },
      { title: "Dev Cheat Sheet", path: "/docs/advanced-topics/cheat-sheet" },
    ],
  },
  { title: "Operator Guides", path: "/docs/operator-guides" },
];

const DocsPage = () => {
  return (
    <div className="w-full flex items-start justify-between relative lg:pl-64">
      <Sidebar sidebarItems={sidebarItems} />
      <div className="w-full min-h-[400px] px-5 pt-[60px] lg:pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DocsPage;
