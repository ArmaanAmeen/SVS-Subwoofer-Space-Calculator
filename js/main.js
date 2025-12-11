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
  function setVolumeLiters(cellId, w, h, d) {
    var volumeCubicIn = w * h * d;
    var liters = volumeCubicIn * 0.0163871;

    var cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = liters.toFixed(1) + " L";
    }
  }

  // Fill the volume column if we are on models.html
  setVolumeLiters("sb1000-vol", 13.5, 13.0, 14.6);
  setVolumeLiters("sb2000-vol", 14.2, 14.6, 15.7);
  setVolumeLiters("sb3000-vol", 15.0, 15.6, 17.8);
  setVolumeLiters("sb4000-vol", 17.8, 18.3, 21.9);
  var calcBtn = document.getElementById("calcBtn");
  var resultDiv = document.getElementById("result");

  if (resultDiv) {
    resultDiv.innerHTML = "<p>Enter your wall size and choose a model, then click <strong>Calculate</strong> to see the remaining space.</p>";
  }

  
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

  // === Contact form with basic validation ===
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameInput = document.getElementById("name");
      var emailInput = document.getElementById("email");
      var messageInput = document.getElementById("message");
      var messageBox = document.getElementById("contact-message");

      var nameValue = nameInput.value.trim();
      var emailValue = emailInput.value.trim();
      var messageValue = messageInput.value.trim();

      var errors = [];

      if (nameValue === "") {
        errors.push("Please enter your name.");
      }

      if (emailValue === "") {
        errors.push("Please enter your email address.");
      } else if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
        // very simple email check, good enough for this class
        errors.push("Please enter a valid email address.");
      }

      if (messageValue === "") {
        errors.push("Please enter a message.");
      }

      if (errors.length > 0) {
        // show errors
        messageBox.className = "form-message error";
        messageBox.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      } else {
        // show success and clear the form
        messageBox.className = "form-message success";
        messageBox.innerHTML = "<p>Thanks for your message! (This demo form does not actually send email.)</p>";

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      }
    });
  }
});

