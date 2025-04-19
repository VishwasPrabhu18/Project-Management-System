import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon, PersonIcon, ChevronUpIcon, ChevronDownIcon, PauseIcon } from "@radix-ui/react-icons"
import UserList from "./UserList"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteIssue, fetchIssues, updateIssueStatus } from "@/redux/issue/Action";
import { useEffect, useState } from "react"

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [dummyChange, setDummyChange] = useState(false);

  const handleChangeStatus = (newStatus) => {
    dispatch(updateIssueStatus({ issueId: issue.id, status: newStatus }));
    setDummyChange((prevState) => !prevState);
  }

  useEffect(() => { 
    dispatch(fetchIssues(projectId));
  }, [dummyChange]);

  return (
    <Card className="rounded-md py-1 pb-2 -space-y-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {
              issue?.priority === "high" ? (
                <Avatar className="cursor-pointer bg-red-400 text-red-400 dark">
                  <AvatarFallback><ChevronUpIcon /></AvatarFallback>
                </Avatar>
              ) : issue?.priority === "medium" ? (
                <Avatar className="cursor-pointer bg-yellow-400 text-yellow-400 rotate-90 dark">
                  <AvatarFallback><PauseIcon /></AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="cursor-pointer bg-blue-400 text-blue-400 dark">
                  <AvatarFallback><ChevronDownIcon /></AvatarFallback>
                </Avatar>
              )
            }
            <CardTitle className="cursor-pointer" onClick={() => navigate(`/project/${projectId}/issue/${issue?.id}`)}>
              {issue?.title}
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="rounded-full" size="icon" variant="ghost">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark">
              {
                issue?.status !== "pending" && <DropdownMenuItem onClick={() => handleChangeStatus("pending")}>Todo</DropdownMenuItem>
              }
              {
                issue?.status !== "in_progress" && <DropdownMenuItem onClick={() => handleChangeStatus("in_progress")}>In Progress</DropdownMenuItem>
              }
              {
                issue?.status !== "done" && <DropdownMenuItem onClick={() => handleChangeStatus("done")}>Done</DropdownMenuItem>
              }
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch(deleteIssue({ issueId: issue?.id }))}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="truncate">{issue?.description}</p>
          <DropdownMenu className="w-[30rem] border border-red-400">
            <DropdownMenuTrigger>
              <Button size="icon" className="bg-gray-900 hover:text-black text-white rounded-full">
                <Avatar>
                  <AvatarFallback>
                    <PersonIcon />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark">
              <UserList issue={issue} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default IssueCard