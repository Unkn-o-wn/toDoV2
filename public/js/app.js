//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, uder interaction is what starts the code execution.

let taskInput=document.getElementById("new-task");//Add a new task.
let addButton=document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
let completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement=function(taskString){

  let listItem=document.createElement("li");

  //input (checkbox)
  let checkBox=document.createElement("input");//checkbx
  //label
  let label=document.createElement("label");//label
  //input (text)
  let editInput=document.createElement("input");//text
  //button.edit
  let editButton=document.createElement("button");//edit button

  //button.delete
  let deleteButton=document.createElement("button");//delete button
  //Sub tag with text create at
  let subText=document.createElement("sub");//sub text

  label.innerText=taskString;
  label.setAttribute('data-id', '');
  //Each elements, needs appending
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
  editButton.className="edit";
  deleteButton.innerText="Delete";
  deleteButton.className="delete";
  deleteButton.className="delete";


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(subText);
  createNewTaskElement.prototype.sT = subText;
  return listItem;
}


let createGetTaskElement=function(taskObject){

  let listItem=document.createElement("li");

  //input (checkbox)
  let checkBox=document.createElement("input");//checkbx
  //label
  let label=document.createElement("label");//label
  //input (text)
  let editInput=document.createElement("input");//text
  //button.edit
  let editButton=document.createElement("button");//edit button

  //button.delete
  let deleteButton=document.createElement("button");//delete button
  //Sub tag with text create at
  let subText=document.createElement("sub");//sub text

  label.innerText=`${taskObject.title}`;
  label.setAttribute('data-id', `${taskObject.id}`);
  //Each elements, needs appending
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
  editButton.className="edit";
  deleteButton.innerText="Delete";
  deleteButton.className="delete";
  if(taskObject.createdAt === taskObject.updatedAt){
    subText.innerHTML = `Добавленно: ${dateFormat(taskObject.createdAt)}`;
  }else{
    subText.innerHTML = `Измененно: ${dateFormat(taskObject.updatedAt)}`;

  }

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(subText);
  createGetTaskElement.prototype.sT = subText;
  return listItem;
}

let addTask=function(){
  //Create a new list item with the text from the #new-task:
  let listItem=createNewTaskElement(taskInput.value);
  ajaxRequest('/api/',taskInput.value, listItem);
  //Append listItem to incompleteTaskHolder
}

//Edit an existing task.
let editTask=function(){


  let listItem=this.parentNode;

  let editInput=listItem.querySelector('input[type=text]');
  let label=listItem.querySelector("label");
  let id = label.dataset.id;
  let containsClass=listItem.classList.contains("editMode");


  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    ajaxRequestEdit(id, editInput.value, listItem);

  }else{
    editInput.value=label.innerText;
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
}

//Delete task.
let deleteTask=function(){
  //
  let listItem=this.parentNode;
  let dataId = listItem.querySelector('label').dataset.id;
  let ul=listItem.parentNode;
  ajaxRequestDelete(dataId,listItem, ul );
  //Remove the parent list item from the ul.

}

//Mark task completed
let taskCompleted=function(){

  //Append the task list item to the #completed-tasks
  let listItem=this.parentNode;
  let id = listItem.querySelector('label').dataset.id;
  ajaxRequestCompleted(id, listItem);


}

let taskIncomplete=function(){
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  let listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

//change date format
let dateFormat = function (date, withT){
 let option = {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit',
   hour:'numeric',
   minute: '2-digit'
 }
  return new Intl.DateTimeFormat('ru-Ru', option).format(new Date(date));
}

let ajaxRequest= async function(urll ,val, item){
  try {
    const url = urll;
    const data = {title: val };

    const response = await fetch(url, {
      method: 'POST', // или 'PUT'
      body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.status === 201){
      const json = await response.json();
      item.querySelector('label').dataset.id = json.id;
      incompleteTaskHolder.appendChild(item);
      bindTaskEvents(item, taskCompleted);
      createNewTaskElement.prototype.sT.innerHTML = `Добавленно: ${dateFormat(json.create)}`;
      taskInput.value="";
    }

  }catch (e) {
    console.error(e)
  }
}

let ajaxRequestGet = async function(){
  try {
    const url = '/api/';
    const response = await fetch(url, {
      method: 'GET', // или 'PUT'
    });
    const json =  await response.json();
    console.log(json)
    if(response.status === 200){
      json.forEach(item=>{

       let backI =  createGetTaskElement(item);
        if(item.done){
          completedTasksHolder.appendChild(backI);
          backI.querySelector('input[type="checkbox"]').remove();
          backI.querySelector('button.edit').remove();
          backI.querySelector('sub').innerHTML = `Завершенно ${dateFormat(item.updatedAt)}`;
          bindTaskEvents(backI, taskIncomplete);
        }else{
          incompleteTaskHolder.appendChild(backI);
          bindTaskEvents(backI, taskCompleted);
        }
      })

    }
  }catch (e) {
    console.error(e)
  }
}
ajaxRequestGet();

let ajaxRequestEdit = async function(id, data, li){
  try {
    const url = `/api/${id}`;
    const response = await fetch(url, {
      method: 'put', // или 'PUT'
      body: JSON.stringify({title: data}), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (response.status === 200){
      let label=li.querySelector("label");
      let editInput=li.querySelector('input[type=text]');
      if(label.innerText !== editInput.value){
        li.querySelector('sub').innerHTML = `Измененно ${dateFormat(json)}`;
      }
      label.innerText=editInput.value;
    }
  }catch (e) {
    console.error(e)
  }
}

let ajaxRequestCompleted = async function(id, li){
  try {
    const url = `/api/complete/${id}`;
    const response = await fetch(url, {
      method: 'put', // или 'PUT'
    });
    const json = await response.json();
    if (response.status === 200){
      completedTasksHolder.appendChild(li);

      li.querySelector('input[type="checkbox"]').remove();
      li.querySelector('button.edit').remove();
      bindTaskEvents(li);
        li.querySelector('sub').innerHTML = `Завершенно ${dateFormat(json)}`;

    }
  }catch (e) {
    console.error(e)
  }
}

let ajaxRequestDelete = async function(item, li, ul){
  try {
    const url = `/api/${item}`;
    const response = await fetch(url, {
      method: 'delete', // или 'PUT'
    });
    if (response.status === 204){
      ul.removeChild(li);
    }
  }catch (e) {
    console.error(e)
  }
}
//The glue to hold it all together.
//Set the click handler to the addTask function.
/*addButton.onclick=addTask;*/
addButton.addEventListener("click",addTask);
//addButton.addEventListener("click",ajaxRequest);

let bindTaskEvents=function(taskListItem,checkBoxEventHandler){
//select ListItems children

  let deleteButton=taskListItem.querySelector("button.delete");
if(taskListItem.querySelector('button.edit') && taskListItem.querySelector("input[type=checkbox]")){
  let checkBox=taskListItem.querySelector("input[type=checkbox]");
  let editButton=taskListItem.querySelector("button.edit");
  editButton.onclick=editTask;
  checkBox.onchange=checkBoxEventHandler;
}

  //Bind editTask to edit button.

  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.

}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usabiliy don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Shange edit to save when you are in edit mode.