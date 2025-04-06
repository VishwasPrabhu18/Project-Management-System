import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form';

const InviteUserForm = () => {
  const form = useForm({
    // resolver: zod
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (data) => {
    console.log(data);
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