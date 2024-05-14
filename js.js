

const computers = [];

document.addEventListener("DOMContentLoaded", function() {
  const computerForm = document.getElementById("computer-form");
  const computerList = document.getElementById("computer-list");

  computerForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addOrUpdateComputer();
  });

  computerList.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("edit-btn")) {
      editComputer(target.dataset.index);
    } else if (target.classList.contains("delete-btn")) {
      deleteComputer(target.dataset.index);
    }
  });

  function addOrUpdateComputer() {
    const model = getValue("model");
    const processor = getValue("processor");
    const ramInput = getValue("ram"); 
    const ram = parseInt(ramInput);
    const storage = getValue("storage");
  
    if (!model || !processor || !ramInput || !storage) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
  
    if (ram <= 0) {
      alert("Пожалуйста, введите корректное значение для памяти.");
      return;
    }
  
    const computer = {
      model,
      processor,
      ram,
      storage
    };
  
    const index = computers.findIndex(comp => comp.model === model);
    if (index !== -1) {
      computers[index] = computer;
    } else {
      computers.push(computer);
    }
  
    displayComputers();
    clearForm();
  }
  function getValue(id) {
    return document.getElementById(id).value.trim();
  }

  function displayComputers() {
    computerList.innerHTML = computers.map((computer, index) => `
      <div class="computer-item">
        <p><strong>Модель:</strong> ${computer.model}</p>
        <p><strong>Процессор:</strong> ${computer.processor}</p>
        <p><strong>RAM:</strong> ${computer.ram} ГБ</p>
        <p><strong>Хранение данных:</strong> ${computer.storage}</p>
        <button class="edit-btn" data-index="${index}">Изменить</button>
        <button class="delete-btn" data-index="${index}">Удалить</button>
      </div>
    `).join("");
  }

  function clearForm() {
    computerForm.reset();
  }

  function deleteComputer(index) {
    computers.splice(index, 1);
    displayComputers();
  }

  function editComputer(index) {
    const computer = computers[index];
    setValue("model", computer.model);
    setValue("processor", computer.processor);
    setValue("ram", computer.ram);
    setValue("storage", computer.storage);
  }

  function setValue(id, value) {
    document.getElementById(id).value = value;
  }
});







