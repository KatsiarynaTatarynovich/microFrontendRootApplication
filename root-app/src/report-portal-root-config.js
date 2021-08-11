import getCommonImages from "../utils/getCommonImages";
import { registerApplication, start } from "single-spa";

fetch(
  "https://micro-frontend-import-map-23rcv2it2-katsiarynatatarynovich.vercel.app/importmap.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const applications = Object.keys(data.imports);

    applications.forEach((application) => {
      const path = application.split("/")[1];

      registerApplication({
        name: application,
        app: () => System.import(application),
        activeWhen: pathPrefix(`/${path}`),
        customProps() {
          return {
            getCommonImages,
          };
        },
      });
    });
  });

registerApplication({
  name: "@qa-space/application-three",
  app: () => System.import("@qa-space/application-three"),
  activeWhen: pathPrefix("/application-three"),
  customProps() {
    return {
      getCommonImages,
    };
  },
});

start({
  urlRerouteOnly: true,
});

function pathPrefix(prefix) {
  return function (location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
