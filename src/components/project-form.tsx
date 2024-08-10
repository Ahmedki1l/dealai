"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
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
  projectUpdateFormSchema,
} from "@/validations/projects";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { platforms, propertiesTypes } from "@/db/enums";

type ProjectFormProps = {
  loading: boolean;
  form: UseFormReturn<
    | z.infer<typeof projectCreateFormSchema>
    | z.infer<typeof projectUpdateFormSchema>,
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
              placeholder="Nasr City"
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
  spaces: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="spaces"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Spaces</FormLabel>
          <FormControl>
            <Input type="text" disabled={loading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
  propertiesType: ({ loading, form }: ProjectFormProps) => (
    <FormField
      control={form.control}
      name="propertiesType"
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
                {propertiesTypes?.map((e, i) => (
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
  platforms: function Component({
    loading,
    form,
    limit,
  }: ProjectFormProps & {
    limit?: number;
  }) {
    const { fields, remove, append } = useFieldArray({
      name: "platforms",
      control: form?.["control"],
    });

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <FormLabel>Platforms</FormLabel>
          <Button
            size="icon"
            // @ts-ignore
            onClick={() => append({})}
            disabled={limit ? fields?.["length"] == limit : false}
          >
            <Icons.add />
          </Button>
        </div>

        {fields.map((field, i) => (
          <FormField
            control={form.control}
            key={i}
            name={`platforms.${i}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {platforms?.map((e, i) => {
                          const Icon = Icons?.[e?.["icon"]] ?? null;
                          return (
                            <SelectItem
                              key={i}
                              value={e?.["value"]}
                              disabled={
                                !!form
                                  ?.getValues("platforms")
                                  ?.find((p) => p?.["value"] === e?.["value"])
                              }
                              className="flex items-center gap-2"
                            >
                              {Icon && <Icon />} {e?.["label"]}
                            </SelectItem>
                          );
                        })}
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
        ))}
      </div>
    );
  },
};
