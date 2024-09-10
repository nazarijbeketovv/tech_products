// Получение CSRF-токена из cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Обработчик отправки формы
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    if (!name || !description || !price || price <= 0) {
        showErrorMessage('Please fill in all fields with valid data.');
        return;
    }

    const productData = {
        name: name,
        description: description,
        price: price
    };

    // Отправка POST-запроса для добавления продукта
    fetch('/api/v1/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,  // Добавляем CSRF-токен в заголовок
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            loadProducts(); 
            document.getElementById('productForm').reset(); 
        } else {
            showErrorMessage('Error adding product. Please try again.');
        }
    });
});

// Функция для загрузки и отображения продуктов
function loadProducts() {
    fetch('/api/v1/products/')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('productTable').querySelector('tbody');
        tableBody.innerHTML = '';

        data.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Функция для отображения всплывающего сообщения об ошибке
function showErrorMessage(message) {
    const alertContainer = document.querySelector('.alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show';
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);

    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        alert.remove();
    }, 5000);
}


document.addEventListener('DOMContentLoaded', loadProducts);
