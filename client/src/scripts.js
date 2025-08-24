document.addEventListener('DOMContentLoaded', () => {
  const clearCanvasBtn = document.getElementById('clear-btn');
  clearCanvasBtn.addEventListener('click', clearCanvas);

  // Existing drag-and-drop logic
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    canvas.classList.add('drag-over');
  });

  canvas.addEventListener('dragleave', (e) => {
    e.preventDefault();
    canvas.classList.remove('drag-over');
  });

  canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    canvas.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const element = document.getElementById(id);
    if (element) {
      const rect = canvas.getBoundingClientRect();
      element.style.position = 'absolute';
      element.style.left = (e.clientX - rect.left - 50) + 'px';
      element.style.top = (e.clientY - rect.top - 25) + 'px';
      canvas.appendChild(element);
    }
  });
});

function clearCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center p-8">
                <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">cloud_upload</span>
                <p class="text-gray-500 text-lg">Drag components here to start building</p>
            </div>
        </div>
    `;
    componentCount = 0;
}