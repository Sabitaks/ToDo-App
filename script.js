// Getting all required elements

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const ToDoList = document.querySelector(".ToDoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // getting user enterd value 
    if(userData.trim() !=0){ // if user values aren't only spaces
       addBtn.classList.add("avtive"); // active the add button
    }else{
        addBtn.classList.remove("avtive"); // unactive the add button 
    }
}
showTasks(); // calling showTasks function

// if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value; // getting user enterd value
    let getLocalStorage = localStorage.getItem("New-ToDo"); // getting localStorage
    if(getLocalStorage == null){ // if localStorage is null
      listArr = []; // creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object  
    }
    listArr.push(userData); // pushing or adding user data
    localStorage.setItem("New-ToDo",JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); // calling showTasks function
    deleteAllBtn.classList.remove("active");// unactive the clearall button
}
// function to add task list inside ul
function showTasks() { // calling showTasks function
    let getLocalStorage = localStorage.getItem("New-ToDo"); // getting localStorage  
    if(getLocalStorage == null){ // if localStorage is null
      listArr = []; // creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object  
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length;// passing the length value  in pendingNumber
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    ToDoList.innerHTML = newLiTag; //adding new li tag inside ul tag.
    inputBox.value = ""; // once task added leave the input field blank
    if (listArr.length > 0) { // if array length is greate than 0
        deleteAllBtn.classList.add("active"); // active the clearall button
    } else {
        deleteAllBtn.classList.remove("active");// unactive the clearall button
    }
}

// delete task function 
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New-ToDo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // delete or remove the particular indexed li
    // after remove the li again update the local storage 
    localStorage.setItem("New-ToDo",JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); // calling showTasks function
}
// delete all task function
deleteAllBtn.onclick = () => {
    listArr = [] // empty an array
    // after all task again update the local storage 
    localStorage.setItem("New-ToDo",JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); // calling showTasks function
}