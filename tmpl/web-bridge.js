import { MaplatApp } from "../src";
import "../less/core.less"

const Maplat = window.Maplat = {};
console.log("Maplat");

Maplat.createObject = option => new Promise((resolve => {
  const app = new MaplatApp(option);
  app.waitReady.then(() => {
    resolve(app);
  });
}));
