import React from "react";
import styles from "./mainTemplates.module.css";
import { CustomLink } from "../CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";

type MainLoggedUserProps = {
  userName: string;
};

export const MainLoggedUser = ({ userName }: MainLoggedUserProps) => {
  return (
    <div className={styles.main}>
      <h1>Welcome back, {userName}</h1>
      <nav>
        <ul>
          <li>
            <CustomLink href={"/graphiql-client"} title={"graphiql-client"} />
          </li>
          <li>
            <CustomLink href={"/GET"} title={"rest-client"} />
          </li>
          <li>
            <CustomLink href={RoutePath.HISTORY} title={"history"} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
