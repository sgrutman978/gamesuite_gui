import { ListOrdered, Menu, Trophy, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Assuming you're using React Router

export type SidebarItems = {
  title: string;
  path?: string,
  subItems: SidebarItems[]
};

const Sidebar = (props: any) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && (
        <div
          onClick={() => setOpen(!open)}
          className="flex fixed z-[20000] bg-white gap-2 lg:hidden cursor-pointer top-[65px] h-[50px] left-0 w-full items-center justify-start px-5"
        >
          <Menu /> Menu
        </div>
      )}
      {open && (
        <div
          onClick={() => setOpen(!open)}
          className="flex z-[100000] fixed lg:hidden cursor-pointer top-[80px] left-3 items-center justify-center"
        >
          <X />
        </div>
      )}
      <div
        className={`w-64 ${props.admin ? "h-auto absolute" : "h-[100dvh] fixed"} left-0 lg:pt-5 pt-14 top-[65px] z-[500] bg-white border-r border-gray-200 p-4 overflow-y-auto ${
          open
            ? "lg:translate-x-0 translate-x-[0px]"
            : "lg:translate-x-0 translate-x-[-500px]"
        }`}
      >
        <nav className="space-y-1">
          {props.sidebarItems.map((item: any) =>
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
                {/* <span className="ml-3"> */}
                  {item.title}
                  {item.icon == "game" ? <ListOrdered className="mr-2 h-4 w-4" /> : <></>}
                {/* </span> */}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
};

export const CollapsibleSection = ({
  title,
  icon,
  subItems,
  setOpen,
}: {
  title: string;
  icon: string;
  subItems: { title: string; path: string }[];
  setOpen: (open: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100 group ${
          subItems?.filter((item) => item.path === location.pathname).length >
            0 &&
          !isExpanded &&
          "bg-gray-100"
        }`}
      >
        {/* <ListOrdered /> */}
        {!icon ? <span className="ml-3 text-sm">
        {title}
        </span> : <span className="ml-3 text-lg">
        {title}
        </span>}
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
      >
        {subItems.map((subItem: any) => (
          <Link
            key={subItem.title}
            to={subItem.path}
            onClick={() => setOpen(false)}
            className={`flex items-center text-sm p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
              location.pathname === subItem.path && "bg-gray-100"
            }`}
          >
            {/* <span className="ml-3"> */}
            {subItem.icon == "list" ? <ListOrdered className="mr-2 h-4 w-4" /> : <></>}
            {subItem.icon == "trophy" ? <Trophy className="mr-2 h-4 w-4" /> : <></>}
            {subItem.title}
            {/* </span> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
