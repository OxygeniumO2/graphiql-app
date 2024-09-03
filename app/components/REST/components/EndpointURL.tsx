import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./EndpointURL.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { decodeBase64, encodeBase64 } from "@/app/[...rest]/utils";
import { ChangeEvent, FocusEvent } from "react";

type EndpointURLProps = {
  register: UseFormRegister<FieldValues>;
};

export const EndpointURL = ({ register }: EndpointURLProps) => {
  const pathname = usePathname().split("/");
  const url = pathname[2];
  const searchParams = useSearchParams().toString();
  const decodedUrl = url ? decodeBase64(decodeURIComponent(url)) : "";

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const pathArray = [...pathname];
    pathArray[2] = encodeBase64(e.target.value);
    let newPath = pathArray.join("/");
    if (searchParams) newPath = newPath + `?${searchParams}`;

    history.replaceState(null, "", newPath);
  }

  return (
    <div className={styles.wrapper}>
      <input
        defaultValue={decodedUrl}
        className={styles.input}
        {...register("EndpointURL")}
        onChange={handleChange}
        placeholder="Endpoint URL"
      ></input>
    </div>
  );
};
