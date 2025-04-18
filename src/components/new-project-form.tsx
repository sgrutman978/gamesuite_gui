import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { newProjectTx } from "../lib/SuiConnection";

import { useEnokiFlow } from '@mysten/enoki/react';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import GameSuiteClient from 'gamesuite_connect';
// import { EnokiFlow } from "@mysten/enoki";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "project name must be at least 5 characters.",
  }),
  // description: z.string().min(10, {
  //   message: "Description must be at least 10 characters.",
  // }),
  // project: z.string({
  //   required_error: "Please select a project.",
  // }),
  // type: z.string({
  //   required_error: "Please select a type.",
  // }),
  // sortOrder: z.string({
  //   required_error: "Please select a sort order.",
  // }),
  // resetPeriod: z.string().optional(),
  hasLeaderboards: z.boolean().default(true),
  hasAchievements: z.boolean().default(true),
});

export function NewProjectForm() {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const gsl = new GameSuiteClient(useCurrentAccount(), signAndExecuteTransaction);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hasLeaderboards: true,
      hasAchievements: true
      // description: "",
      // isPublic: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if(gsl.myAddy){
      console.log(gsl.myAddy);
      newProjectTx(form.getValues().name, form.getValues().hasLeaderboards, form.getValues().hasAchievements, gsl.myAddy).then((tx) => {
        gsl.doTransaction(tx!, () => {
          alert("New Project Created");
          navigate("/admin/projects");
          console.log(values);
        }, () => {
          alert("ERROR trying to create new project");
        });
      });
    }else{
      alert("Login required")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 items-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black">
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
       
            </div>

            <div className="grid gap-6 md:grid-cols-3 items-start">
            <FormField
              control={form.control}
              name="hasLeaderboards"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Include Leaderboards
                    </FormLabel>
                    <FormDescription>
                      This can not be changed!
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="hasAchievements"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Include Achievements
                    </FormLabel>
                    <FormDescription>
                      This can not be changed!
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create New Project</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
