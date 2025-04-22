"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWorkspaceStore } from "@/lib/store/workspaceStore";
import { generateId, getCurrentDateTime } from "@/lib/utils";

const workspaceFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ワークスペース名は2文字以上である必要があります。" })
    .max(50, { message: "ワークスペース名は50文字以下である必要があります。" }),
});

type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;

export function CreateWorkspaceForm() {
  const router = useRouter();
  const { addWorkspace } = useWorkspaceStore();

  // ユーザーIDをローカルストレージから取得するか、新しく生成する
  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    if (userId) return userId;

    const newUserId = generateId();
    localStorage.setItem("userId", newUserId);
    return newUserId;
  };

  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: WorkspaceFormValues) {
    const workspaceId = generateId();
    const userId = getUserId();

    const newWorkspace = {
      id: workspaceId,
      name: data.name,
      createdAt: getCurrentDateTime(),
      ownerId: userId,
    };

    addWorkspace(newWorkspace);

    toast.success("ワークスペースが作成されました");
    router.push(`/workspace/${workspaceId}/settings`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ワークスペース名</FormLabel>
              <FormControl>
                <Input placeholder="チーム名を入力してください" {...field} />
              </FormControl>
              <FormDescription>
                あなたのチームやプロジェクトの名前を入力してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">ワークスペースを作成</Button>
      </form>
    </Form>
  );
}
