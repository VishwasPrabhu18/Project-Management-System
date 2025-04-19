import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "react-router-dom"
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/redux/issue/Action";
import { IssueStatusList } from "@/constants/ProjectIssueConstant";
import { PersonIcon } from "@radix-ui/react-icons";
import { fetchComments } from "@/redux/comment/Action";

const IssueDetails = () => {
  const { issueId } = useParams();
  const dispatch = useDispatch();
  const { issuesDetails } = useSelector(store => store.issue);
  const { comments } = useSelector(store => store.comment);

  const handleUpdateIssueStatus = (value) => {
    dispatch(updateIssueStatus({ issueId: issueId, status: value }));
  }

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);

  return (
    <div className="px-20 py-8 text-gray-400">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <h1 className="text-lg font-semibold text-gray-400">{issuesDetails?.title}</h1>
          <div className="py-5">
            <h2 className="font-semibold text-gray-400">Description</h2>
            <p className="text-gray-400 text-sm mt-3">{issuesDetails?.description}</p>
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
                    comments?.map(comment => <CommentCard key={comment?.id} comment={comment} />)
                  }
                </div>
              </TabsContent>
              <TabsContent value="history">

              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssueStatus} value={issuesDetails?.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todo" />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectItem value="pending">Todo</SelectItem>
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
                  {
                    issuesDetails?.assignee !== null ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="dark h-8 w-8 text-xs">
                          <AvatarFallback>{issuesDetails?.assignee?.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p>{issuesDetails?.assignee?.fullName}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Avatar className="dark h-8 w-8 text-xs rotate-180">
                          <AvatarFallback><PersonIcon /></AvatarFallback>
                        </Avatar>
                        <p>Unassigned</p>
                      </div>
                    )
                  }
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  <p>None</p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  <Badge>
                    {
                      IssueStatusList.find(item => item.value === issuesDetails?.status)?.lable
                    }
                  </Badge>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Release</p>
                  <p>{issuesDetails?.dueDate}</p>
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