// let globalTaskData = []; //Local storage
// const addCard = () => {
//   const newTaskDetails = {
//     id: "${Date.now()}",
//     //above is a template literal
//     //That date parameter enters the right time
//     url: document.getElementById("imageURL").value,
//     title: document.getElementById("taskTitle").value,
//     type: document.getElementById("taskType").value,
//     description: document.getElementById("taskDescription").value,
//     //.value is to extract the value of the input field
//   };
//   taskContents = document.getElementById("taskContentsrow");
//   taskContents.insertAdjacentHTML(
//     "beforeend",
//     generateTaskCard(newTaskDetails)
//   );
//   //add beforeend bcz we want the code to be added at the end(beforebegin,aferbegin,beforeend,afterend)
//   //insertAdjacentHTML adds content
//   //generateTaskCard(newTaskDetails) this returns the values obtained from the below parameter
//   globalTaskData.push(newTaskDetails); // local storage function call
//   saveToLocalStorage();
// };
// //{id,url,title,type,description} is just object destructuring
// const generateTaskCard = ({ id, url, title, type, description }) => {
//   return ` <div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
//                     <div class="cards">
//                         <div class="card-header">
//                             <div class="card-header d-flex justify-content-end">
//                                     <button type="button" class="btn btn-outline-info"  name=${id} onclick="editTask(this)">
//                                         <i class="fas fa-pencil-alt"  name=${id} onclick="editTask(this)"></i>
//                                     </button>
//                                     <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
//                                         <i class="fas fa-trash-alt"  name=${id} onclick="deleteTask(this)"></i>
//                                     </button>
//                             </div>
//                         </div>
//                         <img src="${url}" class="card-img-top" alt="image"/>
//                         <div class="card-body">
//                             <h5 class="card-title">${title}</h5>
//                             <p class="card-text">${description}</p>
//                             <span class="badge bg-primary">${type}</span>
//                         </div>
//                         <div class="class-footer">
//                             <button class="btn btn-outline-primary float-end">Open task</button>
//                         </div>
//                     </div>
//                 </div>`;
// };
// //local storage code

// const saveToLocalStorage = () => {
//   // let obj = {tasks: state.globalTaskData};
//   localStorage.setItem("tasky", JSON.stringify({ tasks: globalTaskData }));
//   //stingify converts json library into a string
//   //json = javascript object notation
//   //its the string format of js object
// };
// const reloadTaskCard = () => {
//   const localStorageCopy = JSON.parse(localStorage.getItem("tasky")); //converting string back to object to store  it in an array
//   console.log(localStorageCopy);
//   if (localStorageCopy) {
//     globalTaskData = localStorageCopy["tasks"]; //. is used to retrive data from the key tasks and stored in globaltaskdata
//   }
//   console.log(globalTaskData);
//   globalTaskData.map((cardData) => {
//     taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData));
//   });
// };
//  // to show individual data in the frontend part
// const deleteTask = (e) => {
//   const targerID = e.getAttribute("name");
//   globalTaskData = globalTaskData.filter(
//     (cardData) => cardData.id !== targetID
//   );
//   console.log("hello");
//   console.log(globalTaskData);
//   saveToLocalStorage();
//   window.location.reload(); //but its not an optimised method
// };

// const editTask = (e) => {
//   const targerID = e.getAttribute("name");
//   console.log(e);
//   console.log(e.parentNode); //as e corresponds to button edit we goes to parent and access the childnodes which we have to edit.
//   console.log(e.parentNode.parentNode.parentNode);
//   e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute(
//     "contenteditable",
//     "true"
//   );
//   e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute(
//     "contenteditable",
//     "true"
//   );
//   e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute(
//     "contenteditable",
//     "true"
//   );

//   console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1]);

//   e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute(
//     "onclick",
//     "saveEditTask(this)"
//   );
//   e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML =
//     "SAVE CHANGES";
//   saveToLocalStorage(); //but its not an optimised method
// };

// const saveEditTask = (e) => {
//   const targetID = e.getAttribute("name");
//   console.log(e);
// };

const state = {
  taskList: [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({
  id,
  title,
  description,
  type,
  url,
}) => ` <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
  <div class="card shadow-sm task__card">
    <div
      class="card-header d-flex justify-content-end task__card__header"
    >
      <button type="button" class="btn btn-outline-info mr-2" name=${id} onclick="editTask.apply(this, arguments)">
        <i class="fas fa-pencil-alt"name=${id}></i>
      </button>
      <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask.apply(this, arguments)">
        <i class="fas fa-trash-alt" name=${id}></i>
      </button>
    </div>
    <div class="card-body">
    ${
      url &&
      `<img width="100%" src=${url} alt="Card image cap" class="card-img-top mb-3 rounded-lg">`
    }
      <h4 class="task__card__title">${title}</h4>
      <p class="description trim-3-lines text-muted" data-gramm_editor="false">
       ${description}
      </p>
      <div class="tags text-white d-flex flex-wrap">
        <span class="badge bg-primary m-1">${type}</span>
      </div>
    </div>
    <div class="card-footer">
      <button
        type="button"
        class="btn btn-outline-primary float-right"
        data-bs-toggle="modal"
        data-bs-target="#showTask"
        onclick="openTask.apply(this, arguments)"
        id=${id}
      >
        Open Task
      </button>
    </div>
  </div>
  </div>`;

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return ` <div id=${id}>
    <img
    src=${
      url ||
      `https://images.unsplash.com/photo-1572214350916-571eac7bfced?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80`
    }
    alt="bg image"
    class="img-fluid place__holder__image mb-3"
    />
    <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
    <h2 class="my-3">${title}</h2>
    <p class="lead">
    ${description}
    </p></div>`;
};

const updateLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ tasks: state.taskList }));
};

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasky);
  if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  state.taskList.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};

const handlesubmit = (e) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    type: document.getElementById("Tags").value,
  };

  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({ ...input, id })
  );
  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.filter(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask[0]);
};

const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({ id }) => id !== targetID);
  state.taskList = removeTask;

  updateLocalStorage();
  if (type === "BUTTON")
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.id;
  const type = e.target.tagName;
  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;
  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }
  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  submitButton = parentNode.childNodes[5].childNodes[1];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};
const saveEdit = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  console.log(parentNode.childNodes);
  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const submitButton = parentNode.childNodes[5].childNodes[1];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  let stateCopy = state.taskList;
  stateCopy = stateCopy.map((task) =>
    task.id === targetID
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task
  );

  state.taskList = stateCopy;
  updateLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};

const searchTask = (e) => {
  if (!e) e = window.event;
  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  const resultData = state.taskList.filter(({ title }) =>
    title.includes(e.target.value)
  );

  resultData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};
