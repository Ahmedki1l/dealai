import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function slugify(input: string): string {
//   return input
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^a-z0-9-]/g, "");
// }

export async function convertBase64(
  file: File,
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader?.["result"]);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
