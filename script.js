document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checklist-item input');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Загрузка сохраненных данных
    function loadProgress() {
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
        });
        updateProgress();
    }
    
    // Обновление прогресса
    function updateProgress() {
        const checkedCount = document.querySelectorAll('.checklist-item input:checked').length;
        const total = checkboxes.length;
        const percentage = Math.round((checkedCount / total) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% завершено`;
        
        // Сохранение состояния
        checkboxes.forEach(checkbox => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }
    
    // Назначение обработчиков
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    // Инициализация
    loadProgress();
});
