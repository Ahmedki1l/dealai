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
import {
  caseStudyCreateSchema,
  // caseStudyDeleteSchema,
  // caseStudyUpdateSchema,
} from "@/validations/case-studies";
import { Textarea } from "@/components/ui/textarea";
type CaseStudyFormProps = {
  loading: boolean;
  form: UseFormReturn<
    z.infer<typeof caseStudyCreateSchema>,
    // | z.infer<typeof caseStudyUpdateSchema>
    // | z.infer<typeof caseStudyDeleteSchema>
    any,
    undefined
  >;
};

export const CaseStudyForm = {
  title: ({ loading, form }: CaseStudyFormProps) => (
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
  description: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              className="w-full"
              placeholder="Describe your case study"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
};
