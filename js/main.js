// js/main.js  (basic JavaScript version)

document.addEventListener("DOMContentLoaded", function () {
  // === Calculator ===
  var INCH_TO_CM = 2.54;

  function getModelWidthIn(model) {
    // all sizes in inches
    if (model === "SB-1000") return 13.5;
    if (model === "SB-2000") return 14.2;
    if (model === "SB-3000") return 15.0;
    if (model === "SB-4000") return 17.8;
    return 0;
  }

  function getModelHeightIn(model) {
    if (model === "SB-1000") return 13.0;
    if (model === "SB-2000") return 14.6;
    if (model === "SB-3000") return 15.6;
    if (model === "SB-4000") return 18.3;
    return 0;
  }

  function toInches(value, units) {
    if (units === "cm") {
      return value / INCH_TO_CM;
    } else {
      return value;
    }
  }

  function fromInches(valueIn, units) {
    if (units === "cm") {
      return valueIn * INCH_TO_CM;
    } else {
      return valueIn;
    }
  }

  var calcBtn = document.getElementById("calcBtn");
  var resultDiv = document.getElementById("result");

  if (calcBtn && resultDiv) {
    calcBtn.addEventListener("click", function () {
      var wallWidthInput = document.getElementById("wallWidth");
      var wallHeightInput = document.getElementById("wallHeight");
      var unitsSelect = document.getElementById("units");
      var modelSelect = document.getElementById("model");

      var wallWidthRaw = parseFloat(wallWidthInput.value);
      var wallHeightRaw = parseFloat(wallHeightInput.value);
      var units = unitsSelect.value;
      var model = modelSelect.value;

      if (isNaN(wallWidthRaw) || isNaN(wallHeightRaw)) {
        resultDiv.innerHTML =
          "<p>Please enter numbers for wall width and height.</p>";
        return;
      }

      if (wallWidthRaw <= 0 || wallHeightRaw <= 0) {
        resultDiv.innerHTML =
          "<p>Wall width and height must be greater than zero.</p>";
        return;
      }

      // convert wall size to inches
      var wallWidthIn = toInches(wallWidthRaw, units);
      var wallHeightIn = toInches(wallHeightRaw, units);

      var modelWidthIn = getModelWidthIn(model);
      var modelHeightIn = getModelHeightIn(model);

      var freeWidthIn = wallWidthIn - modelWidthIn;
      var freeHeightIn = wallHeightIn - modelHeightIn;

      // convert back to user units
      var freeWidthUser = fromInches(freeWidthIn, units);
      var freeHeightUser = fromInches(freeHeightIn, units);

      var unitLabel = units === "cm" ? "cm" : "in";
      var message = "";

      if (freeWidthIn < 0 || freeHeightIn < 0) {
        message +=
          "<p><strong>Warning:</strong> The subwoofer is larger than the wall in at least one dimension.</p>";
      }

      message +=
        "<p><strong>Model:</strong> " +
        model +
        "</p>" +
        "<p><strong>Wall size:</strong> " +
        wallWidthRaw.toFixed(1) +
        " × " +
        wallHeightRaw.toFixed(1) +
        " " +
        unitLabel +
        "</p>" +
        "<p><strong>Approx. subwoofer size:</strong> " +
        fromInches(modelWidthIn, units).toFixed(1) +
        " × " +
        fromInches(modelHeightIn, units).toFixed(1) +
        " " +
        unitLabel +
        "</p>" +
        "<p><strong>Free space remaining:</strong></p>" +
        "<ul>" +
        "<li>Width: " +
        freeWidthUser.toFixed(1) +
        " " +
        unitLabel +
        "</li>" +
        "<li>Height: " +
        freeHeightUser.toFixed(1) +
        " " +
        unitLabel +
        "</li>" +
        "</ul>";

      resultDiv.innerHTML = message;
    });
  }

  // === Simple contact form demo ===
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thanks! This demo form does not actually send email.");
    });
  }
});
