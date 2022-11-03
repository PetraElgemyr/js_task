class Todo {
  constructor(name, finished, removed) {
    this.name = name;
    this.finished = finished;
    this.removed = removed;
  }
}

window.onload = function () {
  addItemToList();
  showMyTodos();
};

let removedTodoList = [];
let todoList = [
  new Todo("Tvätta", false, false),
  new Todo("Handla", false, false),
  new Todo("Plugga", false, false),
  new Todo("Städa", false, false),
];

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

      if (clickedObject.finished === true) {
        removedLi.classList.toggle(
          "__removed"
        ); /*om något objekt är överstruket samt markerat som finished redan, 
        checkas av för att flyttas till andra listan behövs den överstrukna stylingen vara kvar. Så alla nya litaggar och checkboxes skapas
        som vanligt och placeras ut i DOMen. och OM finished=true så får NYA li-tagen (removedLi) i borttagna-listan klassnamn för styling
        för de finished OCH removed objekten */
      }

      ulWithRemovedItems.appendChild(removedLi);
      removedSpan.innerHTML += clickedObject.name;
      removedLi.appendChild(removedSpan);
      removedLi.appendChild(checkboxForRemoved);

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
      if (clickedObject.removed === true) {
        //    let changing = (clickedObject.removed = false)
        removedTodoList.push(clickedObject); //om removed=true ska de ligga i borttagna-listan
        console.log("Här är listan med borttagna todos: ", removedTodoList);
      }
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
  removedLi.innerHTML = ""; //töm li-tagen i removedlistan
  checkboxForRemoved.remove(); //tar bort checkbox för removed objekt
  removedLi.remove(); //ta bort li-tagen i borttagna-listan
  mySpan.innerHTML = clickedObject.name;
  myLiTag.appendChild(mySpan);

  firstCheckbox.checked = false;
  clickedObject.removed = false; //när objekt flyttats över till todolistan ska objektets removed=false OCH checkrutan ska räknas som icke-checkad
  myLiTag.appendChild(firstCheckbox); //checkbox för todo-listan är tillbaka

  let myUlTag = document.getElementById("myList");
  myUlTag.appendChild(myLiTag);
  console.log("min uppdaterade todo-list: ", todoList);
}

// function markAsFinished(theObject, myLiTag, removedLi) { //om man klickat på span-tagen
//   if (theObject.finished === false) {
//     theObject.finished = true; //om finished=false (dvs standardvärdet) så ska det växla till true vid klick på span
//     console.log("Nu blir finished=true på objektet ", theObject);
//     myLiTag.classList.toggle("__checked");
//     removedLi.classList.toggle("__checked");
//   } else {
//     if (theObject.finished === true) {
//       //om finished=true när man klickar ska det bli false
//       theObject.finished = false;
//       console.log("Nu blir finished=false på objektet ", theObject);
//       myLiTag.classList.toggle("__checked");
//       removedLi.classList.remove("__checked");
//     }
//   }
// }

/********************************************************* 

  totalTodoList.push(newTodoObject); //här läggs det till objekt newTodoObject i min lista [newTodoObject, newTodoObject,...]
  if (content !== "") {
    console.log(totalTodoList);
    // let ulTag = document.getElementById("myList");
    // ulTag.innerHTML = "";

    for (let i = 0; i < totalTodoList.length; i++) {
      myLiTag.innerHTML = "";
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
        handleRemovedItems(totalTodoList[i], totalTodoList, myLiTag, checkbox);
      });
    }
******************************************/

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

/*******************************************************


  } else {
    alert("Skriv in något att lägga till innan du klickar!"); //Sorry, kommer bara avnvända alert här för att få fram en tydlig varning. Aldrig mer :)
  }
}
function handleRemovedItems(clickedItem, totalTodoList, myLiTag, checkbox) {
  clickedItem.removed = true;
  console.log("Det här innehåller mitt objekt: ", Object.keys(clickedItem));

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

    if (checkbox.checked) {
      clickedItem.finished = true;
      removedLi.classList.toggle("__checked");
    }

    for (let i = 0; i < removedTodoList.length; i++) {
      removedLi.innerHTML = "";
      removedLi.className = "deletedLi";
      removedLi.innerHTML = removedTodoList[i].item;

      //   let checkbox = document.createElement("input");
      //   checkbox.type = "checkbox";

      let reverseBtn = document.createElement("button");
      reverseBtn.type = "button";
      reverseBtn.innerHTML = "&#8617";

      removedLi.appendChild(checkbox);
      removedLi.appendChild(reverseBtn);
      removedListUl.appendChild(removedLi);

************************************************/

//   checkbox.addEventListener("change", () => {
//     if (checkbox.checked) {
//       totalTodoList[i].finished = true;
//       myLiTag.classList.toggle("__checked");
//       console.log(
//         "Todon ",
//         totalTodoList[i].item,
//         " är klar: ",
//         totalTodoList[i].finished
//       );
//     } else {
//       if (!checkbox.checked) {
//         totalTodoList[i].finished = false;
//         console.log(
//           "Todon ",
//           totalTodoList[i].item,
//           " är klar: ",
//           totalTodoList[i].finished
//         );
//         myLiTag.className = "deletedLi";
//       }
//     }
//   });

/* ****************************************
    }
    let textStrings = [];
    for (let i = 0; i < totalTodoList.length; i++) {
      textStrings.push(totalTodoList[i].item);
    }
    console.log("mina texter", textStrings);

    for (let i = 0; i < textStrings.length; i++) {
      totalTodoList = [];

      showMyTodos(textStrings[i]);
    }

    //const fruits = ["Banana", "Orange", "Apple", "Mango"]; Kolla upp dessa för att skicka item-namn till content i showmyTodos
    //let text = fruits.toString();
  }
}
************************************* */

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

/***********************

********** */
