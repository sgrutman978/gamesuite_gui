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
import { newLeaderboardTx, submitScore } from "../lib/SuiConnection";
import GameSuiteClient from "gamesuite_connect";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { ed25519 } from '@noble/curves/ed25519';
import { useEffect } from "react";

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
  unit: z.string().min(1, {
    message: "Please provide a unit.",
  }),
  sortOrder: z.string({
    required_error: "Please select a sort order.",
  }),
  resetPeriod: z.string().optional(),
  isPublic: z.boolean().default(true),
});

function getRandomHex(length: number): Uint8Array {
  const array = new Uint8Array(length);
  
  for (let i = 0; i < length; i++) {
    array[i] = Math.floor(Math.random() * 256); // 0 to 255 for each byte
  }
  
  return array;
}

async function generateEd25519KeyPair(): Promise<{ publicKey: Uint8Array; privateKey: string }> {
  const privateKey = getRandomHex(32); // Generate a 32-byte random private key
  const publicKey = await ed25519.getPublicKey(privateKey); // Derive the public key from the private key
  console.log(privateKey);
  console.log("PRIVATE");
  console.log(publicKey);
  return { publicKey: publicKey, privateKey: Buffer.from(privateKey).toString('hex') };
}

// generateEd25519KeyPair().then(data => {
//   console.log(data);
// })

export function NewLeaderboardForm(props: any) {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const gsc = new GameSuiteClient(useCurrentAccount(), signAndExecuteTransaction);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      unit: "",
      isPublic: true,
    },
  });

  useEffect(() => {
    submitScore().then((tx3) => {
      gsc.doTransaction(tx3!, ()=>{
        alert(`Leaderboard created`);
        // console.log(`COPY THIS PRIVATE KEY (THIS WILL NOT BE ACCESSIBLE AGAIN)\n ${data.privateKey} `);
        // navigate("/admin/leaderboards");
        // console.log(values);
      });
    })
  }, []);




    const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log("ppppp");
      console.log(values.isPublic);
      let orderBool = values.sortOrder == "desc" ? true : false;

      generateEd25519KeyPair().then((data) => {
        // let encPriv = nodeRSA.encrypt({
        //     text: Buffer.from(data.privateKey).toString('hex')
        // });
        // res.json({
        //     wink: data.privateKey,
        //     p: data.publicKey
        // });
    

      // add private field (!values.isPublic) to newLeaderboardTx and tx.movecall etc, already added to contract just not published
      newLeaderboardTx(props.projectCap, values.name, values.unit, values.description, orderBool, props.projectId, 529404995, Array.from(data.publicKey), gsc.myAddy, (!values.isPublic)).then((tx) => {
        gsc.doTransaction(tx!, ()=>{
          alert(`Leaderboard created`);
          console.log(data);
          console.log(`COPY THIS PRIVATE KEY (THIS WILL NOT BE ACCESSIBLE AGAIN)\n ${data.privateKey} `);
          // navigate("/admin/leaderboards");
          console.log(values);
        });
      }).catch((e) => {
        console.log(e);
      });
    });
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
              {/* <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="!text-black">Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Enter a Unit" />
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
              /> */}

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-black">Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unit (points, seconds, etc.)" {...field} />
                  </FormControl>
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
