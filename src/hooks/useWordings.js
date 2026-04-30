import { useEffect, useMemo, useState } from "react";
import { mapRows, getValue } from "../lib/sheetHelpers";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const SHEET_ID = "wording";
const DEFAULT_LANGUAGE = "en";

/**
 * @typedef {Object.<string, string | null>} WordingRow
 */

/**
 * @typedef {Object} WordingData
 * @property {Record<string, string>} translations
 */

/**
 * @param {WordingRow[]} rows
 * @param {string} language
 * @returns {Record<string, string>}
 */
function mapWordings(rows, language) {
  const result = /** @type {Record<string, string>} */ ({});

  rows.forEach((row) => {
    const key = getValue(row, ["key", "id", "name"]);
    if (!key) {
      return;
    }

    const value = getValue(row, [language, `text-${language}`, "text"]);
    result[key] = value || "";
  });

  return result;
}

/**
 * Fetch and provide wording/copy data from Google Sheets.
 * @param {string} language - Language code (e.g., "en", "fr")
 * @returns {Object} { wordings: Record<string, string>, status: string, errorMessage: string }
 */
export function useWordings(language = DEFAULT_LANGUAGE) {
  const [wordings, setWordings] = useState(/** @type {Record<string, string>} */ ({}));
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const key = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const apiUrl = useMemo(() => {
    if (!key) {
      return "";
    }

    return `https://sheets.googleapis.com/v4/spreadsheets/${DOC_ID}/values/${SHEET_ID}!A1:D200?key=${key}`;
  }, [key]);

  useEffect(() => {
    if (!apiUrl) {
      setStatus("disabled");
      return;
    }

    const controller = new AbortController();

    async function loadWordings() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Google Sheets wording response: ${response.status}`);
        }

        const payload = await response.json();
        const rows = mapRows(payload.values);
        setWordings(mapWordings(rows, language));
        setStatus("success");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unable to load wording data.");
      }
    }

    loadWordings();
    return () => controller.abort();
  }, [apiUrl, language]);

  return { wordings, status, errorMessage };
}

/**
 * Get a wording value with a fallback.
 * @param {Record<string, string>} wordings
 * @param {string} key
 * @param {string} fallback
 * @returns {string}
 */
export function getWording(wordings, key, fallback = "") {
  return wordings[key] ?? fallback;
}
