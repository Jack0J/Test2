document.addEventListener('DOMContentLoaded', function() {
    // Элементы прогресса
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Все чекбоксы
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalItems = checkboxes.length;
    
    // Кнопки экспорта
    const exportText = document.getElementById('exportText');
    const exportNotion = document.getElementById('exportNotion');
    const exportApple = document.getElementById('exportApple');
    
    // Восстановление состояния из localStorage
    function loadProgress() {
        checkboxes.forEach(checkbox => {
            const itemId = checkbox.parentElement.textContent.trim();
            const isChecked = localStorage.getItem(itemId) === 'true';
            checkbox.checked = isChecked;
        });
        updateProgress();
    }
    
    // Обновление прогресса
    function updateProgress() {
        const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((checkedItems / totalItems) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% завершено`;
        
        // Сохранение состояния
        checkboxes.forEach(checkbox => {
            const itemId = checkbox.parentElement.textContent.trim();
            localStorage.setItem(itemId, checkbox.checked);
        });
    }
    
    // Экспорт в текстовый файл
    function exportToTextFile() {
        let textContent = 'TravelReady - Чек-лист для отпуска\n\n';
        let completedCount = 0;
        
        document.querySelectorAll('.category').forEach(category => {
            const categoryTitle = category.querySelector('h3').textContent;
            textContent += `\n${categoryTitle}:\n`;
            
            category.querySelectorAll('.checkbox-container').forEach(item => {
                const isChecked = item.querySelector('input').checked;
                const itemText = item.textContent.trim();
                textContent += `${isChecked ? '✓' : '☐'} ${itemText}\n`;
                if(isChecked) completedCount++;
            });
        });
        
        textContent += `\nПрогресс: ${completedCount}/${totalItems} (${Math.round((completedCount / totalItems) * 100)}%)`;
        
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'travelready-checklist.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Экспорт в Notion
    function exportToNotion() {
        alert('Скопируйте содержимое страницы и вставьте в новый блок в Notion');
        
        let markdownContent = '# TravelReady - Чек-лист для отпуска\n\n';
        let completedCount = 0;
        
        document.querySelectorAll('.category').forEach(category => {
            const categoryTitle = category.querySelector('h3').textContent;
            markdownContent += `## ${categoryTitle}\n`;
            
            category.querySelectorAll('.checkbox-container').forEach(item => {
                const isChecked = item.querySelector('input').checked;
                const itemText = item.textContent.trim();
                markdownContent += `- [${isChecked ? 'x' : ' '}] ${itemText}\n`;
                if(isChecked) completedCount++;
            });
            
            markdownContent += '\n';
        });
        
        markdownContent += `**Прогресс**: ${completedCount}/${totalItems} (${Math.round((completedCount / totalItems) * 100)}%)`;
        
        // Создаем временный textarea для копирования
        const textarea = document.createElement('textarea');
        textarea.value = markdownContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        alert('Чек-лист скопирован в буфер обмена! Вставьте его в Notion.');
    }
    
    // Экспорт в Apple Notes
    function exportToAppleNotes() {
        alert('Для iOS: откройте Заметки, создайте новую заметку и вставьте содержимое');
        
        let htmlContent = '<h1>TravelReady - Чек-лист для отпуска</h1>';
        let completedCount = 0;
        
        document.querySelectorAll('.category').forEach(category => {
            const categoryTitle = category.querySelector('h3').textContent;
            htmlContent += `<h2>${categoryTitle}</h2><ul>`;
            
            category.querySelectorAll('.checkbox-container').forEach(item => {
                const isChecked = item.querySelector('input').checked;
                const itemText = item.textContent.trim();
                htmlContent += `<li>${isChecked ? '✓' : '☐'} ${itemText}</li>`;
                if(isChecked) completedCount++;
            });
            
            htmlContent += '</ul>';
        });
        
        htmlContent += `<p><strong>Прогресс</strong>: ${completedCount}/${totalItems} (${Math.round((completedCount / totalItems) * 100)}%)</p>`;
        
        // Создаем временный textarea для копирования
        const textarea = document.createElement('textarea');
        textarea.value = htmlContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        alert('Чек-лист скопирован в буфер обмена! Вставьте его в Заметки.');
    }
    
    // Назначение обработчиков событий
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    exportText.addEventListener('click', exportToTextFile);
    exportNotion.addEventListener('click', exportToNotion);
    exportApple.addEventListener('click', exportToAppleNotes);
    
    // Загрузка сохраненного прогресса
    loadProgress();
});