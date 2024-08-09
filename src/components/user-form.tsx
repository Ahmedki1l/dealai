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
  userAuthLoginSchema,
  userAuthRegisterSchema,
} from "@/validations/users";

type UserFormProps = {
  loading: boolean;
  form: UseFormReturn<
    | z.infer<typeof userAuthRegisterSchema>
    | z.infer<typeof userAuthLoginSchema>,
    any,
    undefined
  >;
};

export const UserForm = {
  name: function Component({ loading, form }: UserFormProps) {
    return (
      <FormField
        control={form?.["control"]}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              {/* @ts-ignore */}
              <Input
                type="text"
                placeholder="Joe Doe"
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
  email: function Component({ loading, form }: UserFormProps) {
    return (
      <FormField
        control={form?.["control"]}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
  password: function Component({ loading, form }: UserFormProps) {
    return (
      <FormField
        control={form?.["control"]}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              {/* @ts-ignore */}
              <Input
                type="password"
                placeholder="******"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
};
