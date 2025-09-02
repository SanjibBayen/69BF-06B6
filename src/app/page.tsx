
'use client';
import { Home as HomeIcon, MessageSquare, User as UserIcon } from 'lucide-react';
import MobileHome from '@/components/mobile/mobile-home';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import MobileProfile from '@/components/mobile/mobile-profile';
import MobileSupport from '@/components/mobile/mobile-support';
import DesktopLayout from '@/components/desktop-layout';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <div className="md:hidden">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {activeTab === 'home' && <MobileHome />}
          {activeTab === 'support' && <MobileSupport />}
          {activeTab === 'profile' && <MobileProfile />}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 border-t bg-background">
          <nav className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab('home')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground',
                activeTab === 'home' && 'text-primary'
              )}
            >
              <HomeIcon />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground',
                activeTab === 'support' && 'text-primary'
              )}
            >
              <MessageSquare />
              <span className="text-xs">Support</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={cn(
                'flex flex-col items-center gap-1 p-2 text-muted-foreground',
                activeTab === 'profile' && 'text-primary'
              )}
            >
              <UserIcon />
              <span className="text-xs">Profile</span>
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
