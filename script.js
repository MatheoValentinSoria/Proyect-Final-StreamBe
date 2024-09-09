// Usuarios predefinidos
let users = [
    { name: 'Admin', telephone: '123456789', email: 'admin@example.com', password: 'admin', role: 'admin' },
    { name: 'User', telephone: '987654321', email: 'user@example.com', password: 'User', role: 'user' }
];

// Guardar y cargar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
}

// Manejar registro de usuario
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('regName').value;
    const telephone = document.getElementById('regTelephone').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    const newUser = { name, telephone, email, password, role };
    users.push(newUser);
    saveUsers();

    alert('Usuario registrado con éxito');
});

// Manejar login de usuario
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'turnos.html';
        }
    } else {
        alert('Credenciales incorrectas');
    }
});

// Cargar usuarios en la tabla de admin.html
function loadUsersToTable() {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.telephone}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="deleteUser(${index})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Eliminar usuario
function deleteUser(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        users.splice(index, 1);
        saveUsers();
        loadUsersToTable();
    }
}

// Inicializar
loadUsers();

if (document.body.contains(document.querySelector('#usersTable'))) {
    loadUsersToTable();
}


