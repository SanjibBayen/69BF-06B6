
'use client';
import { Home as HomeIcon, MessageSquare, User as UserIcon, History, ArrowLeft } from 'lucide-react';
import MobileHome from '@/components/mobile/mobile-home';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import MobileProfile from '@/components/mobile/mobile-profile';
import MobileSupport from '@/components/mobile/mobile-support';
import DesktopLayout from '@/components/desktop-layout';
import Pain2PeaceLogo from '@/components/pain2peace-logo';
import WeeklyReport from '@/components/mobile/weekly-report';
import WearableStatus from '@/components/dashboard/wearable-status';
import FeaturePage from '@/components/mobile/feature-page';
import { pageConfig } from '@/components/mobile/page-config';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [activePage, setActivePage] = useState<string | null>(null);

  const handleNavigate = (tab: string, page?: string) => {
    setActiveTab(tab);
    if (page) {
      setActivePage(page);
    } else {
      setActivePage(null);
    }
  };

  const getHeaderContent = () => {
    if (activePage && activeTab === 'profile') {
      const page = pageConfig[activePage];
      return (
         <div className="relative flex items-center justify-center w-full">
             <button onClick={() => setActivePage(null)} className="absolute left-0 p-2 text-muted-foreground -ml-2">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
            </button>
            <h1 className="text-xl font-semibold">{page.title}</h1>
          </div>
      )
    }
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Pain2PeaceLogo />
              <h1 className="text-xl font-semibold">pain2peace</h1>
            </div>
            <WearableStatus />
          </div>
        );
      case 'support':
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Pain2PeaceLogo />
              <h1 className="text-xl font-semibold">pain2peace</h1>
            </div>
            <button
              onClick={() => (document.dispatchEvent(new CustomEvent('open-chat-history')))}
              className="p-2 text-muted-foreground"
            >
              <History className="h-6 w-6" />
              <span className="sr-only">Chat History</span>
            </button>
          </div>
        );
      case 'report':
        return (
          <div className="relative flex items-center justify-center w-full">
             <button onClick={() => handleNavigate('profile')} className="absolute left-0 p-2 text-muted-foreground -ml-2">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
            </button>
            <h1 className="text-xl font-semibold">Weekly Report</h1>
          </div>
        )
      case 'profile':
        return null;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activePage && activeTab === 'profile') {
      return <FeaturePage pageKey={activePage} />;
    }

    switch (activeTab) {
      case 'home':
        return <MobileHome />;
      case 'support':
        return <MobileSupport />;
      case 'profile':
        return <MobileProfile onNavigate={handleNavigate} />;
      case 'report':
        return <WeeklyReport />;
      default:
        return <MobileHome />;
    }
  }


  return (
    <>
      <div className="md:hidden flex flex-col h-screen">
        {(activeTab !== 'profile' || activePage) && (
          <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/95 backdrop-blur-sm">
            {getHeaderContent()}
          </header>
        )}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
        <footer className="sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm">
          <nav className="flex items-center justify-around h-16">
            <button
              onClick={() => handleNavigate('home')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                activeTab === 'home' ? 'text-primary' : 'hover:text-primary/80'
              )}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => handleNavigate('support')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                activeTab === 'support' ? 'text-primary' : 'hover:text-primary/80'
              )}
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs font-medium">Support</span>
            </button>
            <button
              onClick={() => handleNavigate('profile')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                (activeTab === 'profile' || activeTab === 'report') ? 'text-primary' : 'hover:text-primary/80'
              )}
            >
              <UserIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </nav>
        </footer>
      </div>
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
    </>
  );
}
