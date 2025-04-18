import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/redux/auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data) => {
    dispatch(login(data));
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
          <Button type="submit" variant="outline" className="w-full dark">Create Issue</Button>

        </form>
      </Form>
    </div>
  )
}

export default Login