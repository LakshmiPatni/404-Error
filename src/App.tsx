import { AppProvider } from '@/context/AppContext';
import { useApp } from '@/context/app-context';
import { Onboarding } from '@/components/Onboarding';
import { Header } from '@/components/Header';
import { CategoryBar } from '@/components/CategoryBar';
import { TimerWidget } from '@/components/TimerWidget';
import { HomeView } from '@/components/HomeView';
import { CartView } from '@/components/CartView';
import { WishlistView } from '@/components/WishlistView';
import { OrdersView } from '@/components/OrdersView';
import { AccountView } from '@/components/AccountView';
import { CheckoutView } from '@/components/CheckoutView';
import { VictoryView } from '@/components/VictoryView';
import { PopupDisturbanceEngine } from '@/components/PopupDisturbanceEngine';

function AppContent() {
  const { hasOnboarded, view } = useApp();

  if (!hasOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <CategoryBar />

      <main>
        {view === 'home' && <HomeView />}
        {view === 'cart' && <CartView />}
        {view === 'wishlist' && <WishlistView />}
        {view === 'orders' && <OrdersView />}
        {view === 'account' && <AccountView />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'victory' && <VictoryView />}
      </main>

      <TimerWidget />
      <PopupDisturbanceEngine />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
