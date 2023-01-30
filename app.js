const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-button");
const todoUl = document.getElementById("todo-ul");

const todos = []; //! beyaz kagit mantiginda bos array ile basliyoruz. JSON yapisi ile objeleri array icine alacagiz

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    //! trimlemek = girilen degeri traslamak da diyebiliriz
    alert("Please enter new todo"); //! bos deger girerse mutlaka uyari versin
  } else {
    const newTodo = {
      //! her olusan li newTodo olarak todos arrayine ekleniyor
      id: new Date().getTime(), //* her todoya id atama yapmaliyiz. Silinecek idyi bul. TC gibi uniq olmali. Saliselerle uniq hale getirmis olduk.
      completed: false, //* tamamlandi mi? true yada false, ilk hali her zaman tamamlanmadigi ici false olacak
      text: todoInput.value, //* todo metni
    };
    createListElement(newTodo);
    todos.push(newTodo);
    todoInput.value = ""; //! click oldugu zaman input icindeki value sifirlansin
  }
});

function createListElement(newTodo) {
  const { id, completed, text } = newTodo;
  const li = document.createElement("li");
  li.setAttribute("id", id);
  completed && li.classList.add("checked");

  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  todoUl.appendChild(li);
}

todoUl.addEventListener("click", (e) => {
    const id = e.target.parentElement.getAttribute("id");
    if (e.target.classList.contains("fa-trash")){
        e.target.parentElement.remove();
        todos.filter((todo) => todo.id !== Number(id))
    }else if(e.target.classList.contains("fa-check")){
        e.target.parentElement.classList.toggle("checked");
        todos.map((todo, index) => {
            if (todo.id == id){
                todos[index].completed = !todos[index].completed;
            }
        })
    }
    
})

todoInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter"){
        addBtn.click()
    }
})

window.onload = function(){
    todoInput.focus();
}