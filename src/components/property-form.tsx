"use client";

import {
  ControllerProps,
  useFieldArray,
  UseFieldArrayRemove,
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
import {
  propertyCreateFormSchema,
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
import { Button } from "./ui/button";
import { Icons } from "./icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type PropertyFormProps = {
  loading: boolean;
  form: UseFormReturn<
    z.infer<typeof propertyCreateFormSchema>,
    // | z.infer<typeof propertyCreateSchema>
    // | z.infer<typeof propertyUpdateSchema>,
    any,
    undefined
  >;
};

export const PropertyForm = {
  type: function Component({
    loading,
    form,
    typeIndex,
    remove,
  }: PropertyFormProps & {
    typeIndex: number;
    remove: UseFieldArrayRemove;
  }) {
    return (
      <FormField
        control={form.control}
        name={`types.${typeIndex}.value`}
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
                      <SelectValue placeholder="Select your property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes?.map((e, i) => {
                      // const Icon = Icons?.[e?.["icon"]] ?? null;
                      return (
                        <SelectItem
                          key={i}
                          value={e?.["value"]}
                          disabled={
                            !!form
                              ?.getValues("types")
                              ?.find((p) => p?.["value"] === e?.["value"])
                          }
                          className="flex items-center gap-2"
                        >
                          {/* {Icon && <Icon />}  */}

                          {e?.["label"]}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(typeIndex)}
                >
                  <Icons.x />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
  title: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.title`}
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
  units: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.units`}
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
  space: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.space`}
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
  finishing: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.finishing`}
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
  floors: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.floors`}
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
  rooms: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.rooms`}
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
  bathrooms: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.bathrooms`}
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
  recipients: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.recipients`}
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
  garden: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.garden`}
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
  pool: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.pool`}
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
  view: ({
    loading,
    form,
    typeIndex,
    propertyIndex,
  }: PropertyFormProps & { typeIndex: number; propertyIndex: number }) => (
    <FormField
      control={form.control}
      name={`types.${typeIndex}.properties.${propertyIndex}.view`}
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
