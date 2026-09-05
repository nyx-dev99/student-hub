/* Student Profile module — vanilla JS prototype.
   All mock data lives in the DATA blocks below and can be swapped for
   real backend/database data later without touching the render logic. */
(function () {
  "use strict";

  /* ============ MOCK DATA (replace with backend data later) ============ */
  const MOCK_STUDENT = {
    name: "Nishtha Dhiman",
    course: "B.Sc. (Hons.) Physics",
    roll: "12345",
    mobile: "+91 98765 43210",
    email: "student@example.com",
  };

  const MOCK_ATTENDANCE = {
    overall: 82,
    attended: 41,
    missed: 9,
    total: 50,
  };

  const MOCK_SUBJECTS = [
    { name: "Physics", percentage: 88 },
    { name: "Mathematics", percentage: 76 },
    { name: "Computer Science", percentage: 91 },
    { name: "Electronics", percentage: 79 },
  ];

  const MOCK_ACTIVITY = [
    { title: "Physics Class", when: "12 Mar 2026, 09:00 AM", status: "Present" },
    { title: "Mathematics Class", when: "11 Mar 2026, 11:00 AM", status: "Present" },
    { title: "Computer Science Class", when: "10 Mar 2026, 02:00 PM", status: "Missed" },
    { title: "Mathematics Test", when: "08 Mar 2026, 10:30 AM", status: "Missed" },
  ];

  const DEFAULT_NOTIFICATIONS = { email: true };

  /* Attendance status thresholds — easy to modify later */
  const THRESHOLDS = { good: 75, warning: 60 };

  const STORAGE_KEYS = {
    profile: "sp_student_profile",
    notifications: "sp_notification_settings",
  };

  /* ============ Storage helpers ============ */
  function readStore(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? Object.assign({}, fallback, JSON.parse(raw)) : Object.assign({}, fallback);
    } catch (e) {
      return Object.assign({}, fallback);
    }
  }
  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable — prototype still works in-memory */
    }
  }

  /* ============ State ============ */
  let student = readStore(STORAGE_KEYS.profile, MOCK_STUDENT);
  let notifications = readStore(STORAGE_KEYS.notifications, DEFAULT_NOTIFICATIONS);

  const $ = (id) => document.getElementById(id);

  /* ============ Rendering ============ */
  function initials(name) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join("");
  }

  function renderProfile() {
    $("sp-name").textContent = student.name;
    $("sp-course").textContent = student.course;
    $("sp-roll").textContent = student.roll;
    $("sp-mobile").textContent = student.mobile;
    $("sp-email").textContent = student.email;
    $("sp-avatar").textContent = initials(student.name) || "ST";
  }

  function renderAttendance(data) {
    $("sp-overall").textContent = data.overall + "%";
    $("sp-overall-stat").textContent = data.overall + "%";
    $("sp-attended").textContent = data.attended;
    $("sp-missed").textContent = data.missed;
    $("sp-total").textContent = data.total;
    const ring = $("sp-ring");
    ring.style.setProperty("--value", String(data.overall));
    ring.setAttribute("aria-label", "Overall attendance " + data.overall + " percent");
  }

  function statusFor(pct) {
    if (pct >= THRESHOLDS.good) return { key: "good", label: "Good" };
    if (pct >= THRESHOLDS.warning) return { key: "warning", label: "Warning" };
    return { key: "low", label: "Low" };
  }

  function renderSubjects(subjects) {
    const list = $("sp-subject-list");
    list.innerHTML = "";
    subjects.forEach(function (s) {
      const st = statusFor(s.percentage);
      const li = document.createElement("li");
      li.className = "sp-subject";

      const head = document.createElement("div");
      head.className = "sp-subject-head";

      const name = document.createElement("span");
      name.className = "sp-subject-name";
      name.textContent = s.name;

      const right = document.createElement("span");
      right.className = "sp-subject-head-right";
      const pct = document.createElement("span");
      pct.className = "sp-subject-pct";
      pct.textContent = s.percentage + "%  ";
      const tag = document.createElement("span");
      tag.className = "sp-tag sp-tag-" + st.key;
      tag.textContent = st.label;
      right.appendChild(pct);
      right.appendChild(tag);

      head.appendChild(name);
      head.appendChild(right);

      const bar = document.createElement("div");
      bar.className = "sp-bar sp-bar-" + st.key;
      const fill = document.createElement("span");
      fill.style.width = s.percentage + "%";
      bar.appendChild(fill);

      li.appendChild(head);
      li.appendChild(bar);
      list.appendChild(li);
    });
  }

  function renderActivity(items) {
    const list = $("sp-activity-list");
    list.innerHTML = "";
    items.forEach(function (a) {
      const isPresent = a.status === "Present";
      const li = document.createElement("li");
      li.className = isPresent ? "sp-activity-present" : "sp-activity-missed";

      const main = document.createElement("div");
      main.className = "sp-activity-main";
      const title = document.createElement("span");
      title.className = "sp-activity-name";
      title.textContent = a.title;
      const when = document.createElement("span");
      when.className = "sp-activity-time";
      when.textContent = a.when;
      main.appendChild(title);
      main.appendChild(when);

      const status = document.createElement("span");
      status.className = "sp-activity-status " + (isPresent ? "present" : "missed");
      status.textContent = a.status;

      li.appendChild(main);
      li.appendChild(status);
      list.appendChild(li);
    });
  }

  function renderPreview() {
    const missed = MOCK_ACTIVITY.find(function (a) { return a.status === "Missed"; }) || MOCK_ACTIVITY[0];
    $("sp-mail-msg").textContent =
      "You missed your scheduled " + missed.title.replace(/ Class| Test/, "") +
      " class on " + missed.when + ".";
  }

  function renderNotifications() {
    const on = !!notifications.email;
    $("sp-notify-toggle").checked = on;
    const status = $("sp-notify-status");
    status.textContent = on
      ? "Email notifications are ON. You will be emailed when you miss a class or test."
      : "Email notifications are OFF. You will not receive missed-class emails. Turn the toggle on to enable them again.";
    status.className = "sp-status " + (on ? "sp-status-on" : "sp-status-off");
    $("sp-unsubscribe").disabled = !on;
  }

  /* ============ Toast ============ */
  let toastTimer = null;
  function showToast(message) {
    const toast = $("sp-toast");
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 2800);
  }

  /* ============ Edit profile modal ============ */
  const modal = $("sp-modal");
  const form = $("sp-form");
  const fields = {
    name: $("sp-in-name"),
    course: $("sp-in-course"),
    roll: $("sp-in-roll"),
    mobile: $("sp-in-mobile"),
    email: $("sp-in-email"),
  };

  function openModal() {
    Object.keys(fields).forEach(function (k) { fields[k].value = student[k]; });
    clearErrors();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    fields.name.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    $("sp-edit-btn").focus();
  }
  function clearErrors() {
    form.querySelectorAll(".sp-error").forEach(function (el) { el.textContent = ""; });
    Object.keys(fields).forEach(function (k) { fields[k].classList.remove("sp-invalid"); });
  }
  function setError(key, message) {
    const el = form.querySelector('[data-error-for="' + key + '"]');
    if (el) el.textContent = message;
    fields[key].classList.add("sp-invalid");
  }

  function validate(values) {
    const errors = {};
    if (!values.name) errors.name = "Name is required.";
    else if (values.name.length > 60) errors.name = "Name must be under 60 characters.";
    if (!values.course) errors.course = "Course is required.";
    if (!values.roll) errors.roll = "Roll number is required.";
    if (!values.mobile) errors.mobile = "Mobile number is required.";
    else if (!/^[+]?[\d\s-]{7,18}$/.test(values.mobile)) errors.mobile = "Enter a valid mobile number.";
    if (!values.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = "Enter a valid email address.";
    return errors;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    const values = {};
    Object.keys(fields).forEach(function (k) { values[k] = fields[k].value.trim(); });
    const errors = validate(values);
    const keys = Object.keys(errors);
    if (keys.length) {
      keys.forEach(function (k) { setError(k, errors[k]); });
      fields[keys[0]].focus();
      return;
    }
    student = values;
    writeStore(STORAGE_KEYS.profile, student);
    renderProfile();
    closeModal();
    showToast("Profile updated successfully.");
  });

  $("sp-edit-btn").addEventListener("click", openModal);
  $("sp-cancel").addEventListener("click", closeModal);
  modal.querySelector("[data-sp-close]").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ============ Notification handlers ============ */
  $("sp-notify-toggle").addEventListener("change", function (e) {
    notifications.email = e.target.checked;
    writeStore(STORAGE_KEYS.notifications, notifications);
    renderNotifications();
    showToast(notifications.email ? "Email notifications enabled." : "Email notifications disabled.");
  });

  $("sp-unsubscribe").addEventListener("click", function () {
    // Only disables emails — student profile and attendance data are untouched.
    notifications.email = false;
    writeStore(STORAGE_KEYS.notifications, notifications);
    renderNotifications();
    showToast("Unsubscribed. Your data is unchanged.");
  });

  /* ============ Init ============ */
  renderProfile();
  renderAttendance(MOCK_ATTENDANCE);
  renderSubjects(MOCK_SUBJECTS);
  renderActivity(MOCK_ACTIVITY);
  renderPreview();
  renderNotifications();
})();
