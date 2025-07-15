const img = document.querySelector(".content_games_img");
const menuItems = document.querySelectorAll(".lesson-list li");
const currentPage = window.location.pathname.split("/").pop();

// Подсветка активного пункта меню
menuItems.forEach(item => {
  const href = item.getAttribute("data-href");

  // Выделяем номер урока из href
  const hrefLessonMatch = href.match(/lesson(\d+)/);
  const currentLessonMatch =
    currentPage.match(/lesson(\d+)(-\d+)?\.html/) ||
    (currentPage === "index.html" ? [null, "1"] : null) ||
    (currentPage === "2lesson.html" ? [null, "1"] : null);


  if (hrefLessonMatch && currentLessonMatch) {
    const hrefLesson = parseInt(hrefLessonMatch[1]);
    const currentLesson = parseInt(currentLessonMatch[1]);

    if (hrefLesson === currentLesson) {
      item.classList.add("active");
    }
  } else if (href === currentPage) {
    // Например, index.html — Введение
    item.classList.add("active");
  }

  item.addEventListener("click", () => {
    if (href) window.location.href = href;
  });
});


// Конфигурация 6 класса
const lessonConfig = {
  1: { count: 8 },
  2: { count: 9 },
  3: { count: 9 },
  4: { count: 10 },
  5: { count: 10 },
  6: { count: 11 }
};

if (img) {
  const isLesson1Start = currentPage === "2lesson.html"; // <--- вот это новинка
  const matchLessonTask = currentPage.match(/2lesson(\d+)-(\d+)\.html$/);
  const matchOnlyLesson = currentPage.match(/2lesson(\d+)\.html$/);

  let lesson = null;
  let task = null;

  if (isLesson1Start) {
    lesson = 1;
    task = 1;
  } else if (matchLessonTask) {
    lesson = parseInt(matchLessonTask[1]);
    task = parseInt(matchLessonTask[2]);
  } else if (matchOnlyLesson) {
    lesson = parseInt(matchOnlyLesson[1]);
    task = 1;
  }

  console.log("currentPage:", currentPage);
  console.log("lesson:", lesson, "task:", task);

  img.addEventListener("click", () => {
    const config = lessonConfig[lesson];
    if (!config) {
      alert("Урок не найден в конфигурации");
      return;
    }

    const nextTask = task + 1;

    if (nextTask <= config.count) {
      window.location.href = `2lesson${lesson}-${nextTask}.html`;
    } else {
      const nextLesson = lesson + 1;
      const nextConfig = lessonConfig[nextLesson];

      if (nextConfig) {
        window.location.href = `2lesson${nextLesson}.html`;
      } else {
        alert("Вы прошли все уроки 6 класса!");
      }
    }
  });
}

// Кнопки переключения классов
document.querySelectorAll(".switch-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-href");
    if (target) {
      window.location.href = target;
    }
  });
});

// Выделение активной кнопки класса
const classButtons = document.querySelectorAll(".switch-btn");
// const currentPage = window.location.pathname.split("/").pop();

// Сначала убрать класс active у всех кнопок
classButtons.forEach(btn => btn.classList.remove("active"));

// Затем определить, какая страница — 5 или 6 класс
const is6class = currentPage.startsWith("2lesson") || currentPage === "2index.html";
const is5class = currentPage.startsWith("lesson") || currentPage === "index.html";

// И активировать нужную кнопку
classButtons.forEach(btn => {
  const href = btn.getAttribute("data-href");
  if (is5class && href === "index.html") {
    btn.classList.add("active");
  } else if (is6class && href === "2lesson.html") {
    btn.classList.add("active");
  }
});


