import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CategoryList, TagsList } from '@/constants/ProjectIssueConstant'
import { deleteProject } from '@/redux/project/Action'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className='space-y-5'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-5'>
              <h1 onClick={() => navigate(`/project/${project.id}`)} className='cursor-pointer font-black text-lg'>{project.name}</h1>
              <DotFilledIcon />
              <p className='text-sm text-gray-400'>
                {
                  CategoryList.find(item => item.value === project.category)?.lable
                }
              </p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark">
                  <DropdownMenuItem>
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => dispatch(deleteProject(project.id))}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className='text-gray-500 text-sm'>{project.description}</p>
        </div>
        <div className='flex flex-wrap gap-2 items-center'>
          {
            project?.tags?.map(item => <Badge key={item} className="py-1 px-3" variant="outline">{
              TagsList.find(tag => tag.value === item)?.lable
            }</Badge>)
          }
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard