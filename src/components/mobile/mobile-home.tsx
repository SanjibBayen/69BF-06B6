

import ActivityChart from "../dashboard/activity-chart";
import HeartRateCard from "../dashboard/compact/heart-rate-card";
import RiskIndicator from "../dashboard/risk-indicator";
import SleepTrends from "../dashboard/sleep-trends";
import Spo2Meter from "../dashboard/spo2-meter";


export default function MobileHome() {
    return (
        <div className="space-y-6 p-4 md:p-6 pb-24">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Hi, Alex 👋</h1>
                    <p className="text-muted-foreground">Your daily wellness summary.</p>
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                    <RiskIndicator />
                </div>
                <div className="sm:col-span-2">
                    <HeartRateCard />
                </div>
                <div className="sm:col-span-2">
                    <ActivityChart />
                </div>
                <div className="sm:col-span-2">
                    <SleepTrends />
                </div>
            </div>
        </div>
    );
}
