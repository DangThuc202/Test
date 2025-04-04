
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CalendarIcon, TrendingUp } from "lucide-react";
import type { DashboardStat } from "@/types";

const stats: DashboardStat[] = [
  {
    title: "Total Students",
    value: "134",
    change: 12,
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Active Courses",
    value: "8",
    change: 0,
    icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Pending Assignments",
    value: "23",
    change: -5,
    icon: <CalendarIcon className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Avg. Completion Rate",
    value: "86%",
    change: 7,
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {typeof stat.change !== "undefined" && (
              <p className={`text-xs ${stat.change > 0 ? 'text-green-500' : stat.change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {stat.change > 0 ? "+" : ""}
                {stat.change}% from last month
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
