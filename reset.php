<?php
include 'db_connect.php';

// Generate a fresh, guaranteed hash for 'admin123'
$new_password = password_hash("admin123", PASSWORD_DEFAULT);

// Update passwords for both admins
$stmt = $conn->prepare("UPDATE admin_users SET password = ? WHERE username IN ('ahad_bharucha', 'anmol_tiwari')");
$stmt->bind_param("s", $new_password);

if ($stmt->execute()) {
    echo "<h2 style='color: green;'>Success! Password for both admins has been reset to: admin123</h2>";
    echo "<p><a href='admin.php'>Click here to go back to Admin Login</a></p>";
} else {
    echo "<h2 style='color: red;'>Error updating database: " . $conn->error . "</h2>";
}

$stmt->close();
?>