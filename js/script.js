// Variables Declarations
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let date = document.getElementById("date");
let length = document.getElementById("length");
let course = document.getElementById("course");
let teacher = document.getElementById("teacher");
let instruct = "Instructors";
let form = document.getElementById("form");
let container = document.querySelector(".container");

let certificate_no = "UC-3308c41b-93cb-485a-9ee3-450729f8ef73";

// Random Number Generation for Certificate Number & Reference Number
a = 400000; //Min value
b = 485000; //Max Value
let rand = a + (b - 1) * Math.random(); //Main Formula
let rand2 = Math.round(rand);

c = 30; //Min value
d = 90; //Max Value
let rand3 = c + (d - 1) * Math.random(); //Main Formula
let rand4 = Math.round(rand3);

e = 1; //Min value
f = 9; //Max Value
let rand5 = e + (f - 1) * Math.random(); //Main Formula
let rand6 = Math.round(rand5);

// Main Code Starts Here
let generate = document.getElementById("Generate");
generate.addEventListener("click", (e) => {
  e.preventDefault();
  let first_name = fname.value;
  let last_name = lname.value;
  let DateValue = date.value;
  let formattedDate = "";
  if (DateValue) {
    const dateObj = new Date(DateValue);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    formattedDate = dateObj.toLocaleDateString('en-US', options);
  }

  let c_length = length.value;
  let course_name = course.value.replace(/\n/g, "<br>");
  let instructor = teacher.value;

  if (
    first_name === "" ||
    last_name === "" ||
    DateValue === "" ||
    c_length === "" ||
    course_name === "" ||
    instructor === ""
  ) {
    alert("Input fields can't be empty.");
  } else {
    if (instructor.includes(",")) {
      instruct = "Instructors";
    }
    // Clear inputs
    fname.value = "";
    lname.value = "";
    course.value = "";
    date.value = "";
    teacher.value = "";
    length.value = "";

    form.style.display = "none";
    // container.style.backgroundColor = "white"; // Don't change container bg in dark mode
    container.style.height = "auto";

    let certificate = document.getElementById("certificate");
    certificate.style.backgroundColor = "#f8f9fb";
    certificate.style.display = "flex";

    // Using a remote URL for Udemy logo since local one was deleted and user requested original style
    certificate.innerHTML = `<div class="logo">
    <img id="udemy-logo" src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy Logo" style="width: 100px; height: auto;">
    <div class="right-side">
                      <div class="c-no">Certificate no: UC-3308c41b-93cb-485a-9ee3-${rand2}f8ef${rand4}</div>
                      <div class="c-url">Certificate url: ude.my/UC-3308c41b-93cb-485a-9ee3-${rand2}f8ef${rand4}</div>
                      <div class="ref-no">Reference Number: 000${rand6}</div>
                  </div>
  </div>
  <div class="content">
    <h3>CERTIFICATE OF COMPLETION</h3>
    <h1 id="course-name">${course_name}</h1>
    <h4>${instruct}&nbsp;<b>${instructor}</b></h4>
  </div>
  <div class="user">
    <h1 id="name">${first_name} ${last_name}</h1>
    <h4>Date &nbsp;<b>${formattedDate}</b></h4>
    <h4>Length &nbsp;<b>${c_length} total hours</b></h4>
  </div>
  `;
    // Show download/edit buttons
    const downloadContainer = document.querySelector(".download-container");
    if (downloadContainer) {
      downloadContainer.classList.add("active");
      downloadContainer.style.display = "flex"; // Force flex for desktop
    }

    // Scale after render
    setTimeout(scaleCertificate, 100);
  }
});

function scaleCertificate() {
  const wrapper = document.getElementById('certificate-wrapper');
  const certificate = document.getElementById('certificate');

  if (!wrapper || !certificate || certificate.style.display === 'none') return;

  // Reset transform to measure accurately
  certificate.style.transform = 'none';
  wrapper.style.height = 'auto';

  const containerWidth = wrapper.offsetWidth;
  const certificateWidth = 1280; // Fixed width from CSS

  // On desktop, we might not want to scale down if there's space, 
  // but if it's smaller than 1280, we must scale.
  if (containerWidth < certificateWidth) {
    const scale = containerWidth / certificateWidth;
    certificate.style.transform = `scale(${scale})`;
    certificate.style.transformOrigin = 'top left';

    // Set wrapper height to the SCALED height
    wrapper.style.height = `${certificate.scrollHeight * scale}px`;
    wrapper.style.marginBottom = '20px';
  } else {
    // If screen is large enough, just center it
    certificate.style.transform = 'none';
    certificate.style.margin = '0 auto';
    wrapper.style.height = 'auto';
  }
}

window.addEventListener('resize', scaleCertificate);

// Edit Details Functionality
const editBtn = document.getElementById("edit");
editBtn.addEventListener("click", () => {
  // Hide certificate
  let certificate = document.getElementById("certificate");
  certificate.style.display = "none";

  let wrapper = document.getElementById('certificate-wrapper');
  wrapper.style.height = '0';
  wrapper.style.marginBottom = '0';

  // Hide buttons
  const downloadContainer = document.querySelector(".download-container");
  downloadContainer.classList.remove("active");
  downloadContainer.style.display = "none";

  // Show form
  form.style.display = "grid"; // Restore grid layout
});

//Download PDF
let download = document.getElementById("download");
download.addEventListener("click", () => {
  let certificate = document.getElementById("certificate");

  // Trigger Confetti
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);

  // PREPARE FOR PDF GENERATION
  // 1. Store current transform styles
  const originalTransform = certificate.style.transform;
  const originalTransformOrigin = certificate.style.transformOrigin;
  const originalMargin = certificate.style.margin;

  // 2. Reset styles to ensure PDF is generated from full-size, unscaled element
  // We need the element to be visible and fully rendered at 1280px width
  certificate.style.transform = "none";
  certificate.style.margin = "0"; // Reset margin to avoid offsetting in PDF

  // Get exact dimensions of the certificate
  const certWidth = certificate.offsetWidth;
  const certHeight = certificate.offsetHeight;

  // 3. Generate PDF
  var opt = {
    margin: 0,
    filename: `Udemy-certificate.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 1, // Use 1:1 scale to avoid zooming/cropping issues
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
      windowWidth: certWidth, // Match window width to element width
      width: certWidth,
      height: certHeight
    },
    jsPDF: { unit: "px", format: [certWidth, certHeight], orientation: "landscape" }, // Exact match
  };

  html2pdf().set(opt).from(certificate).save().then(() => {
    // 4. Restore styles after generation
    certificate.style.transform = originalTransform;
    certificate.style.transformOrigin = originalTransformOrigin;
    certificate.style.margin = originalMargin;

    // Re-run scale to be safe
    scaleCertificate();
  });
});
