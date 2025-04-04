
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Check,
  Clock,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import type { Homework } from "@/types";

// Sample homework data
const mockHomework: Homework[] = [
  {
    id: "1",
    title: "Week 1 Assignment - Variables and Data Types",
    courseId: "1",
    courseName: "Introduction to Programming",
    dueDate: "2023-03-20T23:59:00Z",
    submissionsCount: 20,
    totalStudents: 28,
    status: "published",
  },
  {
    id: "2",
    title: "Arrays and Linked Lists Implementation",
    courseId: "2",
    courseName: "Data Structures",
    dueDate: "2023-03-18T23:59:00Z",
    submissionsCount: 12,
    totalStudents: 16,
    status: "published",
  },
  {
    id: "3",
    title: "Sorting Algorithms Comparison",
    courseId: "3",
    courseName: "Algorithms",
    dueDate: "2023-03-25T23:59:00Z",
    submissionsCount: 5,
    totalStudents: 32,
    status: "published",
  },
  {
    id: "4",
    title: "Recursion Practice Problems",
    courseId: "3",
    courseName: "Algorithms",
    dueDate: "2023-04-05T23:59:00Z",
    submissionsCount: 0,
    totalStudents: 32,
    status: "draft",
  },
  {
    id: "5",
    title: "Week 2 Assignment - Conditional Statements",
    courseId: "1",
    courseName: "Introduction to Programming",
    dueDate: "2023-03-10T23:59:00Z",
    submissionsCount: 28,
    totalStudents: 28,
    status: "completed",
  },
];

export default function Homework() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterHomework = (status: string, query: string) => {
    return mockHomework
      .filter(hw => hw.status === status)
      .filter(hw => 
        hw.title.toLowerCase().includes(query.toLowerCase()) || 
        hw.courseName.toLowerCase().includes(query.toLowerCase())
      );
  };
  
  const publishedHomework = filterHomework("published", searchQuery);
  const draftHomework = filterHomework("draft", searchQuery);
  const completedHomework = filterHomework("completed", searchQuery);

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const now = new Date();
    
    // Check if past due
    if (date < now) {
      return <span className="text-destructive">Past due • {date.toLocaleDateString()}</span>;
    }
    
    // Check if due today
    const isToday = 
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return <span className="text-amber-500">Due today • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>;
    }
    
    // Check if due tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = 
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear();
    
    if (isTomorrow) {
      return <span className="text-primary">Due tomorrow • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>;
    }
    
    return <span>Due {date.toLocaleDateString()}</span>;
  };

  const HomeworkCard = ({ homework }: { homework: Homework }) => {
    // Calculate completion percentage
    const completionPercentage = homework.submissionsCount / homework.totalStudents * 100;
    
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <div>
              <Badge variant="outline" className="mb-2">
                {homework.courseName}
              </Badge>
              <CardTitle className="text-lg">{homework.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <Pencil className="h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <Users className="h-4 w-4" /> View Submissions
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer flex items-center gap-2">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="flex items-center gap-1 mt-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDueDate(homework.dueDate)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Submissions</span>
              <span>{homework.submissionsCount} of {homework.totalStudents}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Homework</h1>
          <p className="text-muted-foreground">Create and manage assignments</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Assignment</span>
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assignments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="published">
        <TabsList className="mb-6">
          <TabsTrigger value="published">Active ({publishedHomework.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({draftHomework.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedHomework.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="published">
          {publishedHomework.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedHomework.map((homework) => (
                <HomeworkCard key={homework.id} homework={homework} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">No active assignments</h3>
              <p className="text-muted-foreground mb-4 max-w-sm">
                {searchQuery ? "Try a different search term." : "Create a new assignment to get started."}
              </p>
              {!searchQuery && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="draft">
          {draftHomework.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {draftHomework.map((homework) => (
                <Card key={homework.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <Badge variant="outline" className="mb-1">
                          {homework.courseName}
                        </Badge>
                        <CardTitle className="text-lg">{homework.title}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                            <Check className="h-4 w-4" /> Publish
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive cursor-pointer flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="mt-2">
                      Draft - Not yet published to students
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">No draft assignments</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term." : "Your draft assignments will appear here."}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedHomework.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedHomework.map((homework) => (
                <Card key={homework.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {homework.courseName}
                        </Badge>
                        <CardTitle className="text-lg">{homework.title}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                            <Users className="h-4 w-4" /> View Submissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive cursor-pointer flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span>Completed • {new Date(homework.dueDate).toLocaleDateString()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Submissions</span>
                        <span>{homework.submissionsCount} of {homework.totalStudents}</span>
                      </div>
                      <Progress value={100} className="h-2 bg-muted" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">No completed assignments</h3>
              <p className="text-muted-foreground mb-4">
                Completed assignments will appear here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
