// Tassi di cambio aggiornati
let euroToYenRate = 170.86;
let yenToEuroRate = 1 / euroToYenRate;

const euroInput = document.getElementById('euro');
const yenInput = document.getElementById('yen');
const convertButton = document.getElementById('convert-button');
const message = document.getElementById('message');
const themeToggle = document.getElementById('theme-toggle');

// Funzione di conversione
function convertCurrency() {
    const euroValue = parseFloat(euroInput.value);
    const yenValue = parseFloat(yenInput.value);

    if (!isNaN(euroValue) && isNaN(yenValue)) {
        const yenResult = (euroValue * euroToYenRate).toFixed(2);
        yenInput.value = yenResult;
        message.textContent = `${euroValue.toFixed(2)} Euro corrispondono a ${yenResult} Yen.`;
    } else if (!isNaN(yenValue) && isNaN(euroValue)) {
        const euroResult = (yenValue * yenToEuroRate).toFixed(2);
        euroInput.value = euroResult;
        message.textContent = `${yenValue.toFixed(2)} Yen corrispondono a ${euroResult} Euro.`;
    } else if (isNaN(euroValue) && isNaN(yenValue)) {
        message.textContent = "Inserisci un valore in una delle due valute.";
        euroInput.value = '';
        yenInput.value = '';
    } else {
        message.textContent = "Per favore, inserisci un valore solo in una delle due valute.";
        euroInput.value = '';
        yenInput.value = '';
    }
}

// Funzione per cambiare tema
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

// Aggiorna l'icona del tema in base al tema corrente
function updateThemeIcon(isDark) {
    const path = isDark 
        ? "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25a8.25 8.25 0 01-9.73-8.835 8.25 8.25 0 0015.65 0 8.25 8.25 0 01-5.92 8.835z"
        : "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM12 4v16a8 8 0 000-16z";
    themeToggle.querySelector('path').setAttribute('d', path);
}

// Imposta il tema al caricamento della pagina
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateThemeIcon(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcon(false);
    }
}

// Registra il service worker per la PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registrato con successo:', registration);
        }).catch(error => {
            console.log('Registrazione del Service Worker fallita:', error);
        });
    });
}

// Listeners per gli eventi
convertButton.addEventListener('click', convertCurrency);
themeToggle.addEventListener('click', toggleTheme);
euroInput.addEventListener('input', () => {
    if (euroInput.value !== '') yenInput.value = '';
});
yenInput.addEventListener('input', () => {
    if (yenInput.value !== '') euroInput.value = '';
});

setInitialTheme();