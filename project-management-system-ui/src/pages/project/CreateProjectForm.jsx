import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TagsList } from '@/constants/ProjectListConstant';
import { Cross1Icon } from '@radix-ui/react-icons';
import React from 'react'
import { useForm } from 'react-hook-form'

const CreateProjectForm = () => {
  const form = useForm({
    // resolver: zod
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  const handleTagChange = (tag) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.includes(tag) ?
      currentTags.filter(item => item !== tag) :
      [...currentTags, tag];
    form.setValue("tags", updatedTags);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField console={form.control}
            name="name"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Project Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <FormField console={form.control}
            name="description"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Project Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <FormField console={form.control}
            name="category"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Select
                    defaultValues="fullstack"
                    value={field.value}
                    onValueChange={field.onChange}
                  // className="border w-full border-gray-700 p-5"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="dark">
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />

              </FormItem>
            }
          />
          <FormField console={form.control}
            name="tags"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => handleTagChange(value)}
                  // className="border w-full border-gray-700 p-5"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent className="dark">
                      {
                        TagsList.map((tag, idx) => (
                          <SelectItem key={idx} value={tag.value}>{tag.lable}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>

                <div className='flex gap-1 flex-wrap'>
                  {
                    field.value.map((item, idx) => (
                      <div
                        key={idx}
                        className='cursor-pointer flex rounded-full items-center border gap-3 py-1 px-3'
                      >
                        <span className='txet-sm'>{TagsList.find(v => v.value === item)?.lable}</span>
                        <Cross1Icon
                          className='h-3 w-3 text-red-500'
                          onClick={() => handleTagChange(item)}
                        />
                      </div>
                    ))
                  }
                </div>

                <FormMessage />

              </FormItem>
            }
          />
          <DialogClose>
            {
              false ?
                <div>
                  <p>You can create only 3 project with free plan, please upgrade your plan</p>
                </div>
                :
                <Button type="submit" className="w-full">Create Project</Button>

            }
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm