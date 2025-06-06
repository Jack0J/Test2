document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Загрузка сохраненного прогресса
    function loadProgress() {
        checkboxes.forEach(checkbox => {
            const itemId = checkbox.parentElement.textContent.trim();
            checkbox.checked = localStorage.getItem(itemId) === 'true';
        });
        updateProgress();
    }
    
    // Обновление прогресса
    function updateProgress() {
        const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const total = checkboxes.length;
        const percentage = Math.round((checkedCount / total) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% завершено`;
        
        // Сохранение состояния
        checkboxes.forEach(checkbox => {
            const itemId = checkbox.parentElement.textContent.trim();
            localStorage.setItem(itemId, checkbox.checked);
        });
    }
    
    // Экспорт в Apple Notes
    function exportToAppleNotes() {
        let content = "Ехать готов — Чек-лист\n\n";
        
        document.querySelectorAll('.category').forEach(category => {
            const title = category.querySelector('h3').textContent;
            content += `▫️ ${title}\n`;
            
            category.querySelectorAll('.checkbox-container').forEach(item => {
                const checked = item.querySelector('input').checked;
                const text = item.textContent.trim();
                content += `   ${checked ? '✅' : '☐'} ${text}\n`;
            });
            
            content += '\n';
        });
        
        // Web Share API для мобильных устройств
        if (navigator.share) {
            navigator.share({
                title: 'Чек-лист для отпуска',
                text: content
            }).catch(err => {
                copyToClipboard(content);
            });
        } else {
            copyToClipboard(content);
        }
    }
    
    // Копирование в буфер обмена
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('Чек-лист скопирован! Вставьте его в Заметки.');
        } catch (err) {
            prompt('Скопируйте этот текст:', text);
        }
        
        document.body.removeChild(textarea);
    }
    
    // Назначение обработчиков
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    document.getElementById('exportApple').addEventListener('click', exportToAppleNotes);
    
    // Инициализация
    loadProgress();
});
