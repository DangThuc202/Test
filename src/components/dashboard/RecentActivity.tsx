
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Activity } from "@/types";

const activities: Activity[] = [
  {
    id: "1",
    type: "homework_submitted",
    title: "Homework Submitted",
    description: "Emma Thompson submitted 'Week 3 Assignment'",
    timestamp: "10 minutes ago",
    user: {
      name: "Emma Thompson",
      avatar: "",
    },
  },
  {
    id: "2",
    type: "question_asked",
    title: "Question Asked",
    description: "Alex Wilson asked a question in 'Introduction to Programming'",
    timestamp: "25 minutes ago",
    user: {
      name: "Alex Wilson",
      avatar: "",
    },
  },
  {
    id: "3",
    type: "course_enrolled",
    title: "New Enrollment",
    description: "3 new students enrolled in 'Data Structures'",
    timestamp: "1 hour ago",
    user: {
      name: "Multiple Students",
      avatar: "",
    },
  },
  {
    id: "4",
    type: "comment_added",
    title: "Comment Added",
    description: "Sophia Chen commented on 'Machine Learning Basics'",
    timestamp: "2 hours ago",
    user: {
      name: "Sophia Chen",
      avatar: "",
    },
  },
];

export default function RecentActivity() {
  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('');
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your courses and students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{getInitials(activity.user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
