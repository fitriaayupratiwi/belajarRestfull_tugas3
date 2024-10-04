const express = require('express');
const axios = require('axios');
const path = require('path'); // Perlu untuk merujuk ke file dengan benar

const app = express();
const port = 4000;

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Mengambil data dari API JSONPlaceholder dan menambahkan fitur filter
app.get('/', async (req, res) => {
  try {
    const resource = req.query.resource || 'posts';
    const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
    let data = response.data;

    const { id, title } = req.query;
    if (id) {
      data = data.filter((item) => item.id == id);
    }
    if (title) {
      data = data.filter((item) => item.title && item.title.includes(title));
    }

    let tableHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data ${resource.toUpperCase()} (Node.js)</title>
            <link rel="stylesheet" href="/style.css"> <!-- Pastikan path sesuai -->
        </head>
        <body>
            <h1>Data ${resource.toUpperCase()} dari JSONPlaceholder API (Node.js)</h1>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
        `;

    data.forEach((item) => {
      tableHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.title || item.name}</td>
                <td>${item.body || item.email}</td>
            </tr>`;
    });

    tableHTML += `
                </tbody>
            </table>
        </body>
        </html>`;

    res.send(tableHTML);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
