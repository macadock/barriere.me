"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {PropsWithChildren} from "react";

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
