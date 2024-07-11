import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
    <h1>Hare Krishna</h1>

    <div>
    <Link href="/register">Admin Page</Link>
    </div>

    <div>
    <Link href="/addUser">Registration Page</Link>
    </div>
    </main>
  );
}