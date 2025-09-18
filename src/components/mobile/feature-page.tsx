
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pageConfig } from "./page-config";

interface FeaturePageProps {
  pageKey: string;
}

export default function FeaturePage({ pageKey }: FeaturePageProps) {
  const page = pageConfig[pageKey];

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
          <p className="text-muted-foreground">
            Content for this page is coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
