import { Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function WearableStatus() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wifi className="h-5 w-5 text-green-500" />
        <Badge variant="outline" className="border-green-500/50 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Connected</Badge>
    </div>
  );
}
