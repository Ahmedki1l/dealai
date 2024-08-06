"use client";

import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  postCreateSchema,
  // postDeleteSchema,
  // postUpdateSchema,
} from "@/validations/posts";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "./icons";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "./ui/datetime-picker";

type PostFormProps = {
  loading: boolean;
  form: UseFormReturn<
    z.infer<typeof postCreateSchema>,
    // | z.infer<typeof postUpdateSchema>
    // | z.infer<typeof postDeleteSchema>
    any,
    undefined
  >;
};

export const PostForm = {
  title: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              placeholder="Health Center"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  description: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              className="w-full"
              placeholder="Describe your post"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  imageDescription: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="imageDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image Description</FormLabel>
          <FormControl>
            <Textarea
              className="w-full"
              placeholder="Describe your images"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  postAt: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="postAt"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Schedule</FormLabel>
          <FormControl>
            <DateTimePicker
              // mode="single"
              value={field.value}
              onChange={field.onChange}
              granularity="minute"
              // disabled={
              //   (date) =>
              //     loading ||
              //     (date.getDate() != new Date().getDate() &&
              //       date < new Date()) // past date
              // }
              // initialFocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  // accounts: ({
  //   loading,
  //   form,
  //   accounts: { fields, remove },
  // }: PostFormProps & {
  //   accounts: UseFieldArrayReturn<any, "accounts", "id">;
  // }) =>
  //   fields.map((field, i) => (
  //     <FormField
  //       control={form.control}
  //       key={i}
  //       name={`accounts.${i}.value`}
  //       render={({ field }) => (
  //         <FormItem>
  //           <FormLabel className="sr-only">Platfrms</FormLabel>
  //           <FormControl>
  //             <div className="flex items-center justify-center gap-2">
  //               <Input type="text" disabled={loading} {...field} />

  //               <Button
  //                 type="button"
  //                 variant="outline"
  //                 size="icon"
  //                 onClick={() => remove(i)}
  //               >
  //                 <Icons.x />
  //               </Button>
  //             </div>
  //           </FormControl>
  //           <FormMessage />
  //         </FormItem>
  //       )}
  //     />
  //   )),
};
