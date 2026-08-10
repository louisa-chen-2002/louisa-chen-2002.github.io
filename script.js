const navLinks = document.querySelectorAll("[data-nav-target]");
const panels = document.querySelectorAll("[data-panel]");
const subnavLinks = document.querySelectorAll("[data-subnav-target]");
const subpanels = document.querySelectorAll("[data-subpanel]");
const storyTabs = document.querySelectorAll(".story-tab");
const storyPanels = document.querySelectorAll(".story-panel");
const journalShell = document.querySelector(".journal-shell");
const journalScroll = document.querySelector(".journal-scroll");
const journalIndex = document.querySelector("[data-journal-index]");
const journalLinks = document.querySelectorAll("[data-entry-target]");
const journalPosts = document.querySelectorAll("[data-entry-post]");
const journalBackLinks = document.querySelectorAll("[data-entry-back]");

function showPanel(panelId) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.navTarget === panelId;
    if (link.classList.contains("nav-link")) {
      link.classList.toggle("active", isActive);
    }
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === panelId;
    panel.classList.toggle("active", isActive);
    if (isActive) {
      panel.scrollTop = 0;
    }
  });

  document.body.classList.toggle("more-about-active", panelId === "more-about");
}

function showSubpanel(subpanelId) {
  subnavLinks.forEach((link) => {
    const isActive = link.dataset.subnavTarget === subpanelId;
    link.classList.toggle("active", isActive);
  });

  subpanels.forEach((panel) => {
    const isActive = panel.dataset.subpanel === subpanelId;
    panel.classList.toggle("active", isActive);
  });
}

function setActiveStory(storyId) {
  storyTabs.forEach((tab) => {
    const isActive = tab.dataset.story === storyId;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  storyPanels.forEach((panel) => {
    const isActive = panel.dataset.storyPanel === storyId;
    panel.classList.toggle("active", isActive);
  });
}

function showJournalIndex() {
  if (journalShell) {
    journalShell.classList.remove("reading-post");
  }

  if (journalIndex) {
    journalIndex.classList.add("active");
  }

  journalPosts.forEach((post) => {
    post.classList.remove("active");
  });

  if (journalScroll) {
    journalScroll.scrollTop = 0;
  }
}

function showJournalPost(postId) {
  if (journalShell) {
    journalShell.classList.add("reading-post");
  }

  if (journalIndex) {
    journalIndex.classList.remove("active");
  }

  journalPosts.forEach((post) => {
    const isActive = post.dataset.entryPost === postId;
    post.classList.toggle("active", isActive);
  });

  if (journalScroll) {
    journalScroll.scrollTop = 0;
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const panelId = link.dataset.navTarget;
    if (!panelId) {
      return;
    }

    event.preventDefault();
    showPanel(panelId);
    if (panelId !== "more-about") {
      showJournalIndex();
    }
  });
});

subnavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showSubpanel(link.dataset.subnavTarget);
  });
});

storyTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveStory(tab.dataset.story);
  });
});

journalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showJournalPost(link.dataset.entryTarget);
  });
});

journalBackLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showJournalIndex();
  });
});
