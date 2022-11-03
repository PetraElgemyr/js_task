class Todo {
  constructor(item, finished, removed) {
    this.item = item;
    this.finished = finished;
    this.removed = removed;
  }
}

window.onload = function () {
  startTodo();
  addItemToList();
};

let totalTodoList = [];
let removedTodoList = [];

function startTodo() {
  let myTodoList = ["Tvätta", "Handla", "Plugga", "Städa"];
  for (let i = 0; i < myTodoList.length; i++) {
    let thingTodo = myTodoList[i];
    showMyTodos(thingTodo); //anropa och skicka med alla saker i min lista
  }
}

function showMyTodos(content) {
  /*
   */
  let myUlTag = document.getElementById("myList"); //hitta min todo-ul-tag
  let ulWithRemovedItems = document.getElementById("removedItemsList"); //>Hitta borttagna ul

  let newTodoObject = new Todo(content, false, false);

  totalTodoList.push(newTodoObject); //här läggs det till objekt newTodoObject i min lista [newTodoObject, newTodoObject,...]
  if (content !== "") {
    console.log(totalTodoList);
    // let ulTag = document.getElementById("myList");
    // ulTag.innerHTML = "";
    let myLiTag = document.createElement("li");

    for (let i = 0; i < totalTodoList.length; i++) {
      myLiTag.innerHTML = "";
      myLiTag.className = "myTodoItem";
      myLiTag.innerHTML = totalTodoList[i].item;
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox"; //Om man klickar på checkbox för att markera klar

      let removeItemBtn = document.createElement("button");
      removeItemBtn.type = "button";
      removeItemBtn.className = "removeBtn";
      removeItemBtn.innerHTML = "&#10005;";

      myLiTag.appendChild(checkbox);
      myLiTag.appendChild(removeItemBtn);
      myUlTag.appendChild(myLiTag);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          totalTodoList[i].finished = true;
          myLiTag.classList.toggle("__checked");
          console.log(
            "Todon ",
            totalTodoList[i].item,
            " är klar: ",
            totalTodoList[i].finished
          );
        } else {
          if (!checkbox.checked) {
            totalTodoList[i].finished = false;
            console.log(
              "Todon ",
              totalTodoList[i].item,
              " är klar: ",
              totalTodoList[i].finished
            );
            myLiTag.className = "myTodoItem";
          }
        }
      });

      removeItemBtn.addEventListener("click", () => {
        handleRemovedItems(totalTodoList[i], totalTodoList, myLiTag);
      });
    }

    /**
   * 
   * 
  btn.addEventListener("click", function () {
        todo.removed = true;
  
        let removedItem = btn.parentElement;
        removedItem.classList.toggle("checked");
        checkChecked(todo);
        removedItem.remove();
        removedItem.removeChild(removedItem.lastChild);
  
        //Lägg till ny knapp som gör att man kan "reversa" en borttagning av en todo
        let reverseBtn = document.createElement("button");
        reverseBtn.innerHTML = "&#8617;";
        reverseBtn.className = "reverseListItem";
  
        removedItem.appendChild(reverseBtn);
  
        removedItems.push(removedItem);
  
        // eventlistner för nya reverseknappen som gör att todon kommer tillbaka till hur den var innan den blev borttagen
        reverseBtn.addEventListener("click", function () {
          todo.removed = false;
  
          removedItem.classList.toggle("checked");
          checkChecked(todo);
  
          let reverseItem = reverseBtn.parentElement;
          reverseItem.removeChild(reverseItem.lastChild);
  
          reverseItem.appendChild(btn);
  
          reverseItem.classList.remove("removed");
  
          let index = removedItems.indexOf(reverseItem);
          if (index > -1) {
            removedItems.splice(index, 1);
          } 
  
  
  
   * 
   */

    // removeItemBtn.addEventListener("click", () => {
    //   newTodoObject.removed = true;
    //   let reverseBtn = document.createElement("button");
    //   if (newTodoObject.removed === true) {
    //     let deleteItem = removeItemBtn.parentElement; //här är den specifika knappens förälder, dvs den li-tagen
    //     deleteItem.remove(); //ta bort li-tag
    //     deleteItem.removeChild(deleteItem.lastChild); //tar bort kryssknapp
    //     console.log(deleteItem.innerHTML + " tas bort från todo-listan"); //skriver ut texten utan kryssknappen i console

    //     let newRemovedObjects = new Todo(deleteItem.innerText, false, true);

    //     removedTodoList.push(newRemovedObjects); //lägger till nya objektet av raderad punkt i listan med borttagna saker

    //     let liWithRemovedItems = document.createElement("li"); //skapa ny li-tag utanför loop, för varje klick skapas det ny li
    //     reverseBtn.type = "button";
    //     reverseBtn.innerHTML = "&#8617";

    //     for (let i = 0; i < removedTodoList.length; i++) {
    //       liWithRemovedItems.innerHTML = removedTodoList[i].item;
    //       liWithRemovedItems.appendChild(reverseBtn);
    //       ulWithRemovedItems.appendChild(liWithRemovedItems);
    //     }
    //     liWithRemovedItems.className = "deletedThing"; // Fixa så att styling o classname behålls från tidigare, något med true/false
    //     console.log(removedTodoList);
    //   } else {
    //     console.log(totalTodoList);
    //   }

    //   reverseBtn.addEventListener("click", () => {
    //     newTodoObject.removed = false;

    //     let bringBackItem = reverseBtn.parentElement; //li-tagen som ligger i borttagna saker
    //     bringBackItem.remove(); //li-tag tas bort från ul-listan
    //     bringBackItem.removeChild(bringBackItem.lastChild); //tar bort reverse button
    //     console.log(bringBackItem.innerHTML + " läggs tillbaka i todo-listan");
    //     let broughtBackItems = new Todo(bringBackItem.innerText, false, false);
    //     removedTodoList.pop(broughtBackItems); //ta bort sista objekt
    //     totalTodoList.push(broughtBackItems); //lägger till objektet på todo-list igen.

    //     console.log(removedTodoList);

    //     showMyTodos(bringBackItem.innerHTML); //skicka tillbaka texten på li-tagen som ska reversas
    // pop  let newTodoObject = new Todo(content, false, false);
    //   });
    // });
  } else {
    alert("Skriv in något att lägga till innan du klickar!"); //Sorry, kommer bara avnvända alert här för att få fram en tydlig varning. Aldrig mer :)
  }
}
function handleRemovedItems(clickedItem, totalTodoList, myLiTag) {
  clickedItem.removed = true;

  if (clickedItem.removed === true) {
    let index = totalTodoList.indexOf(clickedItem);
    console.log(index);
    totalTodoList.splice(index, 1);
    removedTodoList.push(clickedItem);
    console.log(totalTodoList);
    console.log(removedTodoList);
    let todoListUlTag = document.getElementById("myList");
    todoListUlTag.removeChild(myLiTag);

    let removedListUl = document.getElementById("removedItemsList");
    let removedLi = document.createElement("li");

    for (let i = 0; i < removedTodoList.length; i++) {
      removedLi.innerHTML = "";
      removedLi.className = "deletedLi";
      removedLi.innerHTML = removedTodoList[i].item;

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      let reverseBtn = document.createElement("button");
      reverseBtn.type = "button";
      reverseBtn.innerHTML = "&#8617";

      removedLi.appendChild(checkbox);
      removedLi.appendChild(reverseBtn);
      removedListUl.appendChild(removedLi);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          totalTodoList[i].finished = true;
          myLiTag.classList.toggle("__checked");
          console.log(
            "Todon ",
            totalTodoList[i].item,
            " är klar: ",
            totalTodoList[i].finished
          );
        } else {
          if (!checkbox.checked) {
            totalTodoList[i].finished = false;
            console.log(
              "Todon ",
              totalTodoList[i].item,
              " är klar: ",
              totalTodoList[i].finished
            );
            myLiTag.className = "deletedLi";
          }
        }
      });
    }
    // let textStrings = [];
    // for (let i = 0; i < totalTodoList.length; i++) {
    //   textStrings.push(totalTodoList[i].item);
    // }
    // console.log("mina texter", textStrings);
    // totalTodoList = [];
    // for (let i = 0; i < textStrings.length; i++) {
    //   showMyTodos(textStrings[i]);
    // }

    //const fruits = ["Banana", "Orange", "Apple", "Mango"]; Kolla upp dessa för att skicka item-namn till content i showmyTodos
    //let text = fruits.toString();
  }
}

// function removeFromTodoList(myLiTag, clickedItem, totalTodoList) {
//   if (totalTodoList[i].removed === false) {
//     totalTodoList[i].removed = true;
//     myLiTag.innerHTML = "";
//     let index = totalTodoList.indexOf(totalTodoList[i]);
//     console.log(index);
//     totalTodoList.splice(index, 1);
//     removedTodoList.push(clickedItem);

//     for (let i = 0; i < ulWithRemovedItems.length; i++) {
//       let reverseBtn = document.createElement("button");
//       reverseBtn.type = "button";
//       reverseBtn.innerHTML = "&#8617";
//       let newLi = document.createElement("li");
//       newLi.innerHTML = ulWithRemovedItems[i].name;
//       newLi.appendChild(reverseBtn);
//       ulWithRemovedItems.appendChild;

//       // reverseBtn.addEventListener("click", )
//     }
//   }
//   // else {
//   //   if (totalTodoList[i].removed === true) {
//   //     totalTodoList[i].removed = false;
//   //     let removedItemsIndex =
//   //   }
//   // }
// }

function addItemToList() {
  let addItemBtn = document.getElementById("addItemBtn");
  addItemBtn.addEventListener("click", () => {
    showMyTodos(document.getElementById("newItem").value);
    /*till funktionen showMyTodos skickar jag ett värde. Input-tagens value. Det värdet jag skickar är det som står i inputen. 
      Det värdet tas emot som thingTodo i början av ShowMyTodos */
    document.getElementById("newItem").value = "";
  });
}
