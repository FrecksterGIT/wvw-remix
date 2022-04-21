import {
  type LinksFunction,
  type MetaFunction,
  type ErrorBoundaryComponent,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", href: "/_static/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Open+Sans:400,600",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "LivingSpace Potsdam",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="font-roboto h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-white font-sans text-base font-normal">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return <div>{error.message}</div>;
};
