function openfeatures() {
  var allElems = document.querySelectorAll(".elem");

  var FullPage = document.querySelectorAll(".fullElem");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      FullPage[elem.id].style.display = "block"; 
    });
  });

  var FullelemPageBackBtn = document.querySelectorAll(".fullElem .back");
  FullelemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      FullPage[back.id].style.display = "none";
    });
  });
}
openfeatures();

function todoLoist() {
  var currentTask = []; 
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task List is Empty");
  }

  function renderTask() {

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    var allTask = document.querySelector(".alltask");
    var sum = "";

    currentTask.forEach(function (elem, idx) {
      

      sum =
        sum +
        `<div class="task">
                        <i class="ri-mark-pen-fill"></i>
                        <h5>${elem.task} <span class=${elem.imp}>IMP</span></h5>
                        <button id=${idx}>Mark as Completed</button>
        </div>`;
    });
    allTask.innerHTML = sum;

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask(); 
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addtask form");
  let taskinput = document.querySelector(".addtask form #taskinput");
  let taskdetailsinput = document.querySelector(".addtask form textarea");
  let taskcheckbox = document.querySelector(".addtask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskinput.value,
      details: taskdetailsinput.value,
      imp: taskcheckbox.checked,

    });
    renderTask();

    taskinput.value = "";
    taskdetailsinput.value = "";
    taskcheckbox.checked = false;
  });
}
todoLoist();

function dailyPlanner() {
  var dayplandata = JSON.parse(localStorage.getItem("dayplandata")) || {};
  var dayplanner = document.querySelector(".day-planner");
  var hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholedaysum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayplandata[idx] || "";
    wholedaysum =
      wholedaysum +
      `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${savedData}>
                 </div>`;
  });

  dayplanner.innerHTML = wholedaysum;
  var dayplannerinput = document.querySelectorAll(".day-planner input");

  dayplannerinput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayplandata[elem.id] = elem.value;
      localStorage.setItem("dayplandata", JSON.stringify(dayplandata)); //ab reload krne pe ui se data toh hat jayega par localstorage me pehle wla data stored rhega
    });
  });
}
dailyPlanner();

function pomodorotimer() {
  let totalseconds = 25 * 60;
  let timer = document.querySelector(".pomo-timer h2");
  var startbtn = document.querySelector(".pomo-timer .start-timer");
  var pausebtn = document.querySelector(".pomo-timer .pause-timer");
  var resetbtn = document.querySelector(".pomo-timer .Reset-timer");
  var session = document.querySelector(".TimerPage .session");

  var timerinterval = null;
  var isworksession = true;

  function updateTime() {
    let minutes = Math.floor(totalseconds / 60);
    let seconds = totalseconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerinterval);

    timerinterval = setInterval(() => {
      if (totalseconds > 0) {
        totalseconds--;
        updateTime();
      } else {
        clearInterval(timerinterval);

        if (isworksession) {
          isworksession = false;
          totalseconds = 5 * 60;
          session.innerHTML = "BREAK";
        } else {
          isworksession = true;
          totalseconds = 25 * 60;
          session.innerHTML = "WORK SESSION";
        }

        updateTime();
      }
    }, 1000); // ✅ 1 second
  }
  function pauseTimer() {
    clearInterval(timerinterval);
  }

  function ResetTimer() {
    clearInterval(timerinterval);
    isworksession = true;
    totalseconds = 25 * 60;
    session.innerHTML = "WORK SESSION";
    updateTime();
  }

  startbtn.addEventListener("click", startTimer);
  pausebtn.addEventListener("click", pauseTimer);
  resetbtn.addEventListener("click", ResetTimer);

  updateTime();
}
pomodorotimer();

function weatherfunctionality() {
  const apiKey = "ea6e5077763c48579e452809262202";
  const city = "London";
  var data = null;
  var temp = document.querySelector(".header2 h2");
  var condition = document.querySelector(".header2 h1");
  var humidity = document.querySelector(".header2 .humidity");

  async function weatherAPIcall() {
    var response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );
    var data = await response.json();

    temp.innerHTML = `${data.current.temp_c}°C`;
    condition.innerHTML = `${data.current.condition.text}`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  }
  weatherAPIcall();

  var header1Time = document.querySelector(".header1 h1");
  var header1date = document.querySelector(".header1 h2");

  function timeDate() {
    const alldaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNamesFull = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var date = new Date();
    var daysofWeek = alldaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var datetoday = date.getDate();
    var month = monthNamesFull[date.getMonth()];
    var year = date.getFullYear();
    header1Time.innerHTML = `${daysofWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}`;
    header1date.innerHTML = `${datetoday} ${month}, ${year}`;
  }
  setInterval(() => {
    timeDate();
  }, 1000);
}
weatherfunctionality();

function themeToggle() {
  const themes = [
    {
      name: "⚡ Electric Blue", 
      "--primary":       "#0d0f14",
      "--primary-soft":  "#161a24",
      "--sec":           "#f0f4ff",
      "--tri":           "#3d6bff",
      "--extra":         "#2952e3",
      "--text":          "#e8edf8",
      "--text-muted":    "#8892aa",
      "--accent-glow":   "rgba(61, 107, 255, 0.45)",
      "--danger":        "#ff4060",
      "--danger-glow":   "rgba(255, 64, 96, 0.4)",
      "--success":       "#22d3a5",
      "--border":        "rgba(255, 255, 255, 0.08)",
    },
    {
      name: "🌿 Emerald Dark",
      "--primary":       "#0a110e",
      "--primary-soft":  "#111c17",
      "--sec":           "#e8f5ee",
      "--tri":           "#00c97a",
      "--extra":         "#009e5f",
      "--text":          "#d4f0e0",
      "--text-muted":    "#6b9c7d",
      "--accent-glow":   "rgba(0, 201, 122, 0.45)",
      "--danger":        "#ff4060",
      "--danger-glow":   "rgba(255, 64, 96, 0.4)",
      "--success":       "#00ffaa",
      "--border":        "rgba(0, 201, 122, 0.15)",
    },
    {
      name: "🔥 Inferno",
      "--primary":       "#100806",
      "--primary-soft":  "#1c100a",
      "--sec":           "#fff4ee",
      "--tri":           "#ff6a00",
      "--extra":         "#cc4400",
      "--text":          "#ffe8d6",
      "--text-muted":    "#a06040",
      "--accent-glow":   "rgba(255, 106, 0, 0.45)",
      "--danger":        "#ff2060",
      "--danger-glow":   "rgba(255, 32, 96, 0.4)",
      "--success":       "#ffd700",
      "--border":        "rgba(255, 106, 0, 0.15)",
    },
    {
      name: "🌸 Sakura Light",
      "--primary":       "#fdf6f9",
      "--primary-soft":  "#f5e9f0",
      "--sec":           "#ffffff",
      "--tri":           "#d63a7a",
      "--extra":         "#a8245c",
      "--text":          "#2d1a24",
      "--text-muted":    "#9a6070",
      "--accent-glow":   "rgba(214, 58, 122, 0.3)",
      "--danger":        "#e02020",
      "--danger-glow":   "rgba(224, 32, 32, 0.3)",
      "--success":       "#2db87a",
      "--border":        "rgba(214, 58, 122, 0.18)",
    },
    {
      name: "🪐 Cosmic Purple",
      "--primary":       "#0b0812",
      "--primary-soft":  "#14102a",
      "--sec":           "#f3f0ff",
      "--tri":           "#9b5cf6",
      "--extra":         "#7c3aed",
      "--text":          "#ede8ff",
      "--text-muted":    "#8876aa",
      "--accent-glow":   "rgba(155, 92, 246, 0.45)",
      "--danger":        "#ff4060",
      "--danger-glow":   "rgba(255, 64, 96, 0.4)",
      "--success":       "#22d3a5",
      "--border":        "rgba(155, 92, 246, 0.15)",
    },
  ];
  let currentThemeIdx = parseInt(localStorage.getItem("themeIdx")) || 0;

  function applyTheme(idx) {
    const theme = themes[idx];
    const root = document.documentElement; 

    Object.keys(theme).forEach(function (key) {
      if (key !== "name") {
        root.style.setProperty(key, theme[key]);
    
      }
    });
    var themeLabel = document.querySelector(".theme h4");
    if (themeLabel) themeLabel.innerHTML = theme.name;
    localStorage.setItem("themeIdx", idx);
  }

  applyTheme(currentThemeIdx);
  var themeBtn = document.querySelector(".theme");
  themeBtn.addEventListener("click", function () {
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    applyTheme(currentThemeIdx);
  });
}
themeToggle();

