import {
  LayoutDashboard,
  Settings,
  User,
} from 'lucide-react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import Chatbot from '@/components/chatbot/chatbot';
import { Dashboard } from '@/components/dashboard';
import WellMindLogo from '@/components/well-mind-logo';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <WellMindLogo />
            <h1 className="text-xl font-semibold">WellMind</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 rounded-lg p-2 bg-background/30 dark:bg-card">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                        src="https://picsum.photos/40/40"
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className='rounded-full'
                        data-ai-hint="user avatar"
                    />
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-sm font-medium truncate">Alex Doe</span>
                    <span className="text-xs text-muted-foreground truncate">alex.doe@example.com</span>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Dashboard />
      </SidebarInset>
      <Chatbot />
    </SidebarProvider>
  );
}
