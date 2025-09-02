
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
        <main className="flex-1">
          {activeTab === 'home' && <MobileHome />}
          {activeTab === 'support' && <MobileSupport />}
          {activeTab === 'profile' && <MobileProfile />}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm">
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
