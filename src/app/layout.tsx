import "./globals.css";
import { Metadata } from "next";
import { DEFAULT_METADATA } from "@/utils/config";
import { GoogleTagManager } from "@next/third-parties/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";


export const metadata: Metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script>0</script>
        <GoogleTagManager gtmId="G-JBE3H2HL25" />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
