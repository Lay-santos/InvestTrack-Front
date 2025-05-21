let board = document.querySelector(".board")

let cardPopulares = document.querySelector(".cardPopulares")
let cardAltas = document.querySelector(".cardAltas")
let CardBaixas = document.querySelector(".CardBaixas")

let contentPopulares = document.querySelector(".contentPopulares")
let contentAltas = document.querySelector(".contentAltas")
let contentBaixas = document.querySelector(".contentBaixas")


// chrome.exe --disable-web-security --user-data-dir="C:/temp-chrome"

document.addEventListener("DOMContentLoaded", () => {
    const ApiAlta = "https://investtrack-j5re.onrender.com/acoes/altas"
    const ApiBaixa = "https://investtrack-j5re.onrender.com/acoes/baixas"
    const ApiPopular = "https://investtrack-j5re.onrender.com/acoes/populares"

    function Alta() {
        fetch(ApiAlta)
            .then((res) => res.json())
            .then(data => {
                data.stocks.forEach(element => {
                    const divAlta = document.createElement("div")

                    divAlta.classList.add("cardAltas")
                    divAlta.innerHTML = 
                    `
                    <div class="contentAltas">
                            <p>${element.name}</p>
                    </div>
                    

                    `
                    board.append(divAlta)
                });
            });

    }
    Alta()

    function Baixa() {
        fetch(ApiBaixa)
            .then((res) => res.json())
            .then(data1 => console.log("Baixa", data1));

    }
    Baixa()
    function Popular() {
        fetch(ApiPopular)
            .then((res) => res.json())
            .then(data2 => console.log("Popular", data2));

    }
    Popular()






})
