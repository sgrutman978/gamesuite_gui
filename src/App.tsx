import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import DocsPage from "./pages/docs-page";
import AdminPage from "./pages/admin-page";
import LeaderboardsPage from "./pages/leaderboard";
import NewLeaderboardPage from "./pages/new-leadersboard";
import NewProjectPage from "./pages/new-project-page";

import { ConnectButton, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnokiFlowProvider } from '@mysten/enoki/react';
import { getFullnodeUrl, SuiClient, SuiClientOptions } from "@mysten/sui/client";
import { useState } from "react";
import { NewProjectForm } from "./components/new-project-form";
import '@mysten/dapp-kit/dist/index.css';

const myNetwork = "mainnet";
const networks = {
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
} satisfies Record<string, SuiClientOptions>;
const queryClient = new QueryClient();

function App() {
  const [activeNetwork, setActiveNetwork] = useState(myNetwork as keyof typeof networks);
  return (
    // <>
    		<SuiClientProvider
			networks={networks}
			network={activeNetwork}
			onNetworkChange={(network) => {
				setActiveNetwork(network as keyof typeof networks);
			}}
      // defaultNetwork="devnet"
			createClient={(network, config) => {
        return new SuiClient({ url: getFullnodeUrl(network) });
			}}
		>
    <QueryClientProvider client={queryClient}>
    <WalletProvider autoConnect>
      {/* <ConnectButton></ConnectButton> */}
		{/* <EnokiFlowProvider apiKey="enoki_public_10094b0bafc9ba2626fcbc02a1812d6b"> */}
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                {/* <Navbar /> */}
                <AdminPage>Admin Dashboard</AdminPage>
                {/* <Footer /> */}
              </>
            }
          />
          <Route
            path="/admin/leaderboards/:projectId/:projectCap"
            element={
              <>
                {/* <Navbar /> */}
                <AdminPage>
                  <LeaderboardsPage />
                </AdminPage>
                {/* <Footer /> */}
              </>
            }
          />
          <Route
            path="/admin/leaderboards/:projectId/:projectCap/new"
            element={
              <>
                {/* <Navbar /> */}
                <AdminPage>
                  <NewLeaderboardPage />
                </AdminPage>
                {/* <Footer /> */}
              </>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <>
                {/* <Navbar /> */}
                <AdminPage>
                  <NewProjectPage />
                </AdminPage>
                {/* <Footer /> */}
              </>
            }
            // Component={NewProjectForm}
          />
          {/* Docs Parent Route */}
          <Route
            path="/docs"
            element={
              <>
                <Navbar />
                <DocsPage />
              </>
            }
          >
            <Route
              index
              element={
                <div>
                  <h1 className="text-4xl font-bold">Documention</h1>
                </div>
              }
            />
            <Route
              path="overview"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Overview</h1>
                </div>
              }
            />
            <Route
              path="developer-guides/getting-started"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Getting Started</h1>
                </div>
              }
            />
            <Route
              path="developer-guides/install-sui"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Install Sui</h1>
                </div>
              }
            />
            <Route
              path="developer-guides/connect-network"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Connect Network</h1>
                </div>
              }
            />
            <Route
              path="sui-101"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Sui 101</h1>
                </div>
              }
            />
            <Route
              path="advanced-topics/app-examples"
              element={
                <div>
                  <h1 className="text-4xl font-bold">App Examples</h1>
                </div>
              }
            />
            <Route
              path="advanced-topics/cheat-sheet"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Cheat Sheet</h1>
                </div>
              }
            />
            <Route
              path="operator-guides"
              element={
                <div>
                  <h1 className="text-4xl font-bold">Operator Guides</h1>
                </div>
              }
            />
          </Route>{" "}
          <Route
            path="*"
            element={
              <>
                <div className="flex items-center justify-center h-[80vh]">
                  page not Found
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      </div>
      {/* </EnokiFlowProvider> */}
         </WalletProvider>
      </QueryClientProvider>
		</SuiClientProvider>
    // </>
  );
}

export default App;
