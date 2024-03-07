const startDictation = document.createElement('button');
startDictation.textContent = 'Start Dictation';
startDictation.id = 'startDictation'; // Устанавливаем идентификатор
startDictation.style.position = 'absolute';

// Добавляем кнопку на страницу
document.body.appendChild(startDictation);

// Проверяем поддержку браузером Web Speech API
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ru-RU'; // Устанавливаем язык распознавания
    recognition.profanityFilter = false;
    recognition.interimResults = false;
    // Начинаем распознавание при клике на кнопку
    startDictation.addEventListener('click', function() {
        const textarea = document.querySelector('textarea'); // Выбираем textarea в текущем диалоге
        if (textarea) {
            textarea.focus(); // Перед началом распознавания устанавливаем фокус на textarea
            recognition.start();
        }
    });

    // Обработчик события для распознавания речи
    recognition.onresult = function(event) {
        const textarea = document.querySelector('textarea'); // Выбираем textarea в текущем диалоге
        if (textarea) {
            const transcript = event.results[0][0].transcript;
            textarea.value += transcript + ' '; // добавляем текст к существующему значению textarea
            textarea.dispatchEvent(new Event('input')); // явно генерируем событие input
        }
    };

    // Обработчик события для ошибок при распознавании
    recognition.onerror = function(event) {
        console.error('Recognition error:', event.error);
    };
} else {
    console.error('Your browser does not support speech recognition.');
}
