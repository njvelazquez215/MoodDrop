document.addEventListener('DOMContentLoaded', function () {
    const emotionButtons = document.querySelectorAll('.emotion');
    const confirmation = document.getElementById('confirmation');

    if (!emotionButtons || emotionButtons.length === 0) {
        console.error("No se encontraron botones de emociones.");
        return;
    }

    emotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.dataset.emotion;
            const now = new Date();
            const entry = {
                emotion: emotion,
                timestamp: now.toISOString()
            };

            // Obtener los registros anteriores
            chrome.storage.sync.get({ moodLog: [] }, function (data) {
                const updatedLog = [...data.moodLog, entry];

                // Guardar nueva entrada
                chrome.storage.sync.set({ moodLog: updatedLog }, function () {
                    console.log('Emoción guardada:', entry);

                    // Mostrar confirmación
                    confirmation.classList.remove('hidden');
                    confirmation.classList.add('visible');

                    // Ocultar mensaje luego de 2 segundos
                    setTimeout(() => {
                        confirmation.classList.remove('visible');
                        confirmation.classList.add('hidden');
                    }, 2000);
                });
            });
        });
    });
});
