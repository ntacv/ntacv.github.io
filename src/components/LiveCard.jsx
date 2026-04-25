import { useEffect, useMemo, useState } from "react";
import CodeText from "./CodeText";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const SHEET_ID = "projects";
const OTHER_FILTER_VALUE = "__other__";

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
 * @typedef {Object} LiveProject
 * @property {string} id
 * @property {string} title
 * @property {string} url
 * @property {string} status
 * @property {string} location
 * @property {string} section
 * @property {string} description
 * @property {string | null} imageUrl
 * @property {boolean} isAi
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
 * @param {string | null | undefined} value
 * @returns {string}
 */
function text(value) {
  return String(value || "").trim();
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

/**
 * @param {string | null | undefined} image
 * @returns {string | null}
 */
function safeImageUrl(image) {
  const value = text(image);
  if (!value) {
    return null;
  }

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }

  return `/assets/images/${value}`;
}

/**
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
function isUnknownValue(value) {
  const normalized = text(value).toLowerCase();
  return !normalized || normalized === "unknown";
}

/**
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
function isTrueValue(value) {
  const normalized = text(value).toLowerCase();
  return ["true", "1", "yes", "on"].includes(normalized);
}

/**
 * @param {ProjectRow[]} rows
 * @returns {LiveProject[]}
 */
function mapLiveProjects(rows) {
  return rows.map((project, index) => {
    const status = STATUS[Number.parseInt(project.status || "-1", 10)] || "";
    const section = SECTIONS[Number.parseInt(project.section || "-1", 10)] || "";

    return {
      id: `${text(project.title) || "project"}-${index}`,
      title: text(project.title) || "Untitled project",
      url: safeUrl(project.url),
      status,
      location: text(project.location),
      section,
      description: text(project.desc),
      imageUrl: safeImageUrl(project.img || project.image || project.thumbnail || project.src),
      isAi: isTrueValue(project.ai),
    };
  });
}

/**
 * @param {string[]} values
 * @returns {string[]}
 */
function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

/**
 * Live project browser with card/list toggle and tag filters.
 * @returns {React.ReactElement}
 */
export default function LiveCard() {
  const [projects, setProjects] = useState(/** @type {LiveProject[]} */ ([]));
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");

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

    async function loadProjects() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Google Sheets projects response: ${response.status}`);
        }

        const payload = await response.json();
        const rows = mapRows(payload.values);
        setProjects(mapLiveProjects(rows));
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

  const statusOptions = useMemo(() => uniqueSorted(projects.map((project) => project.status)), [projects]);
  const locationOptions = useMemo(() => uniqueSorted(projects.map((project) => project.location)), [projects]);
  const sectionOptions = useMemo(() => uniqueSorted(projects.map((project) => project.section)), [projects]);
  const hasOtherStatus = useMemo(() => projects.some((project) => isUnknownValue(project.status)), [projects]);
  const hasOtherLocation = useMemo(() => projects.some((project) => isUnknownValue(project.location)), [projects]);
  const hasOtherSection = useMemo(() => projects.some((project) => isUnknownValue(project.section)), [projects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (statusFilter === OTHER_FILTER_VALUE) {
          if (!isUnknownValue(project.status)) {
            return false;
          }
        } else if (statusFilter !== "all" && project.status !== statusFilter) {
          return false;
        }
        if (locationFilter === OTHER_FILTER_VALUE) {
          if (!isUnknownValue(project.location)) {
            return false;
          }
        } else if (locationFilter !== "all" && project.location !== locationFilter) {
          return false;
        }
        if (sectionFilter === OTHER_FILTER_VALUE) {
          if (!isUnknownValue(project.section)) {
            return false;
          }
        } else if (sectionFilter !== "all" && project.section !== sectionFilter) {
          return false;
        }
        return true;
      }),
    [projects, statusFilter, locationFilter, sectionFilter]
  );

  if (status === "disabled") {
    return <div className="project-state">Project list API key is not configured. Add VITE_GOOGLE_SHEETS_API_KEY in .env to enable live data.</div>;
  }

  if (status === "loading") {
    return <div className="project-state">Loading project data...</div>;
  }

  if (status === "error") {
    return <div className="project-state">Could not load project data: {errorMessage}</div>;
  }

  return (
    <>
      <br />
      <br />
      <CodeText>Live project data:</CodeText>
      <br />
      <br />

      <div className="live-card-toolbar">
        <div className="live-card-view-toggle" role="group" aria-label="Live projects view mode">
          <button type="button" className={viewMode === "list" ? "live-card-view-button active" : "live-card-view-button"} onClick={() => setViewMode("list")}>
            List view
          </button>
          <button type="button" className={viewMode === "card" ? "live-card-view-button active" : "live-card-view-button"} onClick={() => setViewMode("card")}>
            Card view
          </button>
        </div>
      </div>

      <div className="live-card-filters">
        <div className="live-card-filter-group">
          <span className="live-card-filter-label">Status</span>
          <button type="button" className={statusFilter === "all" ? "live-card-chip active" : "live-card-chip"} onClick={() => setStatusFilter("all")}>
            All
          </button>
          {statusOptions.map((option) => (
            <button
              key={`status-${option}`}
              type="button"
              className={statusFilter === option ? "live-card-chip active" : "live-card-chip"}
              onClick={() => setStatusFilter(option)}
            >
              {option}
            </button>
          ))}
          {hasOtherStatus ? (
            <button
              type="button"
              className={statusFilter === OTHER_FILTER_VALUE ? "live-card-chip active" : "live-card-chip"}
              onClick={() => setStatusFilter(OTHER_FILTER_VALUE)}
            >
              Other
            </button>
          ) : null}
        </div>

        <div className="live-card-filter-group">
          <span className="live-card-filter-label">Location</span>
          <button type="button" className={locationFilter === "all" ? "live-card-chip active" : "live-card-chip"} onClick={() => setLocationFilter("all")}>
            All
          </button>
          {locationOptions.map((option) => (
            <button
              key={`location-${option}`}
              type="button"
              className={locationFilter === option ? "live-card-chip active" : "live-card-chip"}
              onClick={() => setLocationFilter(option)}
            >
              {option}
            </button>
          ))}
          {hasOtherLocation ? (
            <button
              type="button"
              className={locationFilter === OTHER_FILTER_VALUE ? "live-card-chip active" : "live-card-chip"}
              onClick={() => setLocationFilter(OTHER_FILTER_VALUE)}
            >
              Other
            </button>
          ) : null}
        </div>

        <div className="live-card-filter-group">
          <span className="live-card-filter-label">Section</span>
          <button type="button" className={sectionFilter === "all" ? "live-card-chip active" : "live-card-chip"} onClick={() => setSectionFilter("all")}>
            All
          </button>
          {sectionOptions.map((option) => (
            <button
              key={`section-${option}`}
              type="button"
              className={sectionFilter === option ? "live-card-chip active" : "live-card-chip"}
              onClick={() => setSectionFilter(option)}
            >
              {option}
            </button>
          ))}
          {hasOtherSection ? (
            <button
              type="button"
              className={sectionFilter === OTHER_FILTER_VALUE ? "live-card-chip active" : "live-card-chip"}
              onClick={() => setSectionFilter(OTHER_FILTER_VALUE)}
            >
              Other
            </button>
          ) : null}
        </div>
      </div>

      {!filteredProjects.length ? (
        <div className="project-state">No live project matches these filters.</div>
      ) : (
        <div className={viewMode === "list" ? "live-card-grid live-card-grid-list" : "live-card-grid live-card-grid-card"}>
          {filteredProjects.map((project) => (
            <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className="live-card-link">
              <article className="live-card-item">
                {project.imageUrl ? <img src={project.imageUrl} alt={`${project.title} visual`} className="live-card-media" /> : null}
                <div className="live-card-body">
                  <h3>{project.title}</h3>
                  <div className="live-card-tags">
                    {!isUnknownValue(project.status) ? <span className="live-card-tag">{project.status}</span> : null}
                    {!isUnknownValue(project.location) ? <span className="live-card-tag">{project.location}</span> : null}
                    {!isUnknownValue(project.section) ? <span className="live-card-tag">{project.section}</span> : null}
                    {project.isAi ? <span className="live-card-tag">made with ai</span> : null}
                  </div>
                </div>
                {project.description ? <p className="live-card-description">{project.description}</p> : null}
              </article>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
