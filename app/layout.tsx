import type { Metadata } from "next";
import { BackgroundMusicProvider } from "@/utils/useBackgroundMusic";

export const metadata: Metadata = {
  title: "Анастасия - Наша история любви 💕",
  description: "Милый интерактивный timeline нашей прекрасной истории",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <BackgroundMusicProvider>{children}</BackgroundMusicProvider>
      </body>
    </html>
  );
}
