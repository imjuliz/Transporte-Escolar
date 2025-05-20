document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrarForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = document.getElementById('registrarForm');
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/administradores/cadastrar', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidGlwbyI6ImNvbXVtIiwiaWF0IjoxNzQ3MTYwOTQxLCJleHAiOjE3NDcxNjQ1NDF9.8JJKrhTr1iYV0Q29djaMh6VYUrLin7r4TwEUaelxfPY' // Substitua pelo seu token JWT
                },
                body: formData
            });

            const data = await response.json();
            document.getElementById('responseContent').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('responseContent').textContent = 'Erro ao enviar os dados.';
        }
    })
});