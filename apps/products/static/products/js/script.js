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
            'X-CSRFToken': csrftoken,  
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            loadProducts(); // Перезагрузить список продуктов
            document.getElementById('productForm').reset(); // Очистить форму
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

// Загружаем продукты при загрузке страницы
document.addEventListener('DOMContentLoaded', loadProducts);
