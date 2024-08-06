"use client";

import {
  useFieldArray,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  projectCreateFormSchema,
  // projectDeleteSchema,
  // projectUpdateSchema,
} from "@/validations/projects";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectFormProps = {
  loading: boolean;
  form: UseFormReturn<
    z.infer<typeof projectCreateFormSchema>,
    // | z.infer<typeof projectUpdateSchema>
    // | z.infer<typeof projectDeleteSchema>
    any,
    undefined
  >;
};

export const ProjectForm = {
  title: ({ loading, form }: ProjectFormProps) => (
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
  description: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              className="w-full"
              placeholder="Describe your project"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  distinct: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="distinct"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Distinct</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              placeholder="El shrouq"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  city: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              placeholder="Cairo"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  country: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              placeholder="Egypt"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  type: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  spaces: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="spaces"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Spaces</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  accounts: ({
    loading,
    form,
    accounts: { fields, remove },
  }: ProjectFormProps & {
    accounts: UseFieldArrayReturn<any, "accounts", "id">;
  }) =>
    fields.map((field, i) => (
      <FormField
        control={form.control}
        key={i}
        name={`accounts.${i}.value`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Platfrms</FormLabel>
            <FormControl>
              <div className="flex items-center justify-center gap-2">
                {/* <Input type="text" disabled={loading} {...field} /> */}

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(i)}
                >
                  <Icons.x />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )),
};
