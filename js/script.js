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
    document.getElementById("download").style.display = "block";
  }
});

//Download PDF

let download = document.getElementById("download");
download.addEventListener("click", () => {
  // Trigger Confetti
  var duration = 5 * 1000;
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
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);

  var opt = {
    margin: 1,
    filename: `Udemy-certificate.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "px", format: "c2", orientation: "landscape" },
  };

  html2pdf().set(opt).from(certificate).save();
});
