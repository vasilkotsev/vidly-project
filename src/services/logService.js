// import * as Sentry from "@sentry/react";

function init() {
  // Sentry.init({
  //   dsn: "https://c38b715911b6493b8734185f1be5c70f@o1047272.ingest.sentry.io/6024364"
  // });
}

function log(error) {
  console.error("Грешка:", error);
  // Sentry.captureException(error);
}

export default { init, log };
