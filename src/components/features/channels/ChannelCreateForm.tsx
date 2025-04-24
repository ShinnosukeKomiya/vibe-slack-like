import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useChannelStore } from "@/lib/store/channelStore"

// バリデーションスキーマ
const createChannelSchema = z.object({
  name: z
    .string()
    .min(1, "チャンネル名は必須です")
    .regex(/^[A-Za-z0-9\-_]+$/, "英数字、ハイフン、アンダースコアのみ使用可能です"),
  isPublic: z.boolean(),
  description: z.string().optional(),
})

type CreateChannelFormValues = z.infer<typeof createChannelSchema>

export function ChannelCreateForm({ workspaceId }: { workspaceId: string }) {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateChannelFormValues>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: "",
      isPublic: true,
      description: "",
    },
  })

  const addChannel = useChannelStore((state) => state.addChannel)
  const handleSubmit = (values: CreateChannelFormValues) => {
    addChannel({ workspaceId, ...values })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>チャンネルを作成</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>チャンネル作成</DialogTitle>
          <DialogDescription>新しいチャンネルを作成してください</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>チャンネル名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="general" />
                  </FormControl>
                  <FormDescription>英数字、ハイフン、アンダースコアのみ使用可能です</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>公開</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明（任意）</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="チャンネルの説明" />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">キャンセル</Button>
              </DialogClose>
              <Button type="submit">作成</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
