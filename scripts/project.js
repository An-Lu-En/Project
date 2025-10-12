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

// === Vacay Planner Interactive Script ===

// 1. Function: calculate trip length (for booking form)
function calculateTripDays(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const days = (end - start) / (1000 * 60 * 60 * 24);
  return days > 0 ? days : 0;
}

// 2. DOM Manipulation + Event Listener
const bookingForm = document.querySelector("form");
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const destination = document.querySelector("#destination").value;
  const checkin = document.querySelector("#checkin").value;
  const checkout = document.querySelector("#checkout").value;
  const guests = document.querySelector("#guests").value;

  // 3. Conditional Branching
  if (!destination || !checkin || !checkout || guests <= 0) {
    alert("Please fill in all required fields correctly!");
    return;
  }

  const tripDays = calculateTripDays(checkin, checkout);

  // 4. Object + Array Example
  const booking = {
    destination,
    guests,
    duration: tripDays,
    dateRange: [checkin, checkout],
  };

  // 5. Array method + Template Literal
  const tripDetails = `
    <h3>Booking Summary</h3>
    <p>Destination: ${booking.destination}</p>
    <p>Guests: ${booking.guests}</p>
    <p>Duration: ${booking.duration} days</p>
    <p>Dates: ${booking.dateRange.join(" → ")}</p>
  `;

  // 6. localStorage
  localStorage.setItem("latestBooking", JSON.stringify(booking));

  // Display confirmation dynamically
  const confirmation = document.createElement("div");
  confirmation.classList.add("confirmation");
  confirmation.innerHTML = tripDetails;
  document.body.appendChild(confirmation);

  // Reset form
  bookingForm.reset();
});

// === About Page Interactive Script ===
// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".features a img");

  // Add tooltip and hover glow per platform
  icons.forEach(icon => {
    const platform = icon.alt.replace("find us on ", "").trim();
    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip");
    tooltip.textContent = platform;
    icon.parentElement.appendChild(tooltip);

    icon.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateY(-10px)";
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translateY(0)";
    });
  });

  // Fade-in animation when section scrolls into view
  const featuresSection = document.querySelector(".about .features");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        featuresSection.classList.add("visible");
        observer.unobserve(featuresSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(featuresSection);
});