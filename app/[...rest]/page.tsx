import axios from "axios";
import { decodeBase64 } from "@/app/[...rest]/utils";
import { MainForm } from "../components/REST/MainForm";
import { ErrorBlock } from "../components/REST/components/ErrorBlock";
import { ResultBlock } from "../components/REST/components/ResultBlock";

import styles from "./page.module.css";
import { getTranslations } from "next-intl/server";

type RestClientProps = {
  params: {
    rest: string[];
  };
  searchParams: { [K: string]: string };
};

export default async function RestClient({
  params,
  searchParams,
}: RestClientProps) {
  const { rest } = params;

  let responseData = null;
  let errorData: null | string = null;
  let body = null;
  let url = undefined;

  const t = await getTranslations("rest");

  const method = decodeURIComponent(rest?.[0]) || "GET";
  const encodedUrl = decodeURIComponent(rest?.[1]);
  const encodedBody = decodeURIComponent(rest?.[2]);

  try {
    url = decodeBase64(encodedUrl);
    if (encodedBody) {
      body = decodeBase64(encodedBody);
    }
  } catch (error) {
    if (error instanceof Error) {
      errorData = error.message;
    } else {
      errorData = String(error);
    }
  }

  const headers: { [key: string]: string } = {};
  if (searchParams && Object.keys(searchParams).length > 0) {
    Object.keys(searchParams).forEach((key) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(searchParams[key]);
      if (decodedKey && decodedValue) {
        headers[decodedKey] = decodedValue;
      }
    });
  }

  try {
    const response = await axios({
      method: method.toLowerCase(),
      url,
      data: body || undefined,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    });

    responseData = response.data;
  } catch (error) {
    if (error instanceof Error) {
      errorData = error.message;
    } else {
      errorData = String(error);
    }
  }

  if (rest.length === 1) {
    errorData = "";
    responseData = t("responseTitle");
  }

  return (
    <section className={styles.pageWrapper}>
      <MainForm />
      {responseData && <ResultBlock responseData={responseData} />}
      <ErrorBlock errorText={errorData!} />
    </section>
  );
}
