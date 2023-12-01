const taskContainer = document.querySelector(".task__container");

let globalTaskData = [];

const getTotalScore = (taskData) => {
    console.log(taskData);
    return parseInt(taskData?.high) * 10 + parseInt(taskData?.medium) * 5 + parseInt(taskData?.low) * 3;
}

const generateHTML = (taskData) => `<div>
<button class="btn btn-outline-info" id=${taskData.id} name=${taskData.id} onclick="edit.apply(this,arguments)">
       <i class="fal fa-pencil"  name=${taskData.id}></i>
     </button>
  
   <tr scope="row">
  <td class="font-weight-bold">${taskData.name}</td>
  <td id=${taskData.id}-high>${taskData.high}</td>
  <td id=${taskData.id}-medium>${taskData.medium}</td>
  <td id=${taskData.id}-low>${taskData.low}</td>

  <td>${getTotalScore(taskData)}</td>
  
</tr>

</div>`;



const insertToDOM = (content) =>{
  taskContainer.insertAdjacentHTML("afterend", content);

}

const addNewCard = () => {
  // get task data
  const taskData = { 
    id: `${Math.random()}`,
    name: document.getElementById("TeamName").value,
    high: document.getElementById("v-high").value,
    medium: document.getElementById("v-medium").value,
    low: document.getElementById("v-low").value,
    totalStorage : document.getElementById("totalScore").value,
  };


  globalTaskData.push(taskData);

  // update the localstorage
  localStorage.setItem("taskyCA", JSON.stringify({ card: globalTaskData }));


const newCard = generateHTML(taskData);

  insertToDOM(newCard);
  window.location.reload();

  // clear the form
  document.getElementById("TeamName").value = "";
  document.getElementById("v-high").value = "";
  document.getElementById("v-medium").value = "";
  document.getElementById("v-low").value = "";
  return;
  
};


//when we load our page
const loadExistingCards = () => {
  // check localstorage
  const getData = localStorage.getItem("taskyCA");

  // parse JSON data, if exist
  if (!getData) return;

  const taskCards = JSON.parse(getData);

  globalTaskData = taskCards.card;

  globalTaskData?.sort((a, b) => {
    const totalA = getTotalScore(a);
    const totalB = getTotalScore(b);
    return totalA - totalB;
  })


  globalTaskData.map((taskData) => {
    const newCard = generateHTML(taskData);
    insertToDOM(newCard);
  });


  return;
};


  const edit = (event) => {
   const targetId=event.target.getAttribute("name");
    const elementtype=event.target.tagName;

    let V_high;
    let V_Medium;
    let V_low;


    if(elementtype==="BUTTON"){
      parentelement=event.target.parentNode.parentNode;
    }else{
      parentelement=event.target.parentNode.parentNode.parentNode;
    }


      submitButton = document.getElementById(targetId);
    V_high = document.getElementById(`${targetId}-high`);
    V_Medium=document.getElementById(`${targetId}-medium`);
    V_low=document.getElementById(`${targetId}-low`);
    console.log(V_high, targetId)
    submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
    submitButton.innerHTML="save Changes";

    V_high.setAttribute("contenteditable","true");
    V_Medium.setAttribute("contenteditable","true");
    V_low.setAttribute("contenteditable","true")
    
  }

  const saveEdit=(event)=>{
    const targetId=event.target.getAttribute("name");
    const elementtype=event.target.tagName;

   let parentelement;

    if(elementtype==="BUTTON"){
      parentelement=event.target.parentNode.parentNode;
    }else{
      parentelement=event.target.parentNode.parentNode.parentNode;
    }
   
      
    const v_high=document.getElementById(`${targetId}-high`);
    const v_Medium=document.getElementById(`${targetId}-medium`);
    const v_low=document.getElementById(`${targetId}-low`);
   const submitbutton=parentelement.childNodes[4].childNodes[1];
  const updateData={
    high:v_high.innerHTML,
    medium:v_Medium.innerHTML,
    low:v_low.innerHTML
  };

    globalTaskData = globalTaskData.map((task)=>{
        if(task.id===targetId){
        return {...task,...updateData};
        }
        return task;
    });

    globalTaskData?.sort((a ,b) => {

    })


  localStorage.setItem("taskyCA",JSON.stringify({card:globalTaskData}))


    v_high.setAttribute("contenteditable","false");
    v_Medium.setAttribute("contenteditable","false");
    v_low.setAttribute("contenteditable","false");
    submitbutton.innerHTML="Open task";
    window.location.reload();
    


  }








// Strigify
// JS object -> JSON

// Parse
// JSON -> JS objects





//  <div id=${taskData.id} class="col-md-6 col-lg-4s my-4">
// <div class="card">
//   <div class="card-header gap-2 d-flex justify-content-end">
//     <button class="btn btn-outline-info"  name=${taskData.id} onclick="edit.apply(this,arguments)">
//       <i class="fal fa-pencil"  name=${taskData.id}></i>
//     </button>
//     <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this,arguments)">
//       <i class="far fa-trash-alt"  name=${taskData.id}></i>
//     </button>
//   </div>
//   <div class="card-body">
//     <img
//       src=${taskData.image}
//       alt="image"
//       class="card-img"
//     />
//     <h5 class="card-title mt-4">${taskData.title}</h5>
//     <p class="card-text">
//       ${taskData.description}
//     </p>
//     <span class="badge bg-primary">${taskData.type}</span>
//   </div>
//   <div class="card-footer">
//     <button class="btn btn-outline-primary">Open Task</button>
//   </div>
// </div>
// </div> 


{/* <div class="card-header gap-2 d-flex justify-content-end">
<button class="btn btn-outline-info"  name=${taskData.id} onclick="edit.apply(this,arguments)">
  <i class="fal fa-pencil"  name=${taskData.id}></i>
</button>
</div> */}