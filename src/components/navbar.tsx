"use client";

import {
  Gamepad2,
  Menu,
  Scroll,
  Sparkles,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { AiOutlineDiscord as Discord } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/login-form";
import { SignupForm } from "../components/signup-form";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ConnectButton, ConnectModal, useCurrentAccount, WalletProvider } from "@mysten/dapp-kit";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentAccount = useCurrentAccount();

// const availableWallets = getWallets().get();
// console.log(availableWallets);
// availableWallets[0].features['standard:connect'].connect(); // connect call

  const navItems = [
    { name: "Home", path: "/", icon: <Gamepad2 className="h-4 w-4 mr-1" /> },
    {
      name: "Games",
      path: "/#games",
      icon: <Trophy className="h-4 w-4 mr-1" />,
    },
    {
      name: "Tokenomics",
      path: "/#tokenomics",
      icon: <Sparkles className="h-4 w-4 mr-1" />,
    },
    { name: "Docs", path: "/docs", icon: <Scroll className="h-4 w-4 mr-1" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{backgroundColor: "#E4F1FF"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 gap-2 flex items-center group"
            >
              <img
                src="/logo-icon.png"
                className="w-full max-w-[40px] animate-[spin_1500ms_linear]"
                alt=""
              />
              <img
                src="/logo-text.png"
                className="w-full max-w-[130px]"
                alt=""
              />
            </Link>
            <div className="hidden lg:ml-8 lg:flex lg:space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-blue-500 inline-flex items-center px-3 py-1 text-sm font-medium relative"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {item.name}
                  </div>
                  {hoverIndex === index && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:ml-6 lg:flex sm:items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 size-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Discord className="h-5 w-5 hover:text-blue-500" />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 size-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <FaXTwitter className="h-4 w-4 hover:text-blue-500" />
              </Link>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className=" cursor-pointer  hover:text-blue-500"
                  onClick={() => setDialogOpen(true)}
                >
                  <img className="w-full max-w-[30px]" src="../icon.png" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[95dvh] overflow-y-auto pt-10 border-purple-300 bg-gradient-to-b from-indigo-50 to-white">
                {/* <Tabs defaultValue="login" className="w-full"> */}
                  {/* <TabsList className="grid w-full grid-cols-2 bg-purple-100">
                    <TabsTrigger
                      value="login"
                      className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-purple-700"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-purple-700"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList> */}
                  {/* <TabsContent value="login"> */}
                    <LoginForm onSuccess={() => setDialogOpen(false)} />
                  {/* </TabsContent> */}
                  {/* <TabsContent value="signup">
                    <SignupForm onSuccess={() => setDialogOpen(false)} />
                  </TabsContent> */}
                {/* </Tabs> */}
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              asChild
              className="bg-white/10 border-white/30 hover:bg-white/20 hover:text-blue-500"
              onClick={() => setDialogOpen(true)}
            >
              <Link to="/admin" className="">
                Dashboard
              </Link>
            </Button>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-500 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-white/10 hover:border-blue-500 hover:text-blue-500 transition-colors"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                </div>
              </Link>
            ))}
            <Link
              to="/admin"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-white/10 hover:border-blue-500 hover:text-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="w-full cursor-pointer rounded-[0px] flex items-center justify-start py-2 border-l-4 border-transparent text-base font-medium hover:bg-white/10 hover:border-blue-500 hover:text-blue-500 transition-colors"
                  onClick={() => setDialogOpen(true)}
                >
                  <User className="h-4 w-4 mr-0" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[95dvh] overflow-y-auto pt-10 border-purple-300 bg-gradient-to-b from-indigo-50 to-white">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-purple-100">
                    <TabsTrigger
                      value="login"
                      className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-purple-700"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-purple-700"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <LoginForm onSuccess={() => setDialogOpen(false)} />
                  </TabsContent>
                  <TabsContent value="signup">
                    <SignupForm onSuccess={() => setDialogOpen(false)} />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-4 px-4 pb-3 pt-2">
              <Link
                to="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Discord className="h-5 w-5 hover:text-blue-500" />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaXTwitter className="h-5 w-5 hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      )}
         {/* <WalletProvider autoConnect> */}
            {/* <ConnectButton style={{width: "100%", textAlign: "left", height: "100%", fontSize: "14px"}} ></ConnectButton> */}
            {/* </WalletProvider> */}
    </nav>
  );
}
