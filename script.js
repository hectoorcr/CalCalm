const addBtn = document.getElementById('add-exercise');
const nameInput = document.getElementById('exercise-name');
const specsInput = document.getElementById('exercise-specs');
const tableBody = document.getElementById('exercise-table-body');

// Función para agregar ejercicio
addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const specs = specsInput.value.trim();

    if(name === "" || specs === "") {
        alert("Por favor completa ambos campos");
        return;
    }

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${specs}</td>
        <td><button class="delete-btn">Eliminar</button></td>
    `;

    tableBody.appendChild(row);

    // Limpiar inputs
    nameInput.value = "";
    specsInput.value = "";
});

// Función para eliminar ejercicio
tableBody.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')) {
        e.target.parentElement.parentElement.remove();
    }
});
