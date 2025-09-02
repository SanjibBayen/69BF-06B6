
'use client';
import { Home as HomeIcon, MessageSquare, User as UserIcon, History } from 'lucide-react';
import MobileHome from '@/components/mobile/mobile-home';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import MobileProfile from '@/components/mobile/mobile-profile';
import MobileSupport from '@/components/mobile/mobile-support';
import DesktopLayout from '@/components/desktop-layout';
import WellMindLogo from '@/components/well-mind-logo';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex items-center gap-2">
            <WellMindLogo />
            <h1 className="text-xl font-semibold">WellMind</h1>
          </div>
        );
      case 'support':
        return <h1 className="text-xl font-semibold">Support</h1>;
      case 'profile':
        return null; // Don't show a title for the profile tab
      default:
        return null;
    }
  };


  return (
    <>
      <div className="md:hidden flex flex-col h-screen">
        {activeTab !== 'profile' && (
          <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur-sm">
            {getHeaderTitle()}
            {activeTab === 'support' && (
              <button
                onClick={() => (document.dispatchEvent(new CustomEvent('open-chat-history')))}
                className="p-2 text-muted-foreground"
              >
                <History className="h-6 w-6" />
                <span className="sr-only">Chat History</span>
              </button>
            )}
          </header>
        )}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && <MobileHome />}
          {activeTab === 'support' && <MobileSupport />}
          {activeTab === 'profile' && <MobileProfile />}
        </main>
        <footer className="sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm">
          <nav className="flex items-center justify-around h-16">
            <button
              onClick={() => setActiveTab('home')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                activeTab === 'home' ? 'text-primary' : 'hover:text-primary/80'
              )}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                activeTab === 'support' ? 'text-primary' : 'hover:text-primary/80'
              )}
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs font-medium">Support</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors duration-200',
                activeTab === 'profile' ? 'text-primary' : 'hover:text-primary/80'
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
