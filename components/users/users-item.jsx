import Link from "next/link";
import Image from "next/image";

import classes from "./users-item.module.css";

export default function UserItem({
  name,
  price,
  title,
  slug,
  image,
  summary,
  creator,
}) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{name}</h2>
          <p>Rp. {price}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
