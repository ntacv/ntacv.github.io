/**
 * Shared helpers for fetching and parsing Google Sheets data.
 */

/**
 * Normalize a sheet header key for consistent lookups.
 * Converts to lowercase and removes non-alphanumeric characters.
 * @param {string} key
 * @returns {string}
 */
export function normalizeKey(key) {
  return String(key).trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Parse Google Sheets API response into row objects.
 * First row is treated as headers; subsequent rows are data.
 * @param {string[][] | undefined} values
 * @returns {Array<Record<string, string | null>>}
 */
export function mapRows(values) {
  if (!Array.isArray(values) || values.length < 2) {
    return [];
  }

  const [headers, ...rows] = values;
  const normalizedHeaders = headers.map((header) => normalizeKey(header));

  return rows.map((row) => {
    /** @type {Record<string, string | null>} */
    const record = {};
    normalizedHeaders.forEach((header, index) => {
      if (!header) {
        return;
      }

      record[header] = row[index] ?? null;
    });
    return record;
  });
}

/**
 * Safely extract a value from a sheet row, trying multiple column name aliases.
 * @param {Record<string, string | null>} row
 * @param {string[]} keys - Alias keys to try in order
 * @returns {string}
 */
export function getValue(row, keys) {
  for (const key of keys) {
    const normalized = normalizeKey(key);
    const value = row[normalized];
    if (value) {
      return String(value).trim();
    }
  }

  return "";
}

/**
 * Parse and clamp a percent value to 0–100.
 * @param {string} value
 * @returns {number}
 */
export function parsePercent(value) {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    return 0;
  }

  return Math.max(0, Math.min(100, parsed));
}

/**
 * Validate a hex color; return the color if valid, or a fallback.
 * @param {string} color
 * @param {string} fallback - Default color if input is invalid
 * @returns {string}
 */
export function safeColor(color, fallback = "#3498DB") {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color) ? color : fallback;
}

/**
 * Validate and return a URL; return null if invalid.
 * @param {string | null | undefined} url
 * @returns {string | null}
 */
export function safeUrl(url) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

/**
 * Return a string trimmed and lowercased for comparison.
 * @param {string | null | undefined} value
 * @returns {string}
 */
export function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

/**
 * Check if a value is considered "unknown" or empty.
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
export function isUnknownValue(value) {
  const normalized = normalizeText(value);
  return !normalized || normalized === "unknown";
}

/**
 * Check if a value is considered "true" (true, 1, yes, on).
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
export function isTrueValue(value) {
  return ["true", "1", "yes", "on"].includes(normalizeText(value));
}

/**
 * Build a Google Sheets API URL for a specific range.
 * @param {string} docId - Google Sheets document ID
 * @param {string} sheetId - Sheet tab name or ID
 * @param {string} range - Cell range (e.g., "A1:Z200")
 * @param {string} apiKey - Google Sheets API key
 * @returns {string}
 */
export function buildSheetUrl(docId, sheetId, range, apiKey) {
  if (!apiKey) {
    return "";
  }

  return `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/${sheetId}!${range}?key=${apiKey}`;
}

/**
 * Get unique, sorted array of values.
 * @param {string[]} values
 * @returns {string[]}
 */
export function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}
