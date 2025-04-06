import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "react-router-dom"
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const IssueDetails = () => {
  const { issueId } = useParams();

  const handleUpdateIssueStatus = (value) => {
    console.log(value);
  }

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <h1 className="text-lg font-semibold text-gray-400">Create Navbar</h1>
          <div className="py-5">
            <h2 className="font-semibold text-gray-400">Description</h2>
            <p className="text-gray-400 text-sm mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus reiciendis atque eligendi eius aperiam neque natus quis expedita inventore aut!</p>
          </div>

          <div className="mt-5">
            <h1 className="pb-3">Activity</h1>
            <Tabs className="dark w-[400px]" defaultValue="comments">
              <TabsList className="w-[300px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="all">

              </TabsContent>
              <TabsContent value="comments">
                <CreateCommentForm issueId={issueId} />
                <div className="mt-5 space-y-6">
                  {
                    [1, 1, 1].map((item) => <CommentCard key={item} />)
                  }
                </div>
              </TabsContent>
              <TabsContent value="history">

              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todo" />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="dark h-8 w-8 text-xs">
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                    <p>Vishwas Prabhu</p>
                  </div>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  <p>None</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  <Badge>In Progress</Badge>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Release</p>
                  <p>05-04-2025</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reporter</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="dark h-8 w-8 text-xs">
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                    <p>Vishwas Prabhu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetails