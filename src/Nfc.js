import React from "react";

const Nfc = () => {
  const ChromeSamples = {
    log: function () {
      var line = Array.prototype.slice
        .call(arguments)
        .map(function (argument) {
          return typeof argument === "string"
            ? argument
            : JSON.stringify(argument);
        })
        .join(" ");

      document.querySelector("#log").textContent += line + "\n";
    },

    setStatus: function (status) {
      document.querySelector("#status").textContent = status;
    },

    setContent: function (newContent) {
      var content = document.querySelector("#content");
      while (content.hasChildNodes()) {
        content.removeChild(content.lastChild);
      }
      content.appendChild(newContent);
    },
  };

  log = ChromeSamples.log;

  if (!("NDEFReader" in window))
    ChromeSamples.setStatus("Web NFC is not available. Use Chrome on Android.");

  scanButton.addEventListener("click", async () => {
    log("User clicked scan button");

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        log("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);
      });
    } catch (error) {
      log("Argh! " + error);
    }
  });
  return (
    <div id="output" class="output">
      <div id="content"></div>
      <div id="status"></div>
      <pre id="log"></pre>
    </div>
  );
};

export default Nfc;
