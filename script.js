let tarefas = [];

function adicionarTarefa() {
  const novaTarefa = document.getElementById("new-todo").value;

  if (novaTarefa) {
    const tarefaObj = {
      texto: novaTarefa,
      completada: false,
    };

    tarefas.push(tarefaObj);

    document.getElementById("new-todo").value = "";

    atualizarLista();
  } else {
    alert("Insira uma tarefa válida!");
  }
}

function atualizarLista() {
  const lista = document.getElementById("todo-list");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const item = document.createElement("div");
    item.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.completada;
    checkbox.addEventListener("change", () => {
      tarefa.completada = checkbox.checked;
      atualizarLista();
    });

    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;

    const buttonContainer = document.createElement("div"); // Container para os botões
    buttonContainer.classList.add("button-container");

    const excluirButton = document.createElement("button");
    excluirButton.textContent = "Excluir";
    excluirButton.style.marginLeft = "5px"
    excluirButton.addEventListener("click", () => {
      tarefas.splice(index, 1);
      atualizarLista();
    });

    const alterarButton = document.createElement("button");
    alterarButton.textContent = "Alterar";
    alterarButton.addEventListener("click", () => {
      const novoTexto = prompt("Digite o novo texto da tarefa:");
      if (novoTexto !== null) {
        alterarTarefa(index, novoTexto);
      }
    });

    if (tarefa.completada) {
      item.classList.add("completed");
    }

    item.appendChild(checkbox);
    item.appendChild(texto);
    buttonContainer.appendChild(alterarButton);
    buttonContainer.appendChild(excluirButton);
    item.appendChild(buttonContainer);
    
    lista.appendChild(item);
  });
}

const addButton = document.getElementById("add-todo");
addButton.addEventListener("click", adicionarTarefa);

tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
atualizarLista();

window.addEventListener("beforeunload", () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
});

function alterarTarefa(index, novoTexto) {
  if (novoTexto.trim() !== "") {
    // Verifica se o novo texto não está vazio ou apenas espaços em branco
    tarefas[index].texto = novoTexto; // Atualiza o texto da tarefa com o novo texto
    atualizarLista(); // Atualiza a lista de tarefas na tela
  } else {
    alert("Insira um texto válido para a tarefa!"); // Alerta se o novo texto estiver vazio
  }
}

function activeSearch() {
  const buttonSearch = document.querySelector(".button-search");
  const inputSearch = document.getElementById("input-search");
  const search = document.querySelector(".search");

  buttonSearch.addEventListener("click", () => {
    search.classList.toggle("active");
  });

  inputSearch.addEventListener("focus", () => {
    search.style.borderColor = "var(--color-5)";
  });

  inputSearch.addEventListener("blur", () => {
    search.style.borderColor = "var(--color-2)";
  });

  inputSearch.addEventListener("keyup", () => {
    let taskSearch = inputSearch.value.toLowerCase();
    let tasksList = document.querySelectorAll("#to-do-list li");

    tasksList.forEach((task) => {
      if (task.innerText.toLowerCase().includes(taskSearch)) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });
}
activeSearch();
