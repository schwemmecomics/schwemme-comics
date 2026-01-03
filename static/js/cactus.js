/* Cactus Chat Client - Official Source */
const initComments = (config) => {
  const node = config.node;
  const serverUrl = config.serverUrl || "https://matrix.cactus.chat:8448";
  const siteName = config.siteName;
  const section = config.defaultSection || "default";

  if (!siteName) {
    console.error("Cactus Chat: siteName is required");
    return;
  }

  const iframe = document.createElement("iframe");
  const params = new URLSearchParams({
    serverUrl: serverUrl,
    siteName: siteName,
    section: section,
  });

  iframe.src = `https://cactus.chat/display.html?${params.toString()}`;
  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.className = "cactus-iframe";

  node.innerHTML = "";
  node.appendChild(iframe);

  window.addEventListener("message", (event) => {
    if (event.origin === "https://cactus.chat" && event.data.type === "setHeight") {
      iframe.style.height = event.data.height + "px";
    }
  });
};
