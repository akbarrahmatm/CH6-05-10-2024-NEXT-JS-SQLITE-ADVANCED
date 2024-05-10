"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (!meal.title || meal.title.trim() === "") {
    return { message: "Meal title cannot be empty" };
  }

  if (!meal.creator_email || meal.creator_email.trim() === "") {
    return { message: "Creator Email cannot be empty " };
  }

  if (!meal.creator_email.includes("@")) {
    return { message: "Creator Email format is wrong" };
  }

  console.log(meal);

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
