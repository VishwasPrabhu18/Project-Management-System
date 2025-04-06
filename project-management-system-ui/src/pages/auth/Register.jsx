import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const Register = () => {
  const form = useForm({
    // resolver: zod
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
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
            name="fullName"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Full Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <FormField console={form.control}
            name="email"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <FormField console={form.control}
            name="password"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <Button type="submit" className="w-full dark" variant="outline">Create Issue</Button>

        </form>
      </Form>
    </div>
  )
}

export default Register