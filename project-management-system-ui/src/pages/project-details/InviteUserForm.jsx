import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inviteToProject } from '@/redux/project/Action';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const InviteUserForm = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const form = useForm({
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (data) => {    
    dispatch(inviteToProject({ email: data.email, projectId }));
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField console={form.control}
            name="email"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-700 p-5"
                    placeholder="User Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <DialogClose>
            <Button type="submit" className="w-full">Invite User</Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default InviteUserForm