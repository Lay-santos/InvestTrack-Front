const ApiAlta = "https://investtrack-j5re.onrender.com/acoes/altas"
const ApiBaixa = "https://investtrack-j5re.onrender.com/acoes/baixas"
const ApiPopular = "https://investtrack-j5re.onrender.com/acoes/populares"

// chrome.exe --disable-web-security --user-data-dir="C:/temp-chrome"

document.addEventListener("DOMContentLoaded", () => {

    function Alta() {
        fetch(ApiAlta)
            .then((res) => res.json())
            .then(data => console.log("Alta",data));

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
            .then(data2 => console.log("Popular",data2));

    }
    Popular()





    
})
