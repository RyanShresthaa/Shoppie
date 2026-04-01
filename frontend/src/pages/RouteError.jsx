import React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let description = "An unexpected error occurred while loading this page.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description = error?.data?.message || description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-lg border bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-red-700">{title}</h1>
        <p className="mt-2 text-sm text-neutral-600">{description}</p>
        <Link
          to="/"
          className="inline-block mt-4 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default RouteError;
