document.addEventListener("DOMContentLoaded", () => {
    const ApiAlta = "https://investtrack-j5re.onrender.com/acoes/altas"
    const ApiBaixa = "https://investtrack-j5re.onrender.com/acoes/baixas"
    const ApiPopular = "https://investtrack-j5re.onrender.com/acoes/populares"
    

    function Alta() {
        fetch(ApiAlta)
            .then((res) => res.json())
            .then(result => {
                result.forEach(alta => {

                });
            })
    }

    function Baixa() {
        fetch(ApiBaixa)
            .then((res) => res.json())
            .then(result => {
                result.forEach(baixa => {

                });
            })
    }
    function Popular() {
        fetch(ApiPopular)
            .then((res) => res.json())
            .then(result => {
                result.forEach(popular => {

                });
            })
    }
})