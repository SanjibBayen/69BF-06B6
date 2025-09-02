
import HeartRateChart from "../dashboard/heart-rate-chart";
import RiskIndicator from "../dashboard/risk-indicator";
import Spo2Meter from "../dashboard/spo2-meter";
import SleepTrends from "../dashboard/sleep-trends";
import ActivityChart from "../dashboard/activity-chart";


export default function MobileHome() {
    return (
        <div className="space-y-6 p-4 md:p-6 pb-24">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Hi, Alex 👋</h1>
                    <p className="text-muted-foreground">Take one step for yourself today 🌱</p>
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                    <RiskIndicator />
                </div>
                <div className="sm:col-span-2">
                    <HeartRateChart />
                </div>
                <ActivityChart />
                <SleepTrends />
                <div className="sm:col-span-2">
                    <Spo2Meter />
                </div>
            </div>
        </div>
    );
}
