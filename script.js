function exportToAppleNotes() {
    // Создаем текст с emoji для лучшего отображения
    let notesContent = `Ехать готов — Чек-лист для отпуска\n\n`;
    
    document.querySelectorAll('.category').forEach(category => {
        const categoryTitle = category.querySelector('h3').textContent;
        notesContent += `▫️ ${categoryTitle}\n`;
        
        category.querySelectorAll('.checkbox-container').forEach(item => {
            const isChecked = item.querySelector('input').checked;
            const itemText = item.textContent.trim();
            notesContent += `   ${isChecked ? '✅' : '☐'} ${itemText}\n`;
        });
        
        notesContent += '\n';
    });
    
    // Создаем временный элемент для копирования
    const textarea = document.createElement('textarea');
    textarea.value = notesContent;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        alert('Чек-лист скопирован! Вставьте его в приложение "Заметки".\n\nСовет: Для лучшего форматирования используйте моноширинный шрифт в настройках заметки.');
    } catch (err) {
        alert('Не удалось скопировать. Попробуйте выделить текст вручную:\n\n' + notesContent);
    }
    
    document.body.removeChild(textarea);
    
    // Альтернатива для iOS
    if (navigator.share) {
        navigator.share({
            title: 'Чек-лист для отпуска',
            text: notesContent
        }).catch(err => {
            console.log('Ошибка sharing:', err);
        });
    }
}
