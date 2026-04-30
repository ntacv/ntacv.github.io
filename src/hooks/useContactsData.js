import { useEffect, useMemo, useState } from "react";
import { mapRows, getValue, safeUrl, safeColor } from "../lib/sheetHelpers";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const SHEET_ID = "contacts";

/**
 * @typedef {Object.<string, string | null>} ContactRow
 */

/**
 * @typedef {Object} Contact
 * @property {string} title
 * @property {string} url
 * @property {string} icon
 * @property {string} color
 * @property {string} description
 */

/**
 * @param {ContactRow[]} rows
 * @returns {Contact[]}
 */
function mapContacts(rows) {
  return rows.map((contact) => ({
    title: getValue(contact, ["title", "name", "label"]) || "Untitled",
    url: safeUrl(getValue(contact, ["url", "href", "link"])) || "#",
    icon: getValue(contact, ["icon", "type"]).toLowerCase() || "globe",
    color: safeColor(getValue(contact, ["color", "colour"])),
    description: getValue(contact, ["desc", "description", "text"]) || "",
  }));
}

/**
 * Fetch and provide contacts data from Google Sheets.
 * Stores contacts in a single state, meant to be accessed by other components via a hook or context.
 * @returns {Object} { contacts: Contact[], status: string, errorMessage: string }
 */
export function useContactsData() {
  const [contacts, setContacts] = useState(/** @type {Contact[]} */ ([]));
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const key = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const apiUrl = useMemo(() => {
    if (!key) {
      return "";
    }

    return `https://sheets.googleapis.com/v4/spreadsheets/${DOC_ID}/values/${SHEET_ID}!A1:E100?key=${key}`;
  }, [key]);

  useEffect(() => {
    if (!apiUrl) {
      setStatus("disabled");
      return;
    }

    const controller = new AbortController();

    async function loadContacts() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Google Sheets contacts response: ${response.status}`);
        }

        const payload = await response.json();
        const rows = mapRows(payload.values);
        setContacts(mapContacts(rows));
        setStatus("success");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unable to load contacts.");
      }
    }

    loadContacts();
    return () => controller.abort();
  }, [apiUrl]);

  return { contacts, status, errorMessage };
}
