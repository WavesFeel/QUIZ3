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
  0: { count: 3, startsFrom: "1" },
  1: { count: 8, startsFrom: "index" },
  2: { count: 11, startsFrom: 1 },
  3: { count: 8, startsFrom: 1 },
  4: { count: 3, startsFrom: 1 },
  5: { count: 5, startsFrom: 1 },
  6: { count: 7, startsFrom: 1 }
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



function syncHeights() {
  setTimeout(() => {
    const menu = document.querySelector('.menu');
    const content = document.querySelector('.content_games');
    if (menu && content) {
      content.style.height = 'auto';
      content.style.height = menu.offsetHeight + 'px';
    }
  }, 100);
}


window.addEventListener('load', syncHeights);
window.addEventListener('resize', syncHeights);

const sliders = {
  slider1: ["Процессор", "Охлаждение", "Радиатор"],
  slider2: ["Оперативная память", "SSD", "HDD"],
  slider3: ["Видеокарта", "Сетевая карта", "Звуковая карта"],
  slider4: ["Блок питания", "UPS", "Инвертор"],
  slider5: ["Материнская плата", "Чипсет", "BIOS"],
  slider6: ["Корпус", "Кулеры", "USB-порты"]
};

function createSlider(id, options) {
  const container = document.getElementById(id);
  if (!container) return; // <-- защита от ошибки

  let index = 0;

  container.innerHTML = `
    <button class="prev">◀</button>
    <span class="component">${options[index]}</span>
    <button class="next">▶</button>
    <span class="tooltip-btn" data-id="${id}">❓</span>
  `;

  const label = container.querySelector('.component');
  container.querySelector('.prev').onclick = () => {
    index = (index - 1 + options.length) % options.length;
    label.textContent = options[index];
  };
  container.querySelector('.next').onclick = () => {
    index = (index + 1) % options.length;
    label.textContent = options[index];
  };

  const tooltipBtn = container.querySelector('.tooltip-btn');
  tooltipBtn.addEventListener("click", () => {
    const text = tooltips[id] || "Описание недоступно.";
    const modal = document.getElementById("tooltipModal");
    const overlay = document.getElementById("tooltipOverlay");
    modal.innerText = text;
    modal.classList.add("active");
    overlay.classList.add("active");
  });
}



Object.entries(sliders).forEach(([id, options]) => createSlider(id, options));

// const tooltips = {
//   slider1: "Процессор — это мозг компьютера, обрабатывающий все команды.",
//   slider2: "Оперативная память — временное хранилище данных для быстрого доступа.",
//   slider3: "Видеокарта — устройство для обработки графики и видео.",
//   slider4: "Блок питания — обеспечивает электричеством все компоненты.",
//   slider5: "Материнская плата — объединяет все части компьютера.",
//   slider6: "Корпус — защищает компоненты и обеспечивает охлаждение."
// };

// document.querySelectorAll(".tooltip-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     const id = btn.dataset.id;
//     const text = tooltips[id] || "Описание недоступно.";

//     const modal = document.getElementById("tooltipModal");
//     const overlay = document.getElementById("tooltipOverlay");

//     modal.innerText = text;
//     modal.classList.add("active");
//     overlay.classList.add("active");
//   });
// });

// document.getElementById("tooltipOverlay").addEventListener("click", () => {
//   document.getElementById("tooltipModal").classList.remove("active");
//   document.getElementById("tooltipOverlay").classList.remove("active");
// });



// const algorithmForm = document.getElementById("algorithmForm");
// if (algorithmForm) {
//   algorithmForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const inputs = this.querySelectorAll("input");
//     const resultBox = document.getElementById("resultBox");

//     let allFilled = true;
//     let steps = [];

//     inputs.forEach((input, index) => {
//       const value = input.value.trim();
//       if (!value) allFilled = false;
//       steps.push(`${index + 1}. ${value}`);
//     });

//     if (!allFilled) {
//       resultBox.style.display = "block";
//       resultBox.textContent = "Пожалуйста, заполни все шаги!";
//       resultBox.style.color = "red";
//     } else {
//       resultBox.style.display = "block";
//       resultBox.style.color = "#333";
//       resultBox.innerHTML = `<strong>Твой алгоритм:</strong><br>${steps.join('<br>')}`;
//     }
//   });
// }


document.addEventListener("DOMContentLoaded", () => {
  let testPassed = false;

  const testForm = document.getElementById("testForm");
  const testResult = document.getElementById("testResult");
  const startTestBtn = document.getElementById("startTestBtn");
  const testBlock = document.getElementById("testBlock");

  // Показываем тест при клике
if (startTestBtn && testBlock) {
  startTestBtn.addEventListener("click", () => {
    startTestBtn.style.display = "none";
    testBlock.style.display = "block";

    // ⬇️ Прокрутка вниз к тесту
    testBlock.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}


  // Проверка теста
  if (testForm && testResult) {
    testForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const answers = {
        q1: "25",
        q2: "no",
        q3: "shock"
      };

      let correct = 0;
      let total = Object.keys(answers).length;

      for (let q in answers) {
        const selected = testForm.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) {
          correct++;
        }
      }

      if (correct === total) {
        testPassed = true;
        testForm.style.display = "none";
        testResult.style.display = "block";
      } else {
        alert(`Ты ответил правильно на ${correct} из ${total} вопросов. Попробуй ещё раз.`);
      }
    });
  }

  // Переход к следующему уроку
  const nextLessonBtn = document.getElementById("nextLessonBtn");
  if (nextLessonBtn) {
    nextLessonBtn.addEventListener("click", () => {
      if (!testPassed) {
        alert("Сначала пройди тест!");
        return;
      }

      const currentPage = window.location.pathname.split("/").pop();
      const isSixthClass = currentPage.startsWith("2");

      const lessonMatch = currentPage.match(/(?:2)?lesson(\d+)/);
      const lessonNum = lessonMatch ? parseInt(lessonMatch[1]) : 1;

      const nextLesson = lessonNum + 1;
      const nextPage = isSixthClass
        ? `2lesson${nextLesson}.html`
        : `lesson${nextLesson}.html`;

      window.location.href = nextPage;
    });
  }
});




