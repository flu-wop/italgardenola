import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0efdd",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 500,
            color: "#332927",
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          I-tal&nbsp;<span style={{ color: "#1e7741" }}>Garden</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#3f413e",
            fontFamily: "system-ui, sans-serif",
            display: "flex",
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
