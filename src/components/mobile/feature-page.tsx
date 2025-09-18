
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pageConfig } from "./page-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FeaturePageProps {
  pageKey: string;
}

const ConnectWatch = () => (
    <div className="space-y-4">
        <p className="text-muted-foreground">Pair your wearable to automatically sync your health data like heart rate, sleep, and activity levels.</p>
        <Button className="w-full">
            Search for Devices
        </Button>
    </div>
)

const ConnectChatGPT = () => (
    <div className="space-y-4">
        <p className="text-muted-foreground">Provide your OpenAI API key to enable advanced AI features and personalized insights.</p>
        <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input id="apiKey" type="password" placeholder="sk-..." />
        </div>
        <Button className="w-full">
            Connect
        </Button>
    </div>
)

const ConnectSpotify = () => (
    <div className="space-y-4">
        <p className="text-muted-foreground">Link your Spotify account to get personalized music recommendations for focus, relaxation, and mindfulness.</p>
        <Button className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white">
            Login with Spotify
        </Button>
    </div>
)

const TherapistAppointment = () => (
    <div className="space-y-4">
        <p className="text-muted-foreground">Find a time that works for you and book your next session.</p>
        <div className="space-y-2">
            <Label>Select a Date</Label>
            <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
            />
        </div>
        <div className="space-y-2">
            <Label>Select Time</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button className="w-full">
            Schedule Appointment
        </Button>
    </div>
)

const AddHealthIssue = () => (
    <div className="space-y-4">
         <p className="text-muted-foreground">Let us know about any specific health concerns you're facing so we can personalize your experience.</p>
        <div className="space-y-2">
            <Label htmlFor="issue">Health Issue</Label>
            <Input id="issue" placeholder="e.g., Anxiety, Depression, Stress" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" placeholder="Describe your symptoms and feelings." />
        </div>
        <Button className="w-full">
            Add Issue
        </Button>
    </div>
)

const TrendInsights = () => (
    <div className="space-y-4 text-muted-foreground">
        <p>This page will show you how your mood, activity, and sleep patterns correlate over time.</p>
        <p>For example, you'll be able to see if a lack of sleep is impacting your mood, or if increased activity improves your overall well-being.</p>
    </div>
)

const Personalization = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Label htmlFor="focus-mode">Focus Mode</Label>
            <Switch id="focus-mode" />
        </div>
        <div className="flex items-center justify-between">
            <Label htmlFor="daily-checkin">Daily Check-in Reminder</Label>
            <Switch id="daily-checkin" defaultChecked />
        </div>
        <div className="space-y-2">
            <Label>Preferred Activities</Label>
             <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Meditation</Button>
                <Button variant="outline" size="sm">Journaling</Button>
                <Button variant="outline" size="sm">Walking</Button>
                <Button variant="outline" size="sm">Music</Button>
            </div>
        </div>
    </div>
)

const PrivacySettings = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Label htmlFor="data-sharing">Share data with researchers</Label>
            <Switch id="data-sharing" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
            <Label htmlFor="personalized-ads">Personalized Ads</Label>
            <Switch id="personalized-ads" />
        </div>
        <Button variant="destructive" className="w-full">Delete My Account</Button>
    </div>
)


const Notifications = () => (
     <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch id="push-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" />
        </div>
        <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications">SMS Alerts for High Risk</Label>
            <Switch id="sms-notifications" defaultChecked />
        </div>
    </div>
)


const featureContent: Record<string, React.ComponentType> = {
    connectWatch: ConnectWatch,
    connectChatGPT: ConnectChatGPT,
    connectSpotify: ConnectSpotify,
    therapistAppointment: TherapistAppointment,
    addHealthIssue: AddHealthIssue,
    trendInsights: TrendInsights,
    personalization: Personalization,
    privacy: PrivacySettings,
    notifications: Notifications,
};


export default function FeaturePage({ pageKey }: FeaturePageProps) {
  const page = pageConfig[pageKey];
  const ContentComponent = featureContent[pageKey];

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">This feature page does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{page.title}</CardTitle>
          <CardDescription>{page.description}</CardDescription>
        </CardHeader>
        <CardContent>
            {ContentComponent ? <ContentComponent /> : <p className="text-muted-foreground">Content for this page is coming soon.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
