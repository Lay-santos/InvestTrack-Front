document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Exibe animação do touro
    document.getElementById("touro").style.animation = "pular 1s ease-in-out 3";

    // Simula redirecionamento para o dashboard
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 3000);
});

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Simula login e redireciona
    window.location.href = "dashboard.html";
});