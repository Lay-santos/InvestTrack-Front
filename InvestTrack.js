let boardAltas = document.querySelector(".boardAltas")
let boardBaixas = document.querySelector(".boardBaixas")
let boardPopulares = document.querySelector(".boardPopulares")


let cardPopulares = document.querySelector(".cardPopulares")
let cardAltas = document.querySelector(".cardAltas")
let cardBaixas = document.querySelector(".cardBaixas")

let contentPopulares = document.querySelector(".contentPopulares")
let contentAltas = document.querySelector(".contentAltas")
let contentBaixas = document.querySelector(".contentBaixas")


// chrome.exe --disable-web-security --user-data-dir="C:/temp-chrome"

document.addEventListener("DOMContentLoaded", () => {
    const ApiAlta = "https://investtrack-api.onrender.com/acoes/altas"
    const ApiBaixa = "https://investtrack-api.onrender.com/acoes/baixas"
    const ApiPopular = "https://investtrack-api.onrender.com/acoes/populares"

    function Alta() {
        fetch(ApiAlta)
            .then((res) => res.json())
            .then(data => {
                data.stocks.forEach(element => {
                    const divAlta = document.createElement("div")

                    divAlta.classList.add("stocks")

                    divAlta.innerHTML =
                        `
                        <a href="/pesquisar.html?${element.stock}">
                            <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="${element.change < 0 ? 'abaixoDeZero' : 'acimaDeZero'}">${element.change.toLocaleString('pt-BR')}</p>

                            </div>

                    </div>
                        </a>
                    `


                    boardAltas.append(divAlta)
                });
            });

    }
    Alta()

    function Baixa() {

        fetch(ApiBaixa)
            .then((res) => res.json())
            .then(data1 => {
                data1.stocks.forEach(element => {
                    const divBaixa = document.createElement("div")
                    divBaixa.classList.add("stocks")

                    divBaixa.innerHTML =
                       `
                        <a href="/pesquisar.html?${element.stock}">
                            <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>

                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="${element.change < 0 ? 'abaixoDeZero' : 'acimaDeZero'}">${element.change.toLocaleString('pt-BR')}</p>
                            </div>


                         </div>
                        </a>
                    `
                    boardBaixas.append(divBaixa)

                })
            });

    }
    Baixa()
    function Popular() {
        fetch(ApiPopular)
            .then((res) => res.json())
            .then(data2 => {
                data2.stocks.forEach(element => {
                    const divPopulares = document.createElement("div")

                    divPopulares.classList.add("stocks")

                    divPopulares.innerHTML =
                       `
                        <a href="/pesquisar.html?${element.stock}">
                            <div class="contentStocks">

                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="${element.change < 0 ? 'abaixoDeZero' : 'acimaDeZero'}">${element.change.toLocaleString('pt-BR')}</p>

                            </div>

                    </div>
                        </a>
                    `


                    boardPopulares.append(divPopulares)

                })
            });
    }
    Popular()






})
// ----------------------
const btnFavoritos = document.querySelector("#btnFavoritos");
const token = sessionStorage.getItem("tokenInvestTrack");

if (token) {
    // Usuário logado – mostra ícone de coração
    btnFavoritos.innerHTML = `
        <img class="animated-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB2klEQVR4nO2WO2sVURSFr4/4gGtvI0gKg42NWqiN+BcsbASD/yA+Cmuxs/BPqCBYBO0UCwvBVrETTOIjieIDY4z3nG/NkkPGMBnn5s59TLTIggMDs8/6Zs7s2Xu3Wlv6lwohHAemgRngPTALvAKmbLfL8bb3AZfzmNl8T9o7HUI41hNoexdwD/iUZZnLkvQrGYcQThQe8hQwl+6V45NH8oox3rU91g26HXgiacU9BHxM8BDCyXTdK17ST+Cx7W1/gYFrkpZ6mRTgc2nVjZe0BFwtv+1Y+i51TXKjmFY/e4B3tneugWOMZ4CvbljAlxjj6eIxX6lKplErW022S2tgSdc3CyzpRvGoz0pabhosKQIXisnVBuabBgMLtg+uy2xJN6uKwIjBL6sKSDtP96ag34BzldULOA98bgj8orJyFRLtdp2yOcC3negKzY98T+oykrJRFQ3g4obQAnx/amvDQiX9iDHeqQUtwA8BH4aArgCPbO/oC5wUQjg6CFxSB3hue3ff0D+yfRh42wd0GXhqe29rWNmeqAOX9B14sK71jQA+nsaebs0kb3m3NvxXB5XtA8BrSZSgi8DkwMZ1lE+Uz9IcJSkAbzqdzpHWZsiro9J94GHVuLul/0q/AZlIdNW4bUvwAAAAAElFTkSuQmCC"
            alt="filled-like--v2">
    `;
    btnFavoritos.addEventListener("click", () => {
        window.location.href = "favoritos.html";
    });
} else {
    // Usuário não logado – mostra SVG de usuário original
    btnFavoritos.innerHTML = `
        <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-user-icon lucide-user">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    `;
    btnFavoritos.addEventListener("click", () => {
        window.location.href = "/Login/login.html";
    });
}
