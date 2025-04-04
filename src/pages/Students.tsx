
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, MoreHorizontal, Edit, Mail, Trash2 } from "lucide-react";
import type { Student } from "@/types";

// Sample students data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.t@example.com",
    avatar: "",
    progress: 78,
    lastActive: "2023-03-15T14:30:00Z",
    enrolledCourses: 3,
    status: "active",
  },
  {
    id: "2",
    name: "Alex Wilson",
    email: "alex.w@example.com",
    avatar: "",
    progress: 45,
    lastActive: "2023-03-14T10:15:00Z",
    enrolledCourses: 2,
    status: "active",
  },
  {
    id: "3",
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    avatar: "",
    progress: 92,
    lastActive: "2023-03-16T09:45:00Z",
    enrolledCourses: 4,
    status: "active",
  },
  {
    id: "4",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    avatar: "",
    progress: 30,
    lastActive: "2023-03-10T16:20:00Z",
    enrolledCourses: 1,
    status: "inactive",
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia.d@example.com",
    avatar: "",
    progress: 85,
    lastActive: "2023-03-16T11:10:00Z",
    enrolledCourses: 3,
    status: "active",
  },
];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredStudents = mockStudents.filter(
    student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('');
  }
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Students</h1>
          <p className="text-muted-foreground">View and manage your students</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-sm px-2 font-normal">
            Active: {mockStudents.filter(s => s.status === 'active').length}
          </Badge>
          <Badge variant="outline" className="rounded-sm px-2 font-normal text-muted-foreground">
            Inactive: {mockStudents.filter(s => s.status === 'inactive').length}
          </Badge>
        </div>
      </div>
      
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Student</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.enrolledCourses}</TableCell>
                  <TableCell>{formatDate(student.lastActive)}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive cursor-pointer flex items-center gap-2">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchQuery ? "No students found matching your search." : "No students."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
