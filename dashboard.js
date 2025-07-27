document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ moodLog: [] }, function (data) {
        const moodLog = data.moodLog || [];
        const today = new Date().toISOString().split('T')[0];

        const todayEntries = moodLog.filter(entry => entry.timestamp.startsWith(today));
        const last7daysEntries = moodLog.filter(entry => {
            const date = new Date(entry.timestamp);
            const now = new Date();
            return (now - date) / (1000 * 60 * 60 * 24) < 7;
        });

        renderTodayLog(todayEntries);
        renderWeeklyChart(last7daysEntries);
        renderTrendChart(moodLog);
        renderAverageEmotion(todayEntries);
    });
});

// === RENDER FUNCTIONS ===

function renderTodayLog(entries) {
    const list = document.getElementById('today-log');
    list.innerHTML = '';

    if (entries.length === 0) {
        list.innerHTML = '<li>No registraste emociones hoy.</li>';
        return;
    }

    entries.forEach((entry, index) => {
        const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${entry.emotion} (${time})</span>
            <button class="delete-btn" data-index="${index}" title="Eliminar">🗑️</button>
        `;
        list.appendChild(li);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = parseInt(btn.dataset.index);
            chrome.storage.sync.get({ moodLog: [] }, function (data) {
                const today = new Date().toISOString().split('T')[0];
                const moodLog = data.moodLog || [];
                const newLog = moodLog.filter(entry => !entry.timestamp.startsWith(today));
                const todayEntries = moodLog.filter(entry => entry.timestamp.startsWith(today));
                todayEntries.splice(i, 1);
                const updated = [...newLog, ...todayEntries];
                chrome.storage.sync.set({ moodLog: updated }, () => location.reload());
            });
        });
    });
}

function renderWeeklyChart(entries) {
    const container = document.getElementById('weeklyChart').parentElement;
    if (entries.length === 0) return addNoDataMessage(container);

    const counts = {};
    entries.forEach(entry => {
        counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
    });

    const ctx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: 'Frecuencia',
                data: Object.values(counts),
                backgroundColor: '#4dabf7',
                borderRadius: 5
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

function renderTrendChart(entries) {
    const container = document.getElementById('trendChart').parentElement;
    if (entries.length === 0) return addNoDataMessage(container);

    const dayMap = {};
    entries.forEach(entry => {
        const date = entry.timestamp.split('T')[0];
        if (!dayMap[date]) dayMap[date] = [];
        dayMap[date].push(entry.emotion);
    });

    const sortedDates = Object.keys(dayMap).sort();
    if (sortedDates.length === 0) return addNoDataMessage(container);

    const labels = [];
    const data = [];

    sortedDates.forEach(date => {
        const emos = dayMap[date];
        const mode = mostFrequent(emos);
        labels.push(date);
        data.push(mode);
    });

    const uniqueEmotions = [...new Set(entries.map(e => e.emotion))];
    const emotionToNumber = Object.fromEntries(uniqueEmotions.map((e, i) => [e, i + 1]));
    const numberToEmotion = Object.fromEntries(Object.entries(emotionToNumber).map(([e, i]) => [i, e]));
    const numericData = data.map(e => emotionToNumber[e]);

    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Emoción dominante',
                data: numericData,
                fill: false,
                borderColor: '#ffa94d',
                tension: 0.3,
                pointBackgroundColor: '#ffa94d'
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => numberToEmotion[context.raw]
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        stepSize: 1,
                        callback: (val) => numberToEmotion[val] || ''
                    }
                }
            }
        }
    });
}

function renderAverageEmotion(entries) {
    const el = document.getElementById('averageEmoji');
    if (entries.length === 0) {
        el.textContent = "❓";
        return;
    }

    const counts = {};
    entries.forEach(entry => {
        counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
    });

    const [mostFrequentEmotion] = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b));
    el.textContent = emotionToEmoji(mostFrequentEmotion);
}

// === UTILS ===

function mostFrequent(arr) {
    const freq = {};
    arr.forEach(item => freq[item] = (freq[item] || 0) + 1);
    return Object.entries(freq).reduce((a, b) => a[1] > b[1] ? a : b)[0];
}

function emotionToEmoji(emotion) {
    const map = {
        "Feliz": "😄", "Tranquilo": "😊", "Enamorado": "😍", "Motivado": "😎",
        "Triste": "😞", "Enojado": "😠", "Ansioso": "😨", "Frustrado": "😩",
        "Indiferente": "😐", "Cansado": "😴", "Pensativo": "🤔", "Confundido": "😶",
        "Enfermo": "🤒", "Descompuesto": "🤢", "Picaro": "😏", "Incómodo": "😬"
    };
    return map[emotion] || "❓";
}

function addNoDataMessage(container) {
    container.innerHTML += '<p style="color: #999; font-size: 13px;">Sin datos suficientes para mostrar.</p>';
}
