import ActivityChart from "../dashboard/activity-chart";
import HeartRateChart from "../dashboard/heart-rate-chart";
import RiskIndicator from "../dashboard/risk-indicator";
import SleepTrends from "../dashboard/sleep-trends";


export default function MobileHome() {
    return (
        <div className="space-y-4 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Hi, Sanjib 👋</h1>
                    <p className="text-muted-foreground">Take one step for yourself today 🌱</p>
                </div>
            </div>
            <HeartRateChart />
            <div className="grid grid-cols-2 gap-4">
                <RiskIndicator />
                <SleepTrends />
            </div>
            <ActivityChart />
        </div>
    );
}
