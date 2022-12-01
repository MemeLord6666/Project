let API = "http://localhost:8000/products";

// Кодовые слова
let section_add = document.querySelector(".section_add")
let clickAdmin = document.getElementById("open-admin")
let admin_panel_arr = document.getElementsByClassName("admin-panel")
let code = ""

// инпуты и кнопки для создания новых данных
let inpDetails = document.querySelector(".section_add_details")
let inpPrice = document.querySelector(".section_add_price")
let inpQuantity = document.querySelector(".section_add_quantity")
let inpCategory = document.querySelector(".section_add_category")
let inpSales = document.querySelector(".section_add_sales")
let inpUrl = document.querySelector(".section_add_url")
let btnAdd = document.querySelector(".section_add_btn-add")


// тег для отображения данных в браузере
let sectionRead = document.getElementById("section__read")
let accordion = document.querySelector(".accordion_header")

function adminReturn (){
    section_add.style.display = "block"
    if(code != "1"){
        setTimeout (()=>{
            for(let i of admin_panel_arr){
                i.style.display = "none"
            }
        }, 50)
    }
}

clickAdmin.addEventListener("click", ()=>{
    code = prompt("Введите ключевое слово")
    if(code === "1"){
        alert("Добро пожаловать!")
        adminReturn() 
    }else{
        alert("Неправильно")
    }
})


// ! ACCORDION START
accordion.addEventListener("click", ()=>{
    accordion.classList.toggle("active")
    let accordionBody = document.getElementById("accordion_body")
    if(accordion.classList.contains("active")){
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
    } else {
        accordionBody.style.maxHeight = 0
    }
})
// ! ACCORDION END

// !CREATE START
function createProduct(obj){
    fetch(API, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(obj),
    }).then((res)=> res.json())
}

btnAdd.addEventListener("click", ()=>{
    // ? Проверка на заполненность полей
    if(
        !inpDetails.value.trim() ||
        !inpPrice.value.trim() ||
        !inpQuantity.value.trim() ||
        !inpCategory.value.trim() ||
        !inpSales.value.trim() ||
        !inpUrl.value.trim() 
        ){
            alert("Заполните поля!")
        };
    let obj = {
        details: inpDetails.value,
        price: inpPrice.value,
        quantity: inpQuantity.value,
        category: inpCategory.value,
        sale: inpSales.value,
        urlImg: inpUrl.value,
    };
    createProduct(obj);
  inpDetails.value = "";
  inpQuantity.value = "";
  inpPrice.value = "";
  inpCategory.value = "";
  inpSales.value = "";
  inpUrl.value = "";
});
// !CREATE END


// !READ START
async function readProducts() {
    let data = await fetch(API).then((res) => res.json());
    console.log(data);
    sectionRead.innerHTML = "";
    data.forEach((item) => {
      // let productCard = document.createElement("div");
      sectionRead.innerHTML += `
        <div class="card">
          <div class="card2">
            <div class="front2" style="background-image: url(${item.urlImg})"></div>
            <div class="back2">
              <div id="card-details2">
              <p>${item.details}</p>
              </div>
            </div>
            <div class="text">
              <h2>${item.category}</h2>
              <span class="card_price">Цена: ${item.price} сом</span>
              <br />
              <span class="card_sales">Скидка: ${item.sale} %</span>
            </div>
            <div class="userIcon" id="userPanel">
              <img src="https://cdn-icons-png.flaticon.com/512/2107/2107956.png" alt="" width="20px" />
              <button class="btnBuy">Выбрать</button>
            </div>
            <div class="admin-panel" id="admin">
              <img src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" width="20px" class="read_del" />
              <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" width="20px" />
            </div>
          </div>
        </div>
      `;
    });
  }
  readProducts();
// !READ END

