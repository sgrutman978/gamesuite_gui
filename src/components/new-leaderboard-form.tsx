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
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Leaderboard name must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  // project: z.string({
  //   required_error: "Please select a project.",
  // }),
  type: z.string({
    required_error: "Please select a type.",
  }),
  sortOrder: z.string({
    required_error: "Please select a sort order.",
  }),
  resetPeriod: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export function NewLeaderboardForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert("Leaderboard created");
    navigate("/admin/leaderboards");
    console.log(values);
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
                      Leaderboard Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter leaderboard name" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black">Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="racing-challenge">
                          Racing Challenge
                        </SelectItem>
                        <SelectItem value="puzzle-master">
                          Puzzle Master
                        </SelectItem>
                        <SelectItem value="adventure-quest">
                          Adventure Quest
                        </SelectItem>
                        <SelectItem value="strategy-wars">
                          Strategy Wars
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem> */}
                {/* )} */}
              {/* /> */}
            </div>

            <div className="grid gap-6 md:grid-cols-3 items-start">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="!text-black">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="score">Score</SelectItem>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="points">Points</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="!text-black">Sort Order</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select sort order" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="desc">Highest to Lowest</SelectItem>
                        <SelectItem value="asc">Lowest to Highest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resetPeriod"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="!text-black">Reset Period</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select reset period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-black">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter leaderboard description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about your leaderboard.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Public Leaderboard
                    </FormLabel>
                    <FormDescription>
                      Make this leaderboard visible to all players
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

            <div className="flex justify-end">
              <Button type="submit">Create Leaderboard</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
