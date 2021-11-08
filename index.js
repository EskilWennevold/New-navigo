import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    renderText,
    adjustForMissingHash, loadTemplateFromDom, renderTemplate, loadTemplate,
} from "./utils.js"

import {loadJoke} from "./pages/joke/joke.js"
import {showQueryParameter} from "./pages/products/products.js"

window.addEventListener("load", async () => {
  const homeTemplate = await loadTemplate("./pages/home/home.html")
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const productsTemplate = await loadTemplate("./pages/products/products.html")
    const jokeTemplate = await loadTemplate("./pages/joke/joke.html")
  const router = new Navigo("/", { hash: true });
  adjustForMissingHash()
  router
    .on({
      "/": () => renderTemplate(homeTemplate, "content"),
      "/about": () => renderTemplate(templateAbout, "content"),
      "/products": (match) => {
        renderTemplate(productsTemplate, "content")
          showQueryParameter(match)
      },
      "/joke": () => {
          renderTemplate(jokeTemplate,"content")
            loadJoke()
      },
      "/product/:id": (match) => {
        renderText(`Product ID: ${match.data.id}`, "content")
      },
      "/showMatch": (match) => renderText(`<pre>${JSON.stringify(match, null, 2)}</pre>`, "content")
    })
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
});


window.onerror = (e) => alert(e)