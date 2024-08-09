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
  caseStudyUpdateSchema,
} from "@/validations/case-studies";
import { Textarea } from "@/components/ui/textarea";

type CaseStudyFormProps = {
  loading: boolean;
  form: UseFormReturn<
    | z.infer<typeof caseStudyCreateSchema>
    | z.infer<typeof caseStudyUpdateSchema>,
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
  content: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe your case study's content"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  targetAudience: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="targetAudience"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Target Audience</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe your case study's target audience"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  pros: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="pros"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe your case study's pros"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  cons: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="cons"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe your case study's cons"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  units: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="units"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Units</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  space: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="space"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Space</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  finishing: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="finishing"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Finishing</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  floors: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="floors"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Floors</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  rooms: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="rooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rooms</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  bathrooms: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="bathrooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bathrooms</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  recipients: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="recipients"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Recipients</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  garden: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="garden"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Garden</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  pool: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="pool"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pool</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  view: ({ loading, form }: CaseStudyFormProps) => (
    <FormField
      control={form.control}
      name="view"
      render={({ field }) => (
        <FormItem>
          <FormLabel>View</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
};
