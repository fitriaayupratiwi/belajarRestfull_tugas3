<?php
// Mengambil data dari JSONPlaceholder API
$postUrl = 'https://jsonplaceholder.typicode.com/posts';
$commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

// Cek apakah ada ID yang difilter
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

// Jika ada ID, ambil data berdasarkan ID
if ($id !== null) {
    $postUrl .= '?id=' . $id;
    $commentsUrl .= '?postId=' . $id;
}

$postResponse = file_get_contents($postUrl);
$commentsResponse = file_get_contents($commentsUrl);

// Mengecek apakah request berhasil
if ($postResponse === false || $commentsResponse === false) {
    die('Error: Tidak bisa mengambil data dari API.');
}

// Mendekode data JSON menjadi array asosiatif
$posts = json_decode($postResponse, true);
$comments = json_decode($commentsResponse, true);

// Mengecek apakah data valid
if ($posts === null || $comments === null) {
    die('Error: Data tidak valid atau tidak ditemukan.');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Post dan Comments</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Data Post dari JSONPlaceholder API (PHP)</h1>

    <form method="GET" action="">
        <label for="id">Filter berdasarkan Post ID:</label>
        <input type="number" id="id" name="id" value="<?php echo $id !== null ? $id : ''; ?>">
        <button type="submit">Filter</button>
    </form>

    <h2>Posts</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
            </tr>
        </thead>
        <tbody>
            <?php if (!empty($posts)): ?>
                <?php foreach ($posts as $post): ?>
                    <tr>
                        <td><?php echo $post['id']; ?></td>
                        <td><?php echo htmlspecialchars($post['title']); ?></td>
                        <td><?php echo htmlspecialchars($post['body']); ?></td>
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr>
                    <td colspan="3">Tidak ada data post yang ditemukan.</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>

    <h2>Comments</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Post ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Body</th>
            </tr>
        </thead>
        <tbody>
            <?php if (!empty($comments)): ?>
                <?php foreach ($comments as $comment): ?>
                    <tr>
                        <td><?php echo $comment['id']; ?></td>
                        <td><?php echo $comment['postId']; ?></td>
                        <td><?php echo htmlspecialchars($comment['name']); ?></td>
                        <td><?php echo htmlspecialchars($comment['email']); ?></td>
                        <td><?php echo htmlspecialchars($comment['body']); ?></td>
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr>
                    <td colspan="5">Tidak ada data komentar yang ditemukan.</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</body>
</html>
