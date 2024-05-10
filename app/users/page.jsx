import Link from "next/link";

import { Suspense } from "react";
import { getMeals } from "@/lib/meals";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid.module";
import { getUsersAction } from "@/lib/actions";
import UsersGrid from "@/components/users/users-grid.module";

async function Meals() {
  const users = await getUsersAction();

  return <UsersGrid users={users} />;
}

export default function UserPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Our Team, <span className={classes.highlight}>managed by</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Add New Member</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Getting users...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
