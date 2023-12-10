"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export async function addTowathchlist(formData: FormData) {
  "use server";
  const movieId = formData.get("movieId");
  const pathname = formData.get("pathname") as string;
  const session = await getServerSession(authOptions);
  const data = await prisma?.watchlist.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });
  revalidatePath(pathname);
}

export async function removeTowathchlist(formData: FormData) {
  "use server";
  const watchlistId = formData.get("watchlistId") as string;
  const pathname = formData.get("pathname") as string;
  const data = await prisma?.watchlist.delete({
    where: {
      id: watchlistId,
    },
  });
  revalidatePath(pathname);
}
