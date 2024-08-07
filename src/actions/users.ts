"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import * as z from "zod";

import { google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";

import {
  userAuthRegisterSchema,
  userAuthLoginSchema,
} from "@/validations/users";
import { lucia, getAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function signUpWithPassword(
  credentials: z.infer<typeof userAuthRegisterSchema>,
) {
  try {
    const { name, email, password } = userAuthRegisterSchema.parse(credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const existingEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) throw new Error("This email is already used.");

    const userId = generateIdFromEntropySize(10);

    await db.user.create({
      data: {
        id: userId,
        email,
        name,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/login");
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    throw Error(error?.["message"] ?? "an error occured, try again.");
  }
}

export async function signInWithPassword(
  credentials: z.infer<typeof userAuthLoginSchema>,
) {
  try {
    const { email, password } = userAuthLoginSchema.parse(credentials);

    const existingUser = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser) throw new Error("No such a user.");
    if (!existingUser?.["password"]) throw new Error("Incorrect password.");

    const validPassword = existingUser?.["password"] === password;
    //  await verify(existingUser?.["password"], password, {
    //   memoryCost: 19456,
    //   timeCost: 2,
    //   outputLen: 32,
    //   parallelism: 1,
    // });

    if (!validPassword) throw new Error("Incorrect email or password");

    const session = await lucia.createSession(existingUser?.["id"], {});
    const sessionCookie = lucia.createSessionCookie(session?.["id"]);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error: any) {
    if (isRedirectError(error)) throw error;

    throw Error(error?.["message"] ?? "an error occured, try again.");
  }
}

export async function signInWithGoogle() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookies().set("code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return redirect(url.toString());
}

export async function logout() {
  const { session } = await getAuth();
  if (!session) throw new Error("You are not logged in.");

  await lucia.invalidateSession(session?.["id"]);
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
}
