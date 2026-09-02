// Honest placeholders for areas outside the current vertical slice.

import { EmptyState } from "../components/ui";

const copy = {
  doctrine: {
    title: "Doctrine",
    line: "Approved reference material and rule search will live here. No NZDF source publications have been supplied yet, so there is nothing to search.",
  },
  templates: {
    title: "Templates",
    line: "Reusable activity configurations will live here once the planning workflow has been validated.",
  },
  admin: {
    title: "Administration",
    line: "People, roles and organisational configuration will live here. The prototype deliberately avoids building permissions early.",
  },
} as const;

export default function Planned({ area }: { area: keyof typeof copy }) {
  const c = copy[area];
  return (
    <>
      <header className="ff-pagehead">
        <div>
          <span className="ff-eyebrow">Planned</span>
          <h1>{c.title}</h1>
        </div>
      </header>
      <EmptyState title="Not built yet" line={c.line} action={<a className="btn btn--secondary" href="#/activities">Back to activities</a>} />
    </>
  );
}
