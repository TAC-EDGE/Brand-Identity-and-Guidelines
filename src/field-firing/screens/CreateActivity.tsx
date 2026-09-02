// Create Activity — the smallest useful set of fields. Everything else is
// configured later; the form never front-loads the whole safety plan.

import { useState } from "react";
import { newActivity, useStore } from "../domain/store";

const demoRanges = ["Demo Range 1", "Demo Range 4", "Demo Training Area (fictional)"];

export default function CreateActivity() {
  const { dispatch } = useStore();
  const today = new Date().toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [rangeName, setRangeName] = useState(demoRanges[0]);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [timings, setTimings] = useState("0800–1600");
  const [tried, setTried] = useState(false);

  const nameMissing = name.trim() === "";
  const unitMissing = unit.trim() === "";
  const dateInvalid = endDate < startDate;

  function submit() {
    setTried(true);
    if (nameMissing || unitMissing || dateInvalid) return;
    const activity = newActivity({
      name: name.trim(),
      unit: unit.trim(),
      rangeName,
      location: rangeName,
      startDate,
      endDate,
      timings: timings.trim() || "Not set",
    });
    dispatch({ type: "create-activity", activity });
    window.location.hash = `#/activity/${activity.id}`;
  }

  return (
    <>
      <nav className="ff-breadcrumb" aria-label="Breadcrumb">
        <a href="#/activities">Activities</a>
        <span aria-hidden="true">/</span>
        <span>New activity</span>
      </nav>
      <header className="ff-pagehead">
        <div>
          <h1>New activity</h1>
          <p className="lead">Name the activity and set the basics. Configuration and the safety plan come next.</p>
        </div>
      </header>

      <form
        className="ff-card ff-card--pad ff-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className={`ff-field${tried && nameMissing ? " ff-field--error" : ""}`}>
          <label htmlFor="act-name">Activity name</label>
          <input id="act-name" className="ff-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rifle grouping and zeroing" autoFocus />
          {tried && nameMissing && <p className="ff-field__error">Enter an activity name.</p>}
        </div>

        <div className={`ff-field${tried && unitMissing ? " ff-field--error" : ""}`}>
          <label htmlFor="act-unit">Unit</label>
          <input id="act-unit" className="ff-input" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Conducting unit" />
          {tried && unitMissing && <p className="ff-field__error">Enter the conducting unit.</p>}
        </div>

        <div className="ff-field">
          <label htmlFor="act-range">Range / training area</label>
          <select id="act-range" className="ff-select" value={rangeName} onChange={(e) => setRangeName(e.target.value)}>
            {demoRanges.map((r) => <option key={r}>{r}</option>)}
          </select>
          <p className="hint">Demo list. Real range data comes from authorised range records once supplied.</p>
        </div>

        <div className="ff-form__row">
          <div className="ff-field">
            <label htmlFor="act-start">Start date</label>
            <input id="act-start" className="ff-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className={`ff-field${tried && dateInvalid ? " ff-field--error" : ""}`}>
            <label htmlFor="act-end">End date</label>
            <input id="act-end" className="ff-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            {tried && dateInvalid && <p className="ff-field__error">End date is before the start date.</p>}
          </div>
        </div>

        <div className="ff-field">
          <label htmlFor="act-timings">Timings</label>
          <input id="act-timings" className="ff-input" value={timings} onChange={(e) => setTimings(e.target.value)} placeholder="e.g. 0800–1600" />
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button type="submit" className="btn btn--primary">Create activity</button>
          <a className="btn btn--secondary" href="#/activities">Cancel</a>
        </div>
      </form>
    </>
  );
}
