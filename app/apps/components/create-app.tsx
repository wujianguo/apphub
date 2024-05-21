import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppCreateSchema } from "@/service/dto";
import { useState, useTransition } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function CreateAppForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AppCreateSchema>>({
    resolver: zodResolver(AppCreateSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AppCreateSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
    });
  };
  return (
    <Card className="mx-auto w-[400px] max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Add new app</CardTitle>
        {/* <CardDescription>
          Add new app
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter an app name"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter an app slug"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>

              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
              >
                Confirm
              </Button>
            </form>
          </Form>
        </div>

      </CardContent>
    </Card>
  )
}

export function CreateAppButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-auto border-none bg-transparent p-0">
        <CreateAppForm />
      </DialogContent>
    </Dialog>
  )
}
