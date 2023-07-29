let container = document.querySelector(".container");
let add_btn = document.getElementById("addbtn");
function getAppLocal(){
   return JSON.parse(localStorage.getItem('muruga-app') || "[]");
   
}  
getAppLocal().forEach(element => {
   let textElement = addContent(element.id,element.content);
   container.insertBefore(textElement,add_btn);

   
});   
function addContent(id,content){
   let textElement =document.createElement('textarea');
   textElement.classList.add('sticky');
   textElement.value = content;
   textElement.placeholder = 'type here'
   textElement.addEventListener('change',()=>{
      updateElement(id,textElement.value);
   });
   
textElement.addEventListener("dblclick",()=>{
   const check=confirm("Are You Sure to Delete ?");
   if(check){
     deleteNotes(id,textElement);
   }
 });
   
   return textElement
};
function addSticky(){
   let notes = getAppLocal();
   let notesOb = {
      id:Math.floor(Math.random()*10000),
      content:""
   };
   let textElement = addContent(notesOb.id,notesOb.content);
   notes.push(notesOb);
   container.insertBefore(textElement,add_btn);
   saveNotes(notes);

};
add_btn.addEventListener("click",()=>addSticky());

function saveNotes(notes){

   localStorage.setItem("muruga-app",JSON.stringify(notes));
};
function updateElement(id,content){
 let notes = getAppLocal();
 let updates = notes.filter((note)=>note.id == id)[0];
 updates.content = content;
 saveNotes(notes);};
 
function deleteNotes(id,textElement){
   const notes=getAppLocal().filter((note)=>note.id!=id);
   saveNotes(notes);
   container.removeChild(textElement);
 };





