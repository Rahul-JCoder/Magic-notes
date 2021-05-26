console.log("Welcome to Magic Notes");
showNotes();
//If User add a note add it to a local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");
  if (notes == null || title == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(title);
    notesObj = JSON.parse(notes);
  }
  titleObj.push(addTitle.value);
  notesObj.push(addTxt.value);
  localStorage.setItem("title", JSON.stringify(titleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
});

//function to show elements from localStorage
function showNotes() {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");
  if (notes == null || title == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(title);
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${titleObj[index]}</h5>
            <p class="card-text">
             ${element}
            </p>
            <button id="${index}" onClick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show here,Use Add Notes section above to add your notes here.`;
  }
}

//function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting this note");
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");
  if (notes == null || title == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(title);
    notesObj = JSON.parse(notes);
  }
  titleObj.splice(index, 1);
  notesObj.splice(index, 1);
  localStorage.setItem("title", JSON.stringify(titleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//Adding the search ability feature
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  //   console.log("Input Event Fired");
  let inputVal = search.value.toLowerCase();
  //   console.log(inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let titleName = element.getElementsByTagName("h5")[0].innerText;
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.includes(inputVal) || titleName.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
