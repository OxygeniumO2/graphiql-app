"use client";
import { useTranslation } from "@/i18n/client";
import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  const { t } = useTranslation("loader");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        alignItems: "center",
        margin: "auto",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: "white",
      }}
    >
      <div style={{ fontSize: "25px" }}>{t("title")}</div>
      <CircularProgress />
    </Box>
  );
}
