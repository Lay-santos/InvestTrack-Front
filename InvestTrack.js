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
                            <p>${element.stock}</p>
                            <p>${element.close}</p>
                    </div>
                    

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

                    divBaixa.classList.add("cardBaixas")
                    divBaixa.innerHTML =
                    `
                    <div class="contentBaixas">
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close}</p>
                    </div>
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

                    divPopulares.classList.add("cardBaixas")
                    divPopulares.innerHTML =
                    `
                    <div class="contentBaixas">
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close}</p>
                    </div>
                `
                    boardPopulares.append(divPopulares)

                })
            });
    }
    Popular()






})
