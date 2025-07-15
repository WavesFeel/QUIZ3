const img = document.querySelector(".content_games_img");
const menuItems = document.querySelectorAll(".lesson-list li");
const currentPage = window.location.pathname.split("/").pop();

// Получаем номер текущего урока
function getCurrentLessonNumber(page) {
  if (page === "index.html" || page === "2lesson.html") return 1;

  const match = page.match(/(?:2)?lesson(\d+)(?:-\d+)?\.html/);
  return match ? parseInt(match[1]) : null;
}

const currentLesson = getCurrentLessonNumber(currentPage);

// Подсветка активного пункта меню
menuItems.forEach(item => {
  const href = item.getAttribute("data-href");

  const hrefMatch = href.match(/(?:2)?lesson(\d+)/);
  const hrefLesson = hrefMatch ? parseInt(hrefMatch[1]) : null;

  if (hrefLesson && currentLesson && hrefLesson === currentLesson) {
    item.classList.add("active");
  } else if (href === currentPage) {
    item.classList.add("active");
  }

  item.addEventListener("click", () => {
    if (href) window.location.href = href;
  });
});

// Конфигурация каждого урока
const lessonConfig = {
  1: { count: 9, startsFrom: "index" },
  2: { count: 11, startsFrom: 1 },
  3: { count: 8, startsFrom: 1 },
  4: { count: 3, startsFrom: 1 },
  5: { count: 5, startsFrom: 1 },
  6: { count: 6, startsFrom: 1 }
};

// Переход по клику на изображение
if (img) {
  const matchLessonTask = currentPage.match(/(?:2)?lesson(\d+)-(\d+)\.html/);
  const matchOnlyLesson = currentPage.match(/(?:2)?lesson(\d+)\.html/);
  const isIndex = currentPage === "index.html" || currentPage === "2lesson.html";
  const isSixthClass = currentPage.startsWith("2");

  img.addEventListener("click", () => {
    let lesson = null;
    let task = null;

    if (isIndex) {
      lesson = 1;
      task = 1;
    } else if (matchOnlyLesson) {
      lesson = parseInt(matchOnlyLesson[1]);
      task = 1;
    } else if (matchLessonTask) {
      lesson = parseInt(matchLessonTask[1]);
      task = parseInt(matchLessonTask[2]);
    }

    const config = lessonConfig[lesson];
    if (!config) {
      alert("Урок не найден в конфигурации");
      return;
    }

    const nextTask = task + 1;

    const baseName = isSixthClass ? "2lesson" : "lesson";

    if (config.startsFrom === "index" && isIndex) {
      window.location.href = `${baseName}${lesson}-1.html`;
    } else if (nextTask <= config.count) {
      window.location.href = `${baseName}${lesson}-${nextTask}.html`;
    } else {
      const nextLesson = lesson + 1;
      const nextConfig = lessonConfig[nextLesson];
      if (nextConfig) {
        if (nextConfig.startsFrom === "index") {
          window.location.href = isSixthClass ? "2lesson.html" : "index.html";
        } else {
          window.location.href = `${baseName}${nextLesson}.html`;
        }
      } else {
        alert("Вы прошли все уроки!");
      }
    }
  });
}

// Переключение между классами
document.querySelectorAll(".switch-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-href");
    if (target) window.location.href = target;
  });
});

// Подсветка активной кнопки класса
const classButtons = document.querySelectorAll(".switch-btn");
classButtons.forEach(btn => btn.classList.remove("active"));

const is6class = currentPage.startsWith("2lesson") || currentPage === "2index.html";
const is5class = currentPage.startsWith("lesson") || currentPage === "index.html";

classButtons.forEach(btn => {
  const href = btn.getAttribute("data-href");
  if (is5class && href === "index.html") {
    btn.classList.add("active");
  } else if (is6class && href === "2lesson.html") {
    btn.classList.add("active");
  }
});
