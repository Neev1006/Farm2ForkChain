import { WalletConnect } from '../WalletConnect';

export default function WalletConnectExample() {
  return (
    <div className="p-4">
      <WalletConnect onConnect={(address) => console.log('Connected:', address)} />
    </div>
  );
}