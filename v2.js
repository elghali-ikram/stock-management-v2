class product {
  constructor(nom,marque,prix,date,type,promo){
    this.name=nom;
    this.brand=marque;
    this.price=prix;
    this.dat=date;
    this.typ=type;
    this.discount=promo;
  }
  getproduct()
  {
    return `nom :${this.name} <br> marque :${this.brand} <br> prix :${this.price} <br> date :${this.dat} <br> promo :${this.discount} <br> `
  }
  table() {
    return [this.name, this.brand, this.price, this.dat, this.typ, this.discount, `<button id="remove${count}" onclick='confirmationdelete(this);' ><i class="fa-solid fa-trash"></i></button><button onclick='productUpdate(this);'><i class="fa-solid fa-pen-to-square"></i></button>`]
  } 
}
// ---------- function return value of input ------------
function getinputvalue() {
  const nom = document.getElementById("nom").value;
  const marque = document.getElementById("marque").value;
  const prix = document.getElementById("prix").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;
  const promotion = document.getElementsByName("promotion");
  return new product(nom,marque,prix,date,type,getpromo(promotion));
}
// ---------- function return  input ------------
function getinput()
{
  const nom = document.getElementById("nom");
  const marque = document.getElementById("marque");
  const prix = document.getElementById("prix");
  const date = document.getElementById("date");
  const type = document.getElementById("type");
  const promo = document.getElementsByName("promotion");
  return new product(nom,marque,prix,date,type,promo);
}
// ---------- function  for regex test input value ------------
function validinput(input, regex, message) {
  regex.test(input.value) == true ? (setsucces(input)) : (setError(input, message), input.focus())
}
// ---------- function  for check date ------------
function checkdate()
{
  const today = new Date();
  const date1=new Date(getinput().dat.value)
  if(getinput().dat.value =="")
  {
    setError(getinput().dat,"champ no valid")
  }
  else{
    if(today < date1 )
    {
      setError(getinput().dat,"champ no valid")
    }
    else
    {
      setsucces(getinput().dat)
    }
  }
}
// ---------- function  return value of pro ------------
function getpromo(listpromo) {
  for (let i = 0; i < listpromo.length; i++) {
    if (listpromo[i].checked) {
      return listpromo[i].value;
    }
  }
}
// ---------- function  for error ------------
function setError(input, message) {
  var formcontrol = input.closest(".form-control");
  var small = formcontrol.querySelector("small");
  if (formcontrol.classList.contains("form-control-succes")) {
    formcontrol.classList.remove("form-control-succes");
  }
  formcontrol.classList.add("form-control-error");
  small.textContent = message;
}
// ---------- function  for succes ------------
function setsucces(input) {
  var formcontrol = input.closest(".form-control");
  var small = formcontrol.querySelector("small");
  if (formcontrol.classList.contains("form-control-error")) {
    formcontrol.classList.remove("form-control-error");
  }
  formcontrol.classList.add("form-control-succes");
  small.textContent = " ";
}
// ---------- function validate inputs ------------
function checkinputs() {
  validinput(getinput().name, /^(^[a-z]+['-\s]?[a-z]+)$/, "champ no valid")
  validinput(getinput().brand, /^(^[a-z]+['-\s]?[a-z]+)$/, "champ no valid")
  validinput(getinput().price, /^(^\d+([,.]?\d+$)?)$/, "champ no valid")
  checkdate()
   if (getinput().typ.selectedIndex < 1) {
    setError(getinput().typ, "champ obligatoire");
  } else {
    setsucces(getinput().typ);
  }
  for (let i = 0; i < getinput().discount.length; i++) {
    if (getinput().discount[i].checked) {
      setsucces(getinput().discount[i]);
      break;
    } else {
      setError(getinput().discount[i], "champ obligatoire");
    }
  }
}
// ---------- function  for reset form ------------
function clearinput() {
  document.getElementById("form").reset();
  var formcontrol = document.querySelectorAll(".form-control");
  formcontrol.forEach((ele) => {
    if (ele.classList.contains("form-control-succes")) {
      ele.classList.remove("form-control-succes");
    }
  });
}
// ---------- check  input  ------------
getinput().name.addEventListener('input', function () {
  validinput(getinput().name, /^(^[a-z]+['-\s]?[a-z]+)$/gi, "champ no valid")
})
getinput().brand.addEventListener('input', function () {
  validinput(getinput().brand, /^(^[a-z]+['-\s]?[a-z]+)$/gi, "champ no valid")
})
getinput().price.addEventListener('input', function () {
  validinput(getinput().price, /^(^\d+([,.]?\d+$)?)$/gi, "champ no valid")
})
getinput().typ.addEventListener('input', function () {
  if (getinput().typ.selectedIndex < 1) {
    setError(getinput().typ, "champ obligatoire");
  } else {
    setsucces(getinput().typ);
  }
})
getinput().dat.addEventListener('input', function () {
 checkdate()
})
// ---------- function return if input has a error ------------
function isFormValid() {
  const inputContainers = document.querySelectorAll(".form-control");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("form-control-error")) {
      result = false;
    }
  });
  return result;
}
// ---------- add onclick to buttn add ------------
var tableau = document.getElementById("productList");
let count=0
var btnadd = document.getElementById("ajouter");
btnadd.addEventListener("click", checkproduct);
function checkproduct() {
  if (btnadd.value === "AJOUTER") {
    console.log(nom.closest(".form-control"));
    checkinputs();
    if (isFormValid() == true) {
      count++;
      showModal1()
      add(getinputvalue().table());
      window.localStorage.setItem(getinputvalue().brand, JSON.stringify(getinputvalue().table()))
      clearinput();
      forsort()
    } 
  } 
  else if (btnadd.value === "Modifier") {
    checkinputs();
    if (isFormValid() == true) {
      updatein();
    } 
  }
}
function forsort()
{
  var table = document.getElementById("productList")
  var table, rows, switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
// ---------- function for add product ------------
function add(tabl) {
  var row = document.createElement("tr");
  row.setAttribute("id", "tr" + count);
  tableau.appendChild(row);
  for (let i = 0; i < tabl.length; i++) {
    var row1 = document.getElementById("tr" + count);
    var cell = document.createElement("td");
    cell.setAttribute("id", "td" + count + i);
    cell.innerHTML = tabl[i];
    row1.appendChild(cell);
  }
}
// ---------- function for getdata from local storage ------------
function getdata()
{
  let items=[]
  keys = Object.keys(localStorage)
  for (let i = 0; i < keys.length; i++) {
    items.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return items
}
// ---------- put data in table ------------
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < getdata().length; i++) {
    add(getdata()[i]);
    count++;
  }
  forsort();
})
// ---------- function for set value in input ------------
let idrowforupdat
let keyforupdat
function productUpdate(idrow) {
  keyforupdat = window.localStorage.key(idrow)
  var row = idrow.closest("tr");
  var cols = row.querySelectorAll("td");
  for (let i = 0; i < getinput().table().length; i++) {
    getinput().table()[i].value=cols[i].innerHTML
  }
  for (let i = 0; i < getinput().discount.length; i++) {
    if (getinput().discount[i].value == cols[5].innerHTML) {
      console.log(getinput().discount[i].value);
      getinput().discount[i].checked = true;
    }
  }
  btnadd.value = "Modifier";
  idrowforupdat = row;
}
// ---------- function for updat product ------------
function updatein() {
  var cols = idrowforupdat.querySelectorAll("td");
  for (let i = 0; i < cols.length; i++) {
    cols[i].innerHTML = getinputvalue().table()[i];
    console.log(getinputvalue().table()[i]);
  }
  localStorage.setItem(keyforupdat, JSON.stringify(getinputvalue().table()));
  clearinput();
  btnadd.value = "AJOUTER";
}
// ---------- function for execut modal ------------
const modal = document.querySelector(".modal");
const modal1 = document.querySelector(".modal1");
const closeButton = document.querySelector("#cancel");
const okeyButton = document.querySelector("#okey");
const deletButton = document.querySelector("#delete");
let getrow
let KeyName
function confirmationdelete(idrow) {
  KeyName = window.localStorage.key(idrow)
  getrow = idrow.closest("tr")
  if (modal.classList.contains("close-modal")) {
    modal.classList.remove("close-modal");
  }
  modal.classList.add("show-modal");
}
function deleteproduct() {
  getrow.remove();
  window.localStorage.removeItem(KeyName);
  closeModal();
}
function closeModal() {
  if (modal.classList.contains("show-modal")) {
    modal.classList.remove("show-modal");
  }
  modal.classList.add("close-modal");
}
function closeModal1() {
  if (modal1.classList.contains("show-modal")) {
    modal1.classList.remove("show-modal");
  }
  modal1.classList.add("close-modal");
}
function showModal1() {
  if (modal1.classList.contains("close-modal")) {
    modal1.classList.remove("close-modal");
  }
  document.querySelector(".modal1-text").innerHTML=getinputvalue().getproduct();
  modal1.classList.add("show-modal");
}
okeyButton.addEventListener("click", closeModal1);
closeButton.addEventListener("click", closeModal);
deletButton.addEventListener("click", deleteproduct);
//--------search a product------
var btnsearch = document.getElementById("btnsearch");
var inputsearch = document.getElementById("search");
btnsearch.addEventListener('click', function () {
  const tr = tableau.querySelectorAll("tr")
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td.innerHTML == inputsearch.value) {
      console.log("mzian 3lik");
      alert('find')
    }
    else {
      alert("don't find it")
    }
  }
})