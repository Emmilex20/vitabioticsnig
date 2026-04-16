import { ImageResponse } from "next/og";

export const alt = "Vitabiotics premium vitamins and wellness products";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #eef4ff 45%, #dbe8ff 100%)",
          color: "#0f172a",
          fontFamily: "Segoe UI, Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "28px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
                fontSize: "30px",
                fontWeight: 800,
                color: "#1d4ed8",
              }}
            >
              V
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#1d4ed8",
                }}
              >
                Vitabiotics
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "18px",
                  color: "#475569",
                }}
              >
                Premium health and wellness store
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "14px 22px",
              borderRadius: "999px",
              background: "#dbeafe",
              fontSize: "18px",
              fontWeight: 700,
              color: "#1d4ed8",
            }}
          >
            Vitamins / Supplements / Wellness
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Premium vitamins and wellness products designed for everyday health.
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#334155",
            }}
          >
            Shop trusted formulas for women, men, kids, pregnancy support, beauty,
            energy, immunity, and daily nutritional care.
          </div>
        </div>
      </div>
    ),
    size
  );
}
