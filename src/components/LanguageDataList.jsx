import { useEffect, useMemo, useState } from "react";
import { mapRows, getValue, parsePercent, safeColor, safeUrl } from "../lib/sheetHelpers";
import LangPercent from "./LangPercent";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const SHEET_ID = "languages";

/**
 * @typedef {Object.<string, string | null>} LanguageRow
 */

/**
 * Render language skill bars loaded from Google Sheets.
 * @returns {React.ReactElement | null}
 */
export default function LanguageDataList() {
  const [languages, setLanguages] = useState(/** @type {LanguageRow[]} */ ([]));
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const key = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const apiUrl = useMemo(() => {
    if (!key) {
      return "";
    }

    return `https://sheets.googleapis.com/v4/spreadsheets/${DOC_ID}/values/${SHEET_ID}!A1:Z200?key=${key}`;
  }, [key]);

  useEffect(() => {
    if (!apiUrl) {
      setStatus("disabled");
      return;
    }

    const controller = new AbortController();

    async function loadLanguages() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Google Sheets languages response: ${response.status}`);
        }

        const payload = await response.json();
        setLanguages(mapRows(payload.values));
        setStatus("success");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unable to load language data.");
      }
    }

    loadLanguages();
    return () => controller.abort();
  }, [apiUrl]);

  if (status === "disabled") {
    return <div className="project-state">Language list API key is not configured. Add VITE_GOOGLE_SHEETS_API_KEY in .env to enable live data.</div>;
  }

  if (status === "loading") {
    return <div className="project-state">Loading language data...</div>;
  }

  if (status === "error") {
    return <div className="project-state">Could not load language data: {errorMessage}</div>;
  }

  if (!languages.length) {
    return <div className="project-state">No language data found.</div>;
  }

  return (
    <div>
      {languages.map((language, index) => {
        const title = getValue(language, ["title", "name", "language"]);
        const description = getValue(language, ["description", "desc", "text"]);
        const color = safeColor(getValue(language, ["color", "colour"]));
        const percent = parsePercent(getValue(language, ["percent of skill", "percentofskill", "percent", "skill"]));
        const link = safeUrl(getValue(language, ["link", "url", "href"]));
        const label = [title, description].filter(Boolean).join(" — ") || "Untitled language";

        const meter = (
          <LangPercent color={color} percent={percent}>
            {label}
          </LangPercent>
        );

        return link ? (
          <a key={`${title || "language"}-${index}`} href={link} target="_blank" rel="noreferrer">
            {meter}
          </a>
        ) : (
          <div key={`${title || "language"}-${index}`}>{meter}</div>
        );
      })}
    </div>
  );
}
