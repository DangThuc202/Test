
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Users, BookOpen } from "lucide-react";
import type { Course } from "@/types";

// Sample courses data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "A beginner-friendly course covering programming fundamentals.",
    coverImage: "",
    progress: 75,
    studentsCount: 28,
    createdAt: "2023-02-15T10:00:00Z",
    updatedAt: "2023-03-10T14:30:00Z",
    status: "published",
  },
  {
    id: "2",
    title: "Data Structures",
    description: "Learn essential data structures for efficient programming.",
    coverImage: "",
    progress: 50,
    studentsCount: 16,
    createdAt: "2023-01-05T09:00:00Z",
    updatedAt: "2023-03-12T11:15:00Z",
    status: "published",
  },
  {
    id: "3",
    title: "Algorithms",
    description: "Master algorithmic thinking and problem-solving techniques.",
    coverImage: "",
    progress: 90,
    studentsCount: 32,
    createdAt: "2023-02-01T08:30:00Z",
    updatedAt: "2023-03-15T16:45:00Z",
    status: "published",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    description: "Explore the basics of machine learning and AI.",
    coverImage: "",
    progress: 20,
    studentsCount: 0,
    createdAt: "2023-03-01T13:00:00Z",
    updatedAt: "2023-03-16T09:20:00Z",
    status: "draft",
  },
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterCourses = (courses: Course[], status: string, query: string) => {
    return courses
      .filter(course => course.status === status)
      .filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) || 
        course.description.toLowerCase().includes(query.toLowerCase())
      );
  };

  const publishedCourses = filterCourses(mockCourses, "published", searchQuery);
  const draftCourses = filterCourses(mockCourses, "draft", searchQuery);
  const archivedCourses = filterCourses(mockCourses, "archived", searchQuery);
  
  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="overflow-hidden">
      <div className="h-32 bg-lms-blue-100 relative">
        {course.status === "draft" && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Draft
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <Edit className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <Users className="h-4 w-4" /> Manage Students
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive cursor-pointer flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {course.status !== "draft" && (
          <>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Course Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{course.studentsCount} Students</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Create and manage your courses</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Course</span>
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="published">
        <TabsList className="mb-6">
          <TabsTrigger value="published">Published ({publishedCourses.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({draftCourses.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archivedCourses.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="published">
          {publishedCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">No published courses found</h3>
              <p className="text-muted-foreground mb-4 max-w-sm">
                {searchQuery ? "Try a different search term." : "Create your first course to get started."}
              </p>
              {!searchQuery && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="draft">
          {draftCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {draftCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">No draft courses found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term." : "Your draft courses will appear here."}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="archived">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-1">No archived courses</h3>
            <p className="text-muted-foreground mb-4">
              Archived courses will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
