"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postCreateFormSchema, postUpdateSchema } from "@/validations/posts";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "./ui/datetime-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

type PostFormProps = {
  loading: boolean;
  form: UseFormReturn<
    z.infer<typeof postCreateFormSchema> | z.infer<typeof postUpdateSchema>,
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
  image: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              placeholder="unsplash url"
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
              className="min-h-56 w-full"
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
  content: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea
              className="min-h-56 w-full"
              placeholder="Describe your post content"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  noOfWeeks: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="noOfWeeks"
      render={({ field }) => (
        <FormItem>
          <FormLabel>No. Of Weeks</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              placeholder="5"
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
              className="min-h-56 w-full"
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
  campaignType: ({ loading, form }: PostFormProps) => (
    <FormField
      control={form.control}
      name="campaignType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Campaign Type</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={loading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your campaign" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="BRANDING_AWARENESS">
                  Branding Awareness
                </SelectItem>
                <SelectItem value="ENGAGEMENT">Engagement</SelectItem>
                <SelectItem value="SALES_CONVERSION">
                  Sales Conversion
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  contentLength: ({ loading, form, ...props }: PostFormProps & SelectProps) => (
    <FormField
      control={form.control}
      name="contentLength"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content Length</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={loading}
              {...props}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your content length" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="SHORT">Short</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LONG">Long</SelectItem>
              </SelectContent>
            </Select>
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
          <FormControl className="w-full">
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
