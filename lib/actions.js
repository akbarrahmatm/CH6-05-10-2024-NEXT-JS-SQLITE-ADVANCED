"use server";
import { cookies } from "next/headers";
import axios from "axios";
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

export async function signInAction(prevState, formData) {
  console.log("[signInAction]", formData);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post("http://localhost:3001/api/v1/auth/login", {
      email,
      password,
    });

    cookies().set("token", res.data.data);

    return res.data;
  } catch (err) {
    console.log("error :", err);
    return {
      message: err.response.data.message || "An error occurred",
    };
  }
}

export async function getUsersAction() {
  try {
    const token = cookies().get("token").value;
    const res = await axios.get("http://localhost:3001/api/v1/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data.products;
  } catch (err) {
    return {
      message: err.response.data.message || "An error occurred",
    };
  }
}
