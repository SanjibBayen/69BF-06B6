import HeartRateChart from '@/components/dashboard/heart-rate-chart';
import ActivityChart from '@/components/dashboard/activity-chart';
import SleepTrends from '@/components/dashboard/sleep-trends';
import RiskIndicator from '@/components/dashboard/risk-indicator';
import NotificationTriggers from '@/components/dashboard/notification-triggers';
import WearableStatus from './dashboard/wearable-status';
import { SidebarTrigger } from './ui/sidebar';
import Spo2Meter from './dashboard/spo2-meter';

export function Dashboard() {
    return (
        <>
            <header className="flex h-14 items-center gap-4 border-b bg-background/60 backdrop-blur-sm px-6 sticky top-0 z-30">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
                <div className="ml-auto flex items-center gap-4">
                    <WearableStatus />
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <HeartRateChart />
                    </div>
                    <RiskIndicator />
                    <ActivityChart />
                    <Spo2Meter />
                    <SleepTrends />
                    <div className="lg:col-span-3">
                        <NotificationTriggers />
                    </div>
                </div>
            </main>
        </>
    )
}
