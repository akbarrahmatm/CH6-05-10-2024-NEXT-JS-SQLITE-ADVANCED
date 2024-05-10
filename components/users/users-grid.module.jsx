import MealItem from "./users-item";
import classes from "./users-grid.module.css";

export default function UsersGrid({ users }) {
  return (
    <ul className={classes.meals}>
      {users.map((product) => (
        <li key={product.id}>
          <MealItem {...product} />
        </li>
      ))}
    </ul>
  );
}
