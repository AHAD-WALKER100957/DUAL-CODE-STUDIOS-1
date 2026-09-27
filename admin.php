<?php
session_start();
include 'db_connect.php';

$login_error = "";

// Handle Admin Login
if (isset($_POST['login'])) {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, username, password, full_name, role FROM admin_users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $admin = $result->fetch_assoc();
        // Verify hashed password
        if (password_verify($password, $admin['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_name'] = $admin['full_name'];
            $_SESSION['admin_role'] = $admin['role'];
            header("Location: admin.php");
            exit;
        } else {
            $login_error = "Invalid password. Please try again.";
        }
    } else {
        $login_error = "Admin account not found.";
    }
    $stmt->close();
}

include 'header.php';
?>

<main>
    <section class="admin-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2>Admin Portal — Inquiries Dashboard</h2>
            <?php if (isset($_SESSION['admin_logged_in'])): ?>
                <div>
                    <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['admin_name']); ?></strong> (<?php echo $_SESSION['admin_role']; ?>)</span> | 
                    <a href="logout.php" style="color: #ef4444; font-weight: bold; text-decoration: none;">Logout</a>
                </div>
            <?php endif; ?>
        </div>

        <?php if (!isset($_SESSION['admin_logged_in'])): ?>
            <!-- Login Dialog for Unauthenticated Users -->
            <dialog id="loginModal" open>
                <h3>Admin Authentication</h3>
                
                <?php if (!empty($login_error)): ?>
                    <p style="color: #ef4444; font-size: 0.9rem; margin-bottom: 0.5rem;"><?php echo $login_error; ?></p>
                <?php endif; ?>

                <form action="admin.php" method="POST">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" name="login">Login</button>
                </form>
            </dialog>
        <?php else: ?>
            <!-- Dynamic Data Table for Authenticated Founders -->
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Service</th>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $query = "SELECT * FROM client_inquiries ORDER BY submitted_at DESC";
                        $inquiries = $conn->query($query);

                        if ($inquiries && $inquiries->num_rows > 0):
                            while ($row = $inquiries->fetch_assoc()):
                        ?>
                            <tr>
                                <td><?php echo $row['id']; ?></td>
                                <td><?php echo htmlspecialchars($row['client_name']); ?></td>
                                <td><?php echo htmlspecialchars($row['client_email']); ?></td>
                                <td><?php echo htmlspecialchars($row['client_phone']); ?></td>
                                <td><?php echo htmlspecialchars($row['service_requested']); ?></td>
                                <td><?php echo htmlspecialchars($row['project_details']); ?></td>
                                <td><?php echo date("Y-m-d H:i", strtotime($row['submitted_at'])); ?></td>
                                <td><strong style="color: #2563eb;"><?php echo htmlspecialchars($row['status']); ?></strong></td>
                            </tr>
                        <?php 
                            endwhile;
                        else:
                        ?>
                            <tr>
                                <td colspan="8" style="text-align: center;">No client inquiries found in the database.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </section>
</main>

<?php include 'footer.php'; ?>