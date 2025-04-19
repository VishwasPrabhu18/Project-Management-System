import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PlusIcon } from '@radix-ui/react-icons'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import ChatBox from './ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryList, TagsList } from '@/constants/ProjectIssueConstant'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProjectById } from '@/redux/project/Action'
import CreateIssueForm from './CreateIssueForm'

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector(store => store);
  const { projectId } = useParams();

  const handleProjectInvite = () => {
  }

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
  }, [projectId])

  return (
    <>
      <div className='mt-5 lg:px-10'>
        <div className='lg:flex gap-5 justify-between pb-4'>
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className='text-gray-400 pb-10 w-full'>
              <h1 className='text-lg font-semibold pb-5'>{project?.projectDetails?.name}</h1>
              <div className='space-y-5 pb-10 text-sm'>
                <p className='w-full md:max-w-lg lg:max-w-xl'>{project?.projectDetails?.description}</p>

                <div className='flex'>
                  <p className='w-36'>Project Lead:</p>
                  <p>{project?.projectDetails?.owner?.fullName}</p>
                </div>
                <div className='flex'>
                  <p className='w-36'>Members:</p>
                  <div className='flex items-center gap-2'>
                    {
                      project?.projectDetails?.team?.map(item => (
                        <Avatar key={item.id} className="cursor-pointer dark">
                          <AvatarFallback>{item.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))
                    }
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button size="sm" variant="outline" onClick={handleProjectInvite} className="ml-2 dark">
                          <span>Invite</span>
                          <PlusIcon className='w-3 h-3' />
                        </Button>
                      </DialogClose>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Invite User</DialogHeader>
                      <InviteUserForm />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className='flex'>
                  <p className='w-36'>Category:</p>
                  <p>
                    {
                      CategoryList.find(item => item.value === project?.projectDetails?.category)?.lable
                    }
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-36'>Project Lead:</p>
                  <div className='flex items-center gap-2'>
                    {
                      project?.projectDetails?.tags?.map(item => (
                        <Badge key={item} className="py-1 px-3 rounded-full dark" variant="outline">
                          {
                            TagsList.find(tag => tag.value === item)?.lable
                          }
                        </Badge>
                      ))
                    }
                  </div>
                </div>
              </div>

              <section>
                <div className='flex justify-between items-center border-b mr-4 dark'>
                  <p className='py-5 text-lg -tracking-wider'>Tasks</p>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                      >
                        <PlusIcon />
                        Create Issue
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Issue</DialogTitle>
                      </DialogHeader>
                      <CreateIssueForm />
                    </DialogContent>
                  </Dialog>
                </div>


                <div className='lg:flex md:flex gap-3 justify-between py-5'>
                  <IssueList status="pending" title="Todo List" />
                  <IssueList status="in_progress" title="In Progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
            </div>
          </ScrollArea>

          <div className='lg:w-[30%] rounded-md sticky right-5 top-0'>
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails