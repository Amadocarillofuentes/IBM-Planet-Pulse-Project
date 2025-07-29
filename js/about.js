const images = document.querySelectorAll(".partner-logos span ");

images.forEach((img) => {
  setInterval(() => {
    img.classList.add("wave");
  }, 3000);
  setInterval(() => {
    img.classList.remove("wave");
  }, 4000);
});

//copy link
function copyLinkText(container) {
  const link = container.querySelector("a");
  const textToCopy = link ? link.innerText : "";

  if (textToCopy) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Copied:", textToCopy);
        // Optional feedback
        container.style.backgroundColor = "#d0f0ff";
        setTimeout(() => {
          container.style.backgroundColor = "";
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }
}

// donation system
function submitDonation() {
  const amount = document.getElementById("donationAmount").value;
  const popup = document.getElementById("successMessage");

  if (amount && parseFloat(amount) > 0) {
    popup.style.opacity = 1;
    setTimeout(() => {
      popup.style.opacity = 0;
      document.getElementById("donationAmount").value = "";
    }, 3000);
  } else {
    alert("Please enter a valid amount.");
  }
}
