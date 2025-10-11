// getdates.js

// Set current year dynamically
const yearSpan = document.getElementById("currentyear");
const today = new Date();
yearSpan.textContent = today.getFullYear();

// Set last modified date dynamically
const lastModifiedParagraphs = document.querySelectorAll("footer p");
if (lastModifiedParagraphs.length > 1) {
    lastModifiedParagraphs[1].textContent = "Last Modified: " + document.lastModified;
    
  // alert("This page has changed!");
}