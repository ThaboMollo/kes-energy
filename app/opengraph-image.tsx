import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: solar panels and backup power in North West`;
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
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #121d4f 0%, #1e2f78 60%, #2a3d8f 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "#ffc81f",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800, fontStyle: "italic" }}>
          KES <span style={{ color: "#ff6b5f", marginLeft: 12 }}>energy</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.05, maxWidth: 860 }}>
            Solar power for homes &amp; businesses in North West
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#ffd84d" }}>
            {site.taglines.primary}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
