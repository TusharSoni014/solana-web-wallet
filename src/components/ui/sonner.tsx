"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group border bg-zinc-900/95 text-zinc-200 border-zinc-800/80 shadow-2xl backdrop-blur rounded-xl",
          title: "text-[13px] font-semibold",
          description: "text-[12px] text-zinc-400",
          actionButton:
            "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:brightness-110",
          cancelButton:
            "bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700",
          icon: "[&>svg]:text-cyan-400",
          success:
            "border-cyan-500/30 bg-cyan-500/5 [--btn-bg:theme(colors.cyan.600)]",
          error:
            "border-red-500/30 bg-red-500/5 [--btn-bg:theme(colors.red.600)]",
          warning:
            "border-amber-500/30 bg-amber-500/5 [--btn-bg:theme(colors.amber.600)]",
          info: "border-blue-500/30 bg-blue-500/5 [--btn-bg:theme(colors.blue.600)]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
