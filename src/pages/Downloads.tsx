import { PageHero, Section, DownloadCard, RuleList } from "../components/ui";

const L = "/assets/logos";

export default function Downloads() {
  return (
    <>
      <PageHero
        eyebrow="14 · Downloads"
        title="Approved assets, ready to use."
        lead="Master SVG artwork, raster exports, patterns, icons, tokens and documents. Everything here is governed by the asset manifest; anything marked provisional carries an open decision."
      />

      <Section title="Documents">
        <div className="grid grid--2">
          <DownloadCard href="/exports/TACEDGE_Brand_Identity_and_Guidelines_v1.0.pdf" name="Brand Identity & Guidelines v1.0" meta="PDF · A4 · full edition" preview={`${L}/brandmark/tacedge-brandmark-sage.svg`} previewBg="var(--te-forest)" />
          <DownloadCard href="/exports/TACEDGE_Style_Tile_v1.0.pdf" name="Style Tile v1.0" meta="PDF · one page · supplier briefing" preview={`${L}/brandmark/tacedge-brandmark-sage.svg`} previewBg="var(--te-sage-tint)" />
        </div>
      </Section>

      <Section title="Logo package" sub="SVG masters plus PNG exports. Never redraw; regenerate PNGs with npm run export:logo-pngs.">
        <div className="grid grid--2">
          <DownloadCard href={`${L}/horizontal/tacedge-lockup-cream.svg`} name="Lockup · cream" meta="SVG · dark backgrounds" preview={`${L}/horizontal/tacedge-lockup-cream.svg`} previewBg="var(--te-forest)" />
          <DownloadCard href={`${L}/horizontal/tacedge-lockup-forest.svg`} name="Lockup · forest" meta="SVG · light backgrounds · D1 provisional wordmark green" preview={`${L}/horizontal/tacedge-lockup-forest.svg`} />
          <DownloadCard href={`${L}/monochrome/tacedge-lockup-ink.svg`} name="Lockup · ink (monochrome)" meta="SVG · single-colour print" preview={`${L}/monochrome/tacedge-lockup-ink.svg`} previewBg="var(--te-card)" />
          <DownloadCard href={`${L}/brandmark/tacedge-brandmark-sage.svg`} name="Brandmark · sage" meta="SVG · small spaces, watermarks" preview={`${L}/brandmark/tacedge-brandmark-sage.svg`} previewBg="var(--te-forest)" />
          <DownloadCard href={`${L}/dark/tacedge-wordmark-cream.svg`} name="Wordmark · cream" meta="SVG · dark backgrounds" preview={`${L}/dark/tacedge-wordmark-cream.svg`} previewBg="var(--te-forest)" />
          <DownloadCard href={`${L}/light/tacedge-wordmark-forest.svg`} name="Wordmark · forest" meta="SVG · light backgrounds" preview={`${L}/light/tacedge-wordmark-forest.svg`} />
          <DownloadCard href={`${L}/monochrome/tacedge-wordmark-ink.svg`} name="Wordmark · ink" meta="SVG · single-colour print" preview={`${L}/monochrome/tacedge-wordmark-ink.svg`} previewBg="var(--te-card)" />
          <DownloadCard href={`${L}/app-icon/tacedge-app-icon.svg`} name="App icon / favicon" meta="SVG tile + PNG 192/512 in assets/logos/app-icon" preview={`${L}/app-icon/tacedge-app-icon.svg`} previewBg="var(--te-card)" />
          <DownloadCard href={`${L}/png/tacedge-lockup-cream-2400w.png`} name="Lockup PNGs · 1200w / 2400w" meta="PNG · Office documents, signatures" preview={`${L}/horizontal/tacedge-lockup-cream.svg`} previewBg="var(--te-forest)" />
          <DownloadCard href={`${L}/png/tacedge-brandmark-sage-1024w.png`} name="Brandmark PNGs · 512w / 1024w" meta="PNG · transparent background" preview={`${L}/brandmark/tacedge-brandmark-sage.svg`} previewBg="var(--te-forest)" />
        </div>
      </Section>

      <Section title="Patterns and icons">
        <div className="grid grid--2">
          <DownloadCard href="/assets/patterns/tacedge-contour-dark.svg" name="Contour pattern · dark" meta="SVG 1600×500 · forest surfaces" preview="/assets/patterns/tacedge-contour-dark.svg" previewBg="var(--te-forest)" />
          <DownloadCard href="/assets/patterns/tacedge-contour-light.svg" name="Contour pattern · light" meta="SVG 1600×500 · tinted panels" preview="/assets/patterns/tacedge-contour-light.svg" />
          <DownloadCard href="/assets/patterns/tacedge-contour-lines-only.svg" name="Contour pattern · currentColor" meta="SVG · for developers" preview="/assets/patterns/tacedge-contour-light.svg" />
          <DownloadCard href="/assets/icons/worktype-anchoring.svg" name="Work-type icons (6)" meta="SVG 32px · stroke 1.6 · assets/icons/" preview="/assets/icons/worktype-drilling.svg" previewBg="var(--te-card)" />
        </div>
      </Section>

      <Section title="Design tokens" sub="Machine-readable. tokens/ is the source of truth; the website and product consume these rather than declaring their own values.">
        <div className="grid grid--2">
          <DownloadCard href="/tokens/tokens.css" name="tokens.css" meta="CSS custom properties · full set" />
          <DownloadCard href="/tokens/tokens.ts" name="tokens.ts" meta="Typed TypeScript tokens" />
          <DownloadCard href="/tokens/colors.json" name="colors.json" meta="Colour source of truth · HEX/RGB/HSL/CMYK/a11y" />
          <DownloadCard href="/tokens/typography.json" name="typography.json" meta="Families, roles, scale, rules" />
          <DownloadCard href="/tokens/spacing.json" name="spacing.json" meta="Spacing scale, layout, print margins" />
          <DownloadCard href="/tokens/radii.json" name="radii.json" meta="Radius and border tokens" />
          <DownloadCard href="/tokens/shadows.json" name="shadows.json" meta="Elevation tokens" />
          <DownloadCard href="/tokens/breakpoints.json" name="breakpoints.json" meta="Breakpoints and motion" />
        </div>
        <RuleList
          items={[
            <><strong>Consuming the tokens:</strong> import <code>tokens.css</code> (or copy it verbatim) and build on the custom properties; or import <code>tokens.ts</code> in TypeScript. Collateral must consume tokens, never re-declare them.</>,
            <><strong>Fonts are not distributed.</strong> Play, Be Vietnam Pro and JetBrains Mono are Google Fonts (SIL OFL 1.1); self-host woff2 in each property.</>,
            <>Full inventory with status and provenance: <a href="/assets/asset-manifest.md" download>asset-manifest.md</a>.</>,
          ]}
        />
      </Section>
    </>
  );
}
