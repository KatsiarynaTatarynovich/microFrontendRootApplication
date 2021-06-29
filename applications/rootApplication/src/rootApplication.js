import { registerApplication, start } from 'single-spa';

registerApplication(
  'application-one',
  () => import('applicationOne/ApplicationOne'),
  pathPrefix('/applicationOne')
);

registerApplication(
  'application-two',
  () => import('applicationTwo/ApplicationTwo'),
  pathPrefix('/applicationTwo')
);

start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}
