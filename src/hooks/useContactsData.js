import { useEffect, useMemo, useState } from "react";
import { buildSheetUrl, mapRows, normalizeKey, safeUrl } from "../lib/sheetHelpers";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const SHEET_ID = "contacts";

const CONTACT_HEADER_KEYS = new Set([
  "title",
  "name",
  "label",
  "url",
  "href",
  "link",
  "icon",
  "type",
  "color",
  "colour",
  "desc",
  "description",
  "text",
]);

/**
 * @typedef {Object} Contact
 * @property {string} title
 * @property {string} url
 * @property {string} icon
 * @property {string} color
 * @property {string} description
 */

/**
 * @param {Record<string, string | null>} contact
 * @returns {Contact}
 */
function mapContactRow(contact) {
  return {
    title: String(contact.title || contact.name || contact.label || "Untitled").trim(),
    url: safeUrl(String(contact.url || contact.href || contact.link || "")) || "#",
    icon: String(contact.icon || contact.type || "globe").trim().toLowerCase() || "globe",
    color: String(contact.color || contact.colour || "").trim(),
    description: String(contact.desc || contact.description || contact.text || "").trim(),
  };
}

/**
 * @param {string[][] | undefined} values
 * @returns {Contact[]}
 */
function mapContacts(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return [];
  }

  const firstRow = values[0] || [];
  const normalizedFirstRow = firstRow.map((value) => normalizeKey(value));
  const hasHeaderRow = normalizedFirstRow.some((value) => CONTACT_HEADER_KEYS.has(value));

  if (hasHeaderRow) {
    return mapRows(values).map((row) => mapContactRow(row));
  }

  return values
    .map((row) => ({
      title: row[0] || "Untitled",
      url: row[1] || "",
      icon: row[2] || "globe",
      color: row[3] || "",
      description: row[4] || "",
    }))
    .map((row) => mapContactRow(row));
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

    return buildSheetUrl(DOC_ID, SHEET_ID, "A1:E100", key);
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
        setContacts(mapContacts(payload.values));
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
