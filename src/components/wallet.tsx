import { useWallet, WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css'; 
import { getWallets } from '@mysten/wallet-standard';

const CustomWalletConnectButton = () => {
    const availableWallets = getWallets().get();
console.log(availableWallets);
    const { connected, disconnect, select, allAvailableWallets, address, detectedWallets, configuredWallets } = useWallet();
    console.log(allAvailableWallets);
    console.log(detectedWallets);
    console.log(configuredWallets);
  
    const handleConnect = async (walletName: string) => {
      try {
        await select(walletName);
      } catch (e) {
        console.error("Failed to connect:", e);
      }
    };
  
    return (
      <div>
        {!connected ? (
          <>
            <p>Select a wallet:</p>
            <div className="flex gap-2">
              {availableWallets.map((w) => (
                <button
                  key={w.name}
                  onClick={() => handleConnect(w.name)}
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  {w.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <p>Connected to {address}</p>
            <button onClick={disconnect} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default CustomWalletConnectButton;