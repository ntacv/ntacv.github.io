import { useEffect, useMemo, useState } from "react";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const SHEET_ID = "projects";

/** @type {Record<number, string>} */
const STATUS = {
  0: "ToDo",
  1: "Developing",
  2: "Works on my machine",
  3: "Should improve",
  4: "Open to suggestions",
  5: "Done",
};

/** @type {Record<number, string>} */
const SECTIONS = {
  0: "dev (php projects)",
  1: "elec (coding for 13 years)",
  2: "photo",
  3: "video",
  4: "typo (comm apple, rov, ved)",
  5: "prototypes (maquettes, 3d models)",
  6: "articles (esilv, medium, typo research)",
};

/**
 * @typedef {Object.<string, string | null>} ProjectRow
 */

/**
 * @param {string[][] | undefined} values
 * @returns {ProjectRow[]}
 */
function mapRows(values) {
  if (!Array.isArray(values) || values.length < 2) {
    return [];
  }

  const [headers, ...rows] = values;
  return rows.map((row) => {
    /** @type {ProjectRow} */
    const record = {};
    headers.forEach((header, index) => {
      record[String(header)] = row[index] ?? null;
    });
    return record;
  });
}

/**
 * @param {string | null | undefined} url
 * @returns {string}
 */
function safeUrl(url) {
  if (!url) {
    return "#";
  }

  try {
    return new URL(url).toString();
  } catch {
    return "#";
  }
}

export default function ProjectDataList() {
  const [projects, setProjects] = useState(/** @type {ProjectRow[]} */ ([]));
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const key = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

  const apiUrl = useMemo(() => {
    if (!key) {
      return "";
    }

    return `https://sheets.googleapis.com/v4/spreadsheets/${DOC_ID}/values/${SHEET_ID}!A1:Z100?key=${key}`;
  }, [key]);

  useEffect(() => {
    if (!apiUrl) {
      setStatus("disabled");
      return;
    }

    const controller = new AbortController();

    async function loadProjects() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Google Sheets response: ${response.status}`);
        }

        const payload = await response.json();
        const mapped = mapRows(payload.values);
        setProjects(mapped);
        setStatus("success");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unable to load project data.");
      }
    }

    loadProjects();

    return () => controller.abort();
  }, [apiUrl]);

  if (status === "disabled") {
    return (
      <div className="project-state">
        Project list API key is not configured. Add VITE_GOOGLE_SHEETS_API_KEY in .env to enable live data.
      </div>
    );
  }

  if (status === "loading") {
    return <div className="project-state">Loading project data...</div>;
  }

  if (status === "error") {
    return <div className="project-state">Could not load project data: {errorMessage}</div>;
  }

  if (!projects.length) {
    return <div className="project-state">No project data found.</div>;
  }

  return (
    <div className="project-data">
      {projects.map((project, index) => {
        const statusLabel = STATUS[Number.parseInt(project.status || "-1", 10)] || "Unknown";
        const sectionLabel = SECTIONS[Number.parseInt(project.section || "-1", 10)] || "Unknown";

        return (
          <a key={`${project.title || "project"}-${index}`} href={safeUrl(project.url)} target="_blank" rel="noreferrer">
            <article className="project-item">
              <h3>{project.title || "Untitled project"}</h3>
              {project.desc ? <p>{project.desc}</p> : null}
              <p className="project-meta">
                Status: {statusLabel} | Section: {sectionLabel}
                {project.location ? ` | Location: ${project.location}` : ""}
              </p>
            </article>
          </a>
        );
      })}
    </div>
  );
}
