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

                    if (element.change < 0) {
                        divAlta.innerHTML =
                            `
                    <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="abaixoDeZero">${element.change.toLocaleString('pt-BR')}</p>
                            </div>

                    </div>
                    `
                    } else {
                        divAlta.innerHTML =
                            `
                    <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="acimaDeZero">${element.change.toLocaleString('pt-BR')}</p>
                            </div>

                    </div>
                    

                    `
                    }

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

                    // não mexer nessa porra, irei deixar comentado caso eu tenho que refazer ou algo do tipo
                    //     divBaixa.innerHTML =
                    //         `
                    //     <div class="contentBaixas">
                    //             <img class ="imagem"  src="${element.logo}" alt="">
                    //             <p>${element.name}</p>
                    //             <p>${element.stock}</p>
                    //             <p class = "close">${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    //             <p class="change">${element.change.toLocaleString('pt-BR')}</p>
                    //     </div>
                    // `

                    if (element.change < 0) {
                        divBaixa.innerHTML =
                            `
                    <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p class = "close">${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="abaixoDeZero">${element.change.toLocaleString('pt-BR')}</p>
                            </div>
                    </div>
                `
                    } else {
                        divBaixa.innerHTML =
                            `
                    <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p class = "close">${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="acimaDeZero">${element.change.toLocaleString('pt-BR')}</p>
                            </div>
                    </div>
                `
                    }

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

                    if (element.change < 0) {
                        divPopulares.innerHTML =
                            `
                    <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="abaixoDeZero">${element.change.toLocaleString('pt-BR')}</p>
                            </div>

                    </div>
                    `
                    } else {
                        divPopulares.innerHTML =topStockCard
                            `
                    <div class="contentStocks">
                            <div class='imageContent'><img class ="imagem"  src="${element.logo}" alt=""></div>
                            <div class='textContent'>
                            <div class='topStockCard'> 
                            <p>${element.name}</p>
                            <p>${element.stock}</p>
                            <p>${element.close.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <p class="acimaDeZero">${element.change.toLocaleString('pt-BR')}</p>
                            </div>

                    </div>
                    

                    `
                    }
                    boardPopulares.append(divPopulares)

                })
            });
    }
    Popular()






})
