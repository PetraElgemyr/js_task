import { Todo } from "./models/todo";

window.onload = function () {
  addItemToList();
  showMyTodos();
};

let sortBtn = document.getElementById("sortBtn");

let removedTodoList = [];
let todoList = [
  new Todo("Tvätta", false, false),
  new Todo("Handla", false, false),
  new Todo("Plugga", false, false),
  new Todo("Städa", false, false),
];

sortBtn.addEventListener("click", () => {
  todoList.sort((a, b) => (a.name > b.name ? 1 : -1)); //sorterar alfabetiskt men bara i todoList än så länge
  showMyTodos();
});

function addItemToList() {
  let addItemBtn = document.getElementById("addItemBtn");
  addItemBtn.addEventListener("click", () => {
    let givenInputValue = document.getElementById("newItem").value;

    if (givenInputValue !== "") {
      //om inputrutan innehåller något
      let inputList = new Todo(givenInputValue, false, false); //skapa nytt objekt. Texten i textrutan ska bli name till objektet
      todoList.push(inputList); //lägg till det inputskapade objektet i vanliga todo-listan

      showMyTodos(); //kör vanliga funktion där allt loopas och skrivs ut
      document.getElementById("newItem").value = ""; //töm textruta
    } else {
      alert(
        "Du måste ha skriva något i textrutan innan du klickar på knappen!"
      ); //om man klickar på knappen för att lägga till med tom ruta
    }
  });
}

function showMyTodos() {
  let myUlTag = document.getElementById("myList"); //hitta min todo-ul-tag
  myUlTag.innerHTML = ""; //se till att den är tom innan man börjar loopa

  for (let i = 0; i < todoList.length; i++) {
    let myLiTag = document.createElement("li");
    myLiTag.className = "myTodoItem";

    let mySpan =
      document.createElement(
        "span"
      ); /*texten ska ligga i span inuti li. Vid click-event på li-tagen kommer det inte gå att enbart klicka på checkboxen utan att klicka på li-tagen*/
    mySpan.className = "todo__span";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox"; //type checkbox för att kunna klicka på checkbox för att markera klar
    checkbox.className = "checkbox";

    mySpan.innerHTML += todoList[i].name; //span fylls med egenskapen name:s värde på det objekt som loopas. dvs object.name just nu
    let theObject = todoList[i]; //sparar ner det nuvarande objektet för detta varv i loopen (behövs för clickevent)
    myLiTag.appendChild(mySpan);
    myLiTag.appendChild(checkbox);
    myUlTag.appendChild(myLiTag);

    mySpan.addEventListener("click", () => {
      //om man klickar på span-tag ska föräldrar-li-tagen få annat classname
      if (theObject.finished === false) {
        theObject.finished = true; //om finished=false (standardvärdet) när man klickar ska det växla till true
        console.log("Nu blir finished=true på objektet ", theObject);
        myLiTag.classList.toggle("__checked"); //klassnamn ändras för scss
      } else {
        if (theObject.finished === true) {
          //om finished=true när man klickar ska det växla till false
          //om finished=true när man klickar ska det bli false
          theObject.finished = false;
          console.log("Nu blir finished=false på objektet ", theObject);
          myLiTag.classList.remove("__checked");
        }
      }
    });

    checkbox.addEventListener("change", () => {
      //checkboxen ska anropa funktion och flytta objekt från ena listan till borttagna listan
      checkingCheckbox(myLiTag, theObject, checkbox, mySpan); //behöver li-tagen, span, checkboxen och mitt klickade objekt
    });
  }
}

function checkingCheckbox(myLiTag, clickedObject, checkbox, mySpan) {
  if (checkbox.checked) {
    //om checkboxen är icheckad
    let index = todoList.indexOf(clickedObject); //hitta index, dvs placering av mitt klickade objekt, i listan den är i nu, todoList.
    myLiTag.innerHTML = "";
    myLiTag.remove(); //ta bort innehåll samt ta bort li-tagen från todoList
    todoList.splice(index, 1); //ta bort objektet i listan
    console.log("Du klickade på objektet: ", clickedObject);
    console.log("den nya todo-listan: ", todoList); //checka att objektet är borta från listan

    if (clickedObject.removed === false) {
      //om removed=false när man klickar ska det bli true, värdet ska växla mellan klickningar
      clickedObject.removed = true;
      let ulWithRemovedItems = document.getElementById("removedItemsList"); //hitta ul för borttagna todos
      let removedLi = document.createElement("li");
      let removedSpan = document.createElement("span");
      let checkboxForRemoved = document.createElement("input"); //skapar ny li, span och checkbox för "borttagna listan"
      removedSpan.className = "deletedSpan";
      removedLi.className = "deletedLi";
      checkboxForRemoved.type = "checkbox";
      checkboxForRemoved.className = "checkbox__rem";
      removedTodoList.push(clickedObject); //om removed=true ska de ligga i borttagna-listan
      console.log("Här är listan med borttagna todos: ", removedTodoList);
      if (clickedObject.finished === true) {
        removedLi.classList.toggle(
          "__removed"
        ); /*om något objekt är överstruket samt markerat som finished redan, 
        checkas av för att flyttas till andra listan behövs den överstrukna stylingen vara kvar. Så alla nya litaggar och checkboxes skapas
        som vanligt och placeras ut i DOMen. och OM finished=true så får NYA li-tagen (removedLi) i borttagna-listan klassnamn för styling
        för de finished OCH removed objekten */
      }

      ulWithRemovedItems.appendChild(removedLi);
      for (let i = 0; i < removedTodoList.length; i++) {
        removedSpan.innerHTML = clickedObject.name;
        removedLi.appendChild(removedSpan);
        removedLi.appendChild(checkboxForRemoved);
      }

      removedSpan.addEventListener("click", () => {
        //om man klickar på span i den borttagna listan, ska få överstruken styling och byta finished-värde
        if (clickedObject.finished === false) {
          clickedObject.finished = true; //om finished=false (standardvärdet) när man klickar blir det true
          console.log("Nu blir finished=true på objektet ", clickedObject);
          removedLi.classList.toggle("__removed");
        } else {
          if (clickedObject.finished === true) {
            //om finished=true när man klickar ska det bli false
            clickedObject.finished = false;
            console.log("Nu blir finished=false på objektet ", clickedObject);
            removedLi.classList.remove("__removed");
          }
        }
      });

      //för att flytta tillbaka mina borttagna saker, klicka på den nya checkboxen för de borttagna objekten
      checkboxForRemoved.addEventListener("change", () => {
        reverse(
          clickedObject,
          checkboxForRemoved,
          removedLi,
          myLiTag,
          checkbox,
          mySpan
        );
      });
    }
  }
}

function reverse(
  clickedObject,
  checkboxForRemoved,
  removedLi,
  myLiTag,
  firstCheckbox,
  mySpan
) {
  console.log("Nu flyttas ", clickedObject, " tillbaka till todoList");
  todoList.push(clickedObject); //todo-listan får tillbaka objektet men sist i listan

  let index = removedTodoList.indexOf(clickedObject);
  console.log("index för ", clickedObject, " är ", index); //ta bort från removed listan
  removedTodoList.splice(index, 1);
  removedLi.innerHTML = ""; //töm li-tagen i removedlistan
  checkboxForRemoved.remove(); //tar bort checkbox för removed objekt
  removedLi.remove(); //ta bort li-tagen i borttagna-listan
  mySpan.innerHTML = clickedObject.name;
  myLiTag.appendChild(mySpan);

  firstCheckbox.checked = false;
  clickedObject.removed = false; //när objekt flyttats över till todolistan ska objektets removed=false OCH checkrutan ska räknas som icke-checkad
  myLiTag.appendChild(firstCheckbox); //checkbox för todo-listan är tillbaka

  if (clickedObject.finished === true) {
    myLiTag.classList.toggle("__removed");
  }

  let myUlTag = document.getElementById("myList");
  myUlTag.appendChild(myLiTag);
  console.log("min uppdaterade todo-list: ", todoList);
  console.log("min uppdaterade removed-list: ", removedTodoList);
}
