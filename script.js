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
    
    const excluirButton = document.createElement("button");
    excluirButton.textContent = "Excluir";
    excluirButton.addEventListener("click", () => {
      tarefas.splice(index, 1);
      atualizarLista();
    });

    if (tarefa.completada) {
        item.classList.add("completed");
      }
    
    item.appendChild(checkbox);
    item.appendChild(texto);
    item.appendChild(excluirButton);
    
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
  if (novoTexto.trim() !== "") { // Verifica se o novo texto não está vazio ou apenas espaços em branco
    tarefas[index].texto = novoTexto; // Atualiza o texto da tarefa com o novo texto
    atualizarLista(); // Atualiza a lista de tarefas na tela
  } else {
    alert("Insira um texto válido para a tarefa!"); // Alerta se o novo texto estiver vazio
  }
}