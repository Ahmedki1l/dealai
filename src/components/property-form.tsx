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
  propertyCreateSchema,
  propertyUpdateSchema,
} from "@/validations/properties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { propertyTypes } from "@/db/enums";

type PropertyFormProps = {
  loading: boolean;
  form: UseFormReturn<
    z.infer<typeof propertyCreateSchema> | z.infer<typeof propertyUpdateSchema>,
    any,
    undefined
  >;
};

export const PropertyForm = {
  title: ({ loading, form }: PropertyFormProps) => (
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
  units: ({ loading, form }: PropertyFormProps) => (
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
  type: ({ loading, form }: PropertyFormProps) => (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={loading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your project type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertyTypes?.map((e, i) => (
                  <SelectItem key={i} value={e?.["value"]}>
                    {e?.["label"]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  space: ({ loading, form }: PropertyFormProps) => (
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
  finishing: ({ loading, form }: PropertyFormProps) => (
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
  floors: ({ loading, form }: PropertyFormProps) => (
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
  rooms: ({ loading, form }: PropertyFormProps) => (
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
  bathrooms: ({ loading, form }: PropertyFormProps) => (
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
  recipients: ({ loading, form }: PropertyFormProps) => (
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
  garden: ({ loading, form }: PropertyFormProps) => (
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
  pool: ({ loading, form }: PropertyFormProps) => (
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
  view: ({ loading, form }: PropertyFormProps) => (
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
