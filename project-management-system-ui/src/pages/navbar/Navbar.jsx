import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import CreateProjectForm from '../project/CreateProjectForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MixIcon, PersonIcon } from '@radix-ui/react-icons';

const Navbar = () => {
  return (
    <div className='border-b py-4 px-5 flex items-center justify-between dark'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
        <Button variant="outline" className="rounded-full">
          <MixIcon />
        </Button>
        <p className='cursor-pointer font-bold text-xl'>Project Management</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost">New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button variant="ghost">Upgrade Plan</Button>
      </div>
      <div className='flex gap-3 items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>Phoenix</p>
      </div>
    </div>
  )
}

export default Navbar