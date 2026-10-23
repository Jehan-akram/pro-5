let searchInput = document.getElementById("searchInput")
let addBtn = document.getElementById("addBtn")
let gadgetsContainer = document.getElementById("gadgetsContainer")
let edit = null
let gadgetsCount = document.getElementById("gadgetsCount")

let gadgets = [
    {id : 1, name :"AirPods Pro", price : 1200 ,img : "images/1.jpeg"},
    {id : 2, name :"Smart Watch", price : 950 ,img : "images/4.jpeg"},
    {id : 3, name :"Speaker JBL", price : 2200 ,img : "images/3.jpeg"},
    {id : 5, name :"Power Bank 20000mAh", price : 650 ,img : "images/2.jpeg"}
]
gadgetsCount.innerHTML =`${gadgets.length} عدد المنتجات`

function drow(){
  gadgetsContainer.innerHTML = "";
  gadgets.forEach((ele) =>{
    gadgetsContainer.innerHTML += `
      <div class="col-12 col-md-4">
        <div class="h-100 p-3 text-center shadow-sm" style="background:#FFF8E7; border-radius:28px; border:1px solid #F0E0C0;">
          <img src="${ele.img}" style="width:70%; height:200px; object-fit:cover; border-radius:18px; margin: 10px auto; display:block;">
          <h6 class="fw-bold mt-3">${ele.name}</h6>
          <p class="fw-bold small" style="color:#A68A5B;">${ele.price} EGP</p>
          <div class="d-flex justify-content-center gap-2 mt-2">
            <button onclick="editBtn(${ele.id})" class="btn btn-sm px-4 rounded-pill" style="background:#EAD7B0; border:none;">Edit</button>
            <button onclick="deleteBtn(${ele.id})" class="btn btn-sm px-4 rounded-pill btn-dark">حذف</button>
          </div>
        </div>
      </div>
    `;
  })
}
drow();

searchInput.addEventListener("input", ()=>{
  if(searchInput.value != ""){
    addBtn.removeAttribute("disabled")
  }else{
    addBtn.setAttribute("disabled",true)
  }
})

addBtn.addEventListener("click" ,() =>{
  if(edit){
    let findGadget = gadgets.find(f => f.id === edit)
    if(findGadget){
      findGadget.name = searchInput.value
      drow()
    }
    edit = null
    addBtn.innerHTML = "Add"
  }
  else{
    let db = gadgets.some(d => d.name === searchInput.value)
    if(db){
      alert("الاسم موجود مسبقا")
      return;
  }
   let lasID = gadgets.length? gadgets[gadgets.length-1].id:0;
   gadgets.push({id: ++lasID , name:searchInput.value , price:prompt("ادخل السعر") , img:prompt("ادخل لينك الصورة")});
   drow()
  }
  gadgetsCount.innerHTML =`${gadgets.length} عدد المنتجات`
  searchInput.value =""
  addBtn.setAttribute("disabled", true);
})

function deleteBtn(id){
  let index = gadgets.findIndex(del => del.id === id);
  if(index !== -1){
    gadgets.splice(index , 1);
  }
  drow()
  gadgetsCount.innerHTML =`${gadgets.length} عدد المنتجات`
}

function editBtn(id){
  let findGadget = gadgets.find(f => f.id === id)
  if(findGadget){
    searchInput.value = findGadget.name
    addBtn.removeAttribute("disabled")
    addBtn.innerText = "Save Edit"
    edit = id
  }
}