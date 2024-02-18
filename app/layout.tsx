// 'use client'
import type { Metadata } from "next";
// import StyledComponentsRegistry from './lib/registry'
// import GlobalStyles from "./styles/GlobalStyles";
// import { ThemeProvider } from 'styled-components';
// import theme from './styles/theme';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <StyledComponentsRegistry> */}
          {/* <GlobalStyles /> */}
          {/* <ThemeProvider theme={theme}> */}
            {children}
          {/* </ThemeProvider> */}
        {/* </StyledComponentsRegistry> */}
      </body>
    </html>
  );
}
