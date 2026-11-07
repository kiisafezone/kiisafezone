import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RAW = "https://raw.githubusercontent.com/kiisafezone/kiisafezone/main/assets/";
const asset = (path: string) => RAW + path;

const C = {
  ink: "#0b1020",
  navy: "#101a35",
  blue: "#2563eb",
  violet: "#7c3aed",
  white: "#f8fbff",
  muted: "#9eabc5",
  glass: "rgba(19, 31, 57, 0.78)",
  border: "rgba(166, 190, 255, 0.22)",
};

const fadeUp = (frame: number, start = 0, duration = 36) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  transform: `translateY(${interpolate(frame, [start, start + duration], [34, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

const Glow: React.FC<{ x?: string; y?: string; color?: string; size?: number }> = ({
  x = "50%",
  y = "50%",
  color = "rgba(37, 99, 235, .28)",
  size = 700,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
      filter: "blur(24px)",
      pointerEvents: "none",
    }}
  />
);

const AnimatedSvg: React.FC<{
  src: string;
  style?: React.CSSProperties;
  playbackRate?: number;
}> = ({ src, style, playbackRate = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`SVG request failed: ${response.status}`);
        return response.text();
      })
      .then((svgText) => {
        if (!cancelled) setMarkup(svgText);
      })
      .catch((error) => {
        console.error("Unable to load animated SVG:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  useLayoutEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const animatedSvg = svg as SVGSVGElement;
    animatedSvg.pauseAnimations?.();
    animatedSvg.setCurrentTime?.((frame / fps) * playbackRate);
  }, [frame, fps, markup, playbackRate]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", ...style }}
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
    />
  );
};

export const HeaderSvgOnly: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b1020", alignItems: "center", justifyContent: "center", padding: 36, boxSizing: "border-box" }}>
    <AnimatedSvg src={asset("header.svg")} playbackRate={0.5} style={{ width: "100%", height: "100%" }} />
  </AbsoluteFill>
);
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: "#9bb8ff", fontSize: 17, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase" }}>
    {children}
  </div>
);

const Browser: React.FC<{ children: React.ReactNode; scale?: number }> = ({ children, scale = 1 }) => (
  <div
    style={{
      width: 940,
      height: 1660,
      transform: `scale(${scale})`,
      transformOrigin: "top center",
      overflow: "hidden",
      borderRadius: 22,
      border: `1px solid ${C.border}`,
      background: "rgba(9, 15, 30, .94)",
      boxShadow: "0 36px 120px rgba(0,0,0,.55), 0 0 70px rgba(55,105,255,.12)",
    }}
  >
    <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 20px", gap: 9, background: "rgba(255,255,255,.055)", borderBottom: `1px solid ${C.border}` }}>
      {["#ff6b6b", "#ffd166", "#5ee0a0"].map((color) => (
        <span key={color} style={{ width: 11, height: 11, borderRadius: 20, background: color }} />
      ))}
      <div style={{ marginLeft: 24, width: 420, borderRadius: 7, padding: "6px 14px", background: "rgba(255,255,255,.06)", color: "#91a0bd", fontSize: 12 }}>
        github.com / kiisafezone / kiisafezone
      </div>
    </div>
    <div style={{ height: 1612, overflow: "hidden", position: "relative", background: "#0d1426" }}>{children}</div>
  </div>
);

const SectionTitle: React.FC<{ command: string }> = ({ command }) => (
  <div style={{ color: "#eaf0ff", fontSize: 25, fontWeight: 750, marginBottom: 18, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
    kiisafezone:~$ {command}
    <div style={{ marginTop: 8 }}><Img src={asset("line.svg")} style={{ width: 760, height: 10, objectFit: "fill" }} /></div>
  </div>
);

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: f, fps, config: { damping: 18, stiffness: 70 } });
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, #172c5b 0%, #0b1020 62%, #070b16 100%)", justifyContent: "center", alignItems: "center" }}>
      <Glow x="50%" y="44%" size={1000} />
      <div style={{ textAlign: "center", transform: `scale(${interpolate(scale, [0, 1], [.92, 1])})`, opacity: interpolate(f, [0, 20], [0, 1], { extrapolateRight: "clamp" }) }}>
        <Eyebrow>GITHUB PROFILE · README SHOWCASE</Eyebrow>
        <div style={{ marginTop: 24, fontSize: 82, lineHeight: 1.04, letterSpacing: -4, fontWeight: 850, color: C.white }}>
          kiisafezone<span style={{ color: "#8daaff" }}>.</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 29, color: "#b7c5e2", letterSpacing: 2 }}>
          Independent software developer · Open source creator
        </div>
        <div style={{ margin: "54px auto 0", width: 170, height: 3, borderRadius: 5, background: "linear-gradient(90deg, #2563eb, #8b5cf6)" }} />
        <div style={{ marginTop: 22, color: "#8ea1c8", fontSize: 15, letterSpacing: 4 }}>A PROFILE BUILT LIKE A DESKTOP</div>
      </div>
    </AbsoluteFill>
  );
};

const HeaderScene: React.FC = () => {
  const f = useCurrentFrame();
  const y = interpolate(f, [0, 210], [0, -115], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #0b1020, #111e3b)", alignItems: "center", justifyContent: "center" }}>
      <Glow x="50%" y="35%" size={850} />
      <div style={{ ...fadeUp(f, 0, 28), position: "relative" }}>
        <Browser>
          <div style={{ transform: `translateY(${y}px)`, padding: "46px 42px 80px", color: C.white, fontFamily: "Arial, sans-serif" }}>
            <div style={{ textAlign: "center" }}>
              <AnimatedSvg src={asset("header.svg")} playbackRate={0.5} style={{ width: "100%", height: 280 }} />
              <div style={{ marginTop: 14, color: "#9eb0d2", fontSize: 16, letterSpacing: 2 }}>PROFILE VIEWS　·　FOLLOWERS　·　ENGLISH / BAHASA INDONESIA</div>
              <Img src={asset("divider.svg")} style={{ width: "100%", height: 30, objectFit: "fill", marginTop: 28 }} />
              <div style={{ fontSize: 24, letterSpacing: 5, fontWeight: 800, margin: "14px 0 18px" }}>TABLE OF CONTENTS</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                {["about.svg", "approach.svg", "projects.svg", "stack.svg"].map((name) => <Img key={name} src={asset("nav/" + name)} style={{ height: 46, width: "auto" }} />)}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12 }}>
                {["analytics.svg", "connect.svg", "guestbook.svg"].map((name) => <Img key={name} src={asset("nav/" + name)} style={{ height: 38, width: "auto" }} />)}
              </div>
              <Img src={asset("divider.svg")} style={{ width: "100%", height: 24, objectFit: "fill", marginTop: 20 }} />
            </div>
          </div>
        </Browser>
      </div>
      <div style={{ position: "absolute", bottom: 105, ...fadeUp(f, 22, 24), textAlign: "center" }}>
        <Eyebrow>01 / THE FIRST IMPRESSION</Eyebrow>
        <div style={{ marginTop: 12, fontSize: 27, color: "#dbe6ff" }}>A clean entrance. A clear sense of identity.</div>
      </div>
    </AbsoluteFill>
  );
};

const AboutApproach: React.FC<{ approach?: boolean }> = ({ approach = false }) => {
  const f = useCurrentFrame();
  const command = approach ? "approach" : "about";
  const image = approach ? "approach.svg" : "about-typing.svg";
  return (
    <AbsoluteFill style={{ background: "linear-gradient(130deg, #0b1020, #111d38)", alignItems: "center", justifyContent: "center" }}>
      <Glow x="22%" y="52%" color="rgba(37,99,235,.18)" size={650} />
      <div style={{ position: "relative", ...fadeUp(f, 0, 26) }}>
        <Browser>
          <div style={{ padding: "72px 52px", height: "100%", boxSizing: "border-box" }}>
            <SectionTitle command={command} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 1120 }}>
              <Img src={asset(image)} style={{ width: approach ? 780 : 780, maxHeight: 980, objectFit: "contain" }} />
            </div>
          </div>
        </Browser>
      </div>
      <div style={{ position: "absolute", bottom: 105, textAlign: "center", ...fadeUp(f, 18, 24) }}>
        <Eyebrow>{approach ? "03 / THE PROCESS" : "02 / THE PERSON BEHIND THE CODE"}</Eyebrow>
        <div style={{ marginTop: 12, fontSize: 26, color: "#dbe6ff" }}>{approach ? "Research. Design. Build. Audit. Validate. Improve." : "A little context before the work begins."}</div>
      </div>
    </AbsoluteFill>
  );
};

const Projects: React.FC = () => {
  const f = useCurrentFrame();
  const cards = ["cards/aisa-oopsallbugs.svg", "cards/usahaos.svg", "cards/larashris.svg", "cards/relache-app.svg", "cards/livexis.svg", "cards/nospotify-hybrid.svg"];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(140deg, #0b1020, #121d39)", alignItems: "center", justifyContent: "center" }}>
      <Glow x="78%" y="48%" color="rgba(124,58,237,.18)" size={650} />
      <div style={{ position: "relative", ...fadeUp(f, 0, 26) }}>
        <Browser>
          <div style={{ padding: "58px 52px" }}>
            <SectionTitle command="projects" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 20 }}>
              {cards.map((card, i) => (
                <div key={card} style={{ gridColumn: "span 1", borderRadius: 12, overflow: "hidden", opacity: interpolate(f, [i * 14, i * 14 + 30], [0, 1], { extrapolateRight: "clamp" }), transform: `translateY(${interpolate(f, [i * 14, i * 14 + 30], [22, 0], { extrapolateRight: "clamp" })}px)` }}>
                  <Img src={asset(card)} style={{ width: "100%", height: 145, objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>
        </Browser>
      </div>
      <div style={{ position: "absolute", bottom: 105, textAlign: "center", ...fadeUp(f, 26, 24) }}>
        <Eyebrow>04 / SELECTED WORK</Eyebrow>
        <div style={{ marginTop: 10, fontSize: 26, color: "#dbe6ff" }}>Ideas turned into tools, products, and experiments.</div>
      </div>
    </AbsoluteFill>
  );
};

const Tech: React.FC = () => {
  const f = useCurrentFrame();
  const drift = interpolate(f, [0, 260], [0, -45], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #0b1020, #111d3a)", alignItems: "center", justifyContent: "center" }}>
      <Glow x="50%" y="48%" color="rgba(37,99,235,.22)" size={850} />
      <div style={{ position: "relative", ...fadeUp(f, 0, 28) }}>
        <Browser>
          <div style={{ padding: "62px 52px" }}>
            <SectionTitle command="tech-tools" />
            <div style={{ marginTop: 20, overflow: "hidden", height: 1120, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ transform: `translateY(${drift}px) scale(1.0)`, width: "100%" }}>
                <Img src={asset("animated-stack.embedded.svg")} style={{ width: "100%", height: 1050, objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </Browser>
      </div>
      <div style={{ position: "absolute", bottom: 105, textAlign: "center", ...fadeUp(f, 22, 24) }}>
        <Eyebrow>05 / THE TOOLBOX</Eyebrow>
        <div style={{ marginTop: 10, fontSize: 26, color: "#dbe6ff" }}>A living collection of technologies and tools.</div>
      </div>
    </AbsoluteFill>
  );
};

const Closing: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 180], [1, 1.08], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, #1a2e60 0%, #0b1020 68%, #070b16 100%)", alignItems: "center", justifyContent: "center" }}>
      <Glow x="50%" y="48%" color="rgba(99,102,241,.26)" size={900} />
      <div style={{ transform: `scale(${zoom})`, textAlign: "center", position: "relative" }}>
        <div style={{ ...fadeUp(f, 0, 24) }}>
          <Img src={asset("footer-eof.svg")} style={{ width: 820, height: 300, objectFit: "contain" }} />
        </div>
        <div style={{ marginTop: 38, fontSize: 22, color: "#b9c8e8", letterSpacing: 2, ...fadeUp(f, 24, 26) }}>KEEP BUILDING · KEEP LEARNING · KEEP SHARING</div>
        <div style={{ marginTop: 30, fontSize: 26, fontWeight: 700, color: "#f3f6ff", ...fadeUp(f, 48, 28) }}>github.com/kiisafezone</div>
        <div style={{ margin: "38px auto 0", width: 190, height: 3, background: "linear-gradient(90deg, #2563eb, #8b5cf6)", borderRadius: 8 }} />
      </div>
    </AbsoluteFill>
  );
};

export const ReadmeShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const cuts = [180, 450, 690, 930, 1230, 1530];
  const transitionOpacity = Math.max(
    0,
    ...cuts.map((cut) =>
      interpolate(frame, [cut - 18, cut, cut + 18], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, fontFamily: "Inter, Arial, sans-serif", overflow: "hidden" }}>
      <Sequence from={0} durationInFrames={180}><Intro /></Sequence>
      <Sequence from={180} durationInFrames={270}><HeaderScene /></Sequence>
      <Sequence from={450} durationInFrames={240}><AboutApproach /></Sequence>
      <Sequence from={690} durationInFrames={240}><AboutApproach approach /></Sequence>
      <Sequence from={930} durationInFrames={300}><Projects /></Sequence>
      <Sequence from={1230} durationInFrames={300}><Tech /></Sequence>
      <Sequence from={1530} durationInFrames={270}><Closing /></Sequence>
      <AbsoluteFill style={{ backgroundColor: "#050816", opacity: transitionOpacity, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
