(() => {
  const courseDetails = Array.from(document.querySelectorAll(".learning-course-details"));

  if (!courseDetails.length || typeof HTMLDialogElement === "undefined") {
    return;
  }

  const isHungarian = document.documentElement.lang.toLowerCase().startsWith("hu");
  const dialog = document.createElement("dialog");
  dialog.className = "learning-course-modal";
  dialog.setAttribute("aria-labelledby", "learning-course-modal-title");

  const panel = document.createElement("div");
  panel.className = "learning-course-modal-panel";

  const header = document.createElement("div");
  header.className = "learning-course-modal-header";

  const heading = document.createElement("div");
  heading.className = "learning-course-modal-heading";

  const label = document.createElement("p");
  label.className = "learning-course-modal-label";

  const title = document.createElement("h2");
  title.className = "learning-course-modal-title";
  title.id = "learning-course-modal-title";

  const closeButton = document.createElement("button");
  closeButton.className = "learning-course-modal-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", isHungarian ? "Bezárás" : "Close");
  closeButton.textContent = "×";

  const scrollArea = document.createElement("div");
  scrollArea.className = "learning-course-modal-scroll";

  heading.append(label, title);
  header.append(heading, closeButton);
  panel.append(header, scrollArea);
  dialog.append(panel);
  document.body.append(dialog);

  let activeTrigger = null;

  const closeModal = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  const openModal = (details, trigger) => {
    const cardTitle = details.closest(".learning-card")?.querySelector("h3");
    const courseList = details.querySelector(".learning-course-list");

    if (!courseList) {
      return;
    }

    activeTrigger = trigger;
    label.textContent = trigger.textContent.trim();
    title.textContent = cardTitle?.textContent.trim() || trigger.textContent.trim();
    scrollArea.replaceChildren(courseList.cloneNode(true));

    document.body.classList.add("learning-course-modal-open");
    dialog.showModal();
    closeButton.focus();
  };

  courseDetails.forEach((details) => {
    const trigger = details.querySelector("summary");

    if (!trigger) {
      return;
    }

    trigger.setAttribute("aria-haspopup", "dialog");

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      details.open = false;
      openModal(details, trigger);
    });
  });

  closeButton.addEventListener("click", closeModal);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeModal();
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("learning-course-modal-open");

    if (activeTrigger) {
      activeTrigger.focus();
      activeTrigger = null;
    }
  });
})();
