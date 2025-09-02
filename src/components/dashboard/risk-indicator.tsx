
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { detectAnomaliesAndNotify } from "@/ai/flows/mental-health-anomaly-detection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export default function RiskIndicator() {
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("LOW");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const { toast } = useToast();

  const handleCheckup = async () => {
    setIsLoading(true);
    try {
      // Simulate data that would trigger an anomaly
      const result = await detectAnomaliesAndNotify({
        heartRate: 110, 
        sleepDuration: 3, 
        activityLevel: "sedentary",
        mood: "stressed",
      });

      if (result.anomalyDetected && result.notificationMessage) {
        setRiskLevel("HIGH");
        setDialogMessage(result.notificationMessage);
        setShowDialog(true);
      } else {
        setRiskLevel("LOW");
        toast({
          title: "All Clear!",
          description: "No anomalies detected in your recent data.",
        });
      }
    } catch (error) {
      console.error("Anomaly detection failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not perform anomaly detection.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskInfo = (level: RiskLevel) => {
    switch (level) {
      case "HIGH":
        return {
          icon: <ShieldAlert className="h-10 w-10 text-red-500" />,
          title: "High Risk",
          description: "Potential anomalies detected.",
          colorClass: "bg-red-100 dark:bg-red-900/30",
          textColor: "text-red-700 dark:text-red-400",
        };
      case "MEDIUM":
        return {
          icon: <ShieldQuestion className="h-10 w-10 text-yellow-500" />,
          title: "Medium Risk",
          description: "Some patterns to watch.",
          colorClass: "bg-yellow-100 dark:bg-yellow-900/30",
          textColor: "text-yellow-700 dark:text-yellow-400",
        };
      case "LOW":
      default:
        return {
          icon: <ShieldCheck className="h-10 w-10 text-green-500" />,
          title: "Low Risk",
          description: "Things are looking great!",
          colorClass: "bg-green-100 dark:bg-green-900/30",
          textColor: "text-green-700 dark:text-green-400",
        };
    }
  };

  const currentRisk = getRiskInfo(riskLevel);

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Mental Health Risk</CardTitle>
          <CardDescription>AI-based risk assessment.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow items-center justify-center gap-4 text-center p-4">
          <div className={cn("rounded-full p-4", currentRisk.colorClass)}>
            {currentRisk.icon}
          </div>
          <div className="flex flex-col">
            <h3 className={cn("text-2xl font-bold", currentRisk.textColor)}>
              {currentRisk.title}
            </h3>
            <p className="text-muted-foreground text-sm">{currentRisk.description}</p>
          </div>
          <Button onClick={handleCheckup} disabled={isLoading} className="mt-auto w-full">
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Run AI Checkup"}
          </Button>
        </CardContent>
      </Card>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI Health Check</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>I'm Fine</AlertDialogCancel>
            <AlertDialogAction>I'd like help</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
