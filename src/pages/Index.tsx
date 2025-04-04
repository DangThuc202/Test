
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="flex-1 p-6 space-y-6  ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Professor!</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Course</span>
        </Button>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-7 ">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>Track student progress across your courses</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                    <div className="size-5 text-[11px] xl:text-base xl:size-12  rounded-md bg-primary flex items-center justify-center text-primary-foreground ">
                      CS{i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium xl:text-base text-sm">{["Introduction to Programming", "Data Structures", "Algorithms"][i]}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${[75, 50, 90][i]}%` }}
                          ></div>
                        </div>
                        <span className="text-xs whitespace-nowrap">{[75, 50, 90][i]}%</span>
                      </div>
                    </div>
                    <div className="xl:text-sm text-[10px] text-muted-foreground whitespace-nowrap">
                      {[28, 16, 32][i]} Students
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Courses</Button>
              </TabsContent>
              <TabsContent value="draft">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                    <div className="h-12 w-12 rounded-md bg-accent flex items-center justify-center text-accent-foreground">
                      ML
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Machine Learning Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">Draft - 6 modules</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last edited 2 days ago
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="archived">
                <div className="p-4 text-center text-muted-foreground">
                  No archived courses
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-2">
        <RecentActivity />
        </Card>
      </div>
    </div>
  );
};

export default Index;
