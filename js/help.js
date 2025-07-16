const tooltips = {
  slider1: "Процессор — это мозг компьютера, обрабатывающий все команды.",
  slider2: "Оперативная память — временное хранилище данных для быстрого доступа.",
  slider3: "Видеокарта — устройство для обработки графики и видео.",
  slider4: "Блок питания — обеспечивает электричеством все компоненты.",
  slider5: "Материнская плата — объединяет все части компьютера.",
  slider6: "Корпус — защищает компоненты и обеспечивает охлаждение."
};

document.querySelectorAll(".tooltip-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const text = tooltips[id] || "Описание недоступно.";

    const modal = document.getElementById("tooltipModal");
    const overlay = document.getElementById("tooltipOverlay");

    modal.innerText = text;
    modal.classList.add("active");
    overlay.classList.add("active");
  });
});

document.getElementById("tooltipOverlay").addEventListener("click", () => {
  document.getElementById("tooltipModal").classList.remove("active");
  document.getElementById("tooltipOverlay").classList.remove("active");
});



const algorithmForm = document.getElementById("algorithmForm");
if (algorithmForm) {
  algorithmForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input");
    const resultBox = document.getElementById("resultBox");

    let allFilled = true;
    let steps = [];

    inputs.forEach((input, index) => {
      const value = input.value.trim();
      if (!value) allFilled = false;
      steps.push(`${index + 1}. ${value}`);
    });

    if (!allFilled) {
      resultBox.style.display = "block";
      resultBox.textContent = "Пожалуйста, заполни все шаги!";
      resultBox.style.color = "red";
    } else {
      resultBox.style.display = "block";
      resultBox.style.color = "#333";
      resultBox.innerHTML = `<strong>Твой алгоритм:</strong><br>${steps.join('<br>')}`;
    }
  });
}