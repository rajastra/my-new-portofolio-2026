import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { routing, isLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getContent(isLocale(locale) ? locale : "en");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#F2F4F3",
          position: "relative",
          padding: "80px 100px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 12,
            backgroundColor: "#0F5C4D",
          }}
        />
        <div
          style={{
            fontSize: 36,
            color: "#16202B",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          {content.profile.name}
        </div>
        <div
          style={{
            fontSize: 56,
            color: "#16202B",
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {content.profile.headline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
