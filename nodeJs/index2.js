<?php
// Mengambil data dari API JSONPlaceholder
$postsUrl = 'https://jsonplaceholder.typicode.com/posts';
$commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
$usersUrl = 'https://jsonplaceholder.typicode.com/users';

// Fungsi untuk mengambil data dari API
function getDataFromApi($url) {
    $response = file_get_contents($url);
    if ($response === false) {
        die('Error: Tidak bisa mengambil data dari API.');
    }
    $data = json_decode($response, true);
    if ($data === null) {
        die('Error: Data tidak valid atau tidak ditemukan.');
    }
    return $data;
}

// Mendapatkan data posts, comments, dan users
$posts = getDataFromApi($postsUrl);
$comments = getDataFromApi($commentsUrl);
$users = getDataFromApi($usersUrl);

// Filter berdasarkan ID atau title
$filterId = $_GET['id'] ?? null;
$filterTitle = $_GET['title'] ?? null;

if ($filterId) {
    $posts = array_filter($posts, function($post) use ($filterId) {
        return $post['id'] == $filterId;
    });
}

if ($filterTitle) {
    $posts = array_filter($posts, function($post) use ($filterTitle) {
        return stripos($post['title'], $filterTitle) !== false;
    });
}

// Mendapatkan nama user dari ID user
function getUserName($userId, $users) {
    foreach ($users as $user) {
        if ($user['id'] == $userId) {
            return $user['name'];
        }
    }
    return 'Unknown';
}

// Mendapatkan jumlah komentar dari ID post
function getCommentsCount($postId, $comments) {
    $count = 0;
    foreach ($comments as $comment) {
        if ($comment['postId'] == $postId) {
            $count++;
        }
    }
    return $count;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Post</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Data Post dari JSONPlaceholder API (PHP)</h1>

    <!-- Form Filter -->
    <form method="GET">
        <label for="id">Filter by ID:</label>
        <input type="number" name="id" id="id" placeholder="Masukkan ID" value="<?php echo htmlspecialchars($filterId); ?>">
        
        <label for="title">Filter by Title:</label>
        <input type="text" name="title" id="title" placeholder="Masukkan Title" value="<?php echo htmlspecialchars($filterTitle); ?>">
        
        <button type="submit">Filter</button>
    </form>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>User</th>
                <th>Comments</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($posts as $post): ?>
                <tr>
                    <td><?php echo $post['id']; ?></td>
                    <td><?php echo htmlspecialchars($post['title']); ?></td>
                    <td><?php echo htmlspecialchars($post['body']); ?></td>
                    <td><?php echo getUserName($post['userId'], $users); ?></td>
                    <td><?php echo getCommentsCount($post['id'], $comments); ?> Komentar</td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
