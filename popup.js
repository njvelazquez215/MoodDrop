// Esperar a que cargue todo el HTML
document.addEventListener('DOMContentLoaded', function () {
    const emotionButtons = document.querySelectorAll('.emotion');
    const confirmation = document.getElementById('confirmation');

    emotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.dataset.emotion;
            const now = new Date();
            const entry = {
                emotion: emotion,
                timestamp: now.toISOString()
            };

            // Leer datos anteriores
            chrome.storage.sync.get({ moodLog: [] }, function (data) {
                const updatedLog = [...data.moodLog, entry];

                // Guardar nuevo estado
                chrome.storage.sync.set({ moodLog: updatedLog }, function () {
                    console.log('Emoción guardada:', entry);

                    // Mostrar confirmación
                    confirmation.classList.remove('hidden');

                    // Ocultar mensaje después de 2 segundos
                    setTimeout(() => {
                        confirmation.classList.add('hidden');
                    }, 2000);
                });
            });
        });
    });
});
