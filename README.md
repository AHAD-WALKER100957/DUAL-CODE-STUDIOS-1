# Dual Code Studios — 3D Dynamic Web Application

An interactive, 3D-enhanced web application built for **Dual Code Studios**. Features a responsive client inquiry system, live project calculator, real-time WebGL 3D graphics, and a secure session-authenticated admin dashboard.

## 🛠️ Tech Stack & Features
- **Frontend:** HTML5, CSS3 (Glassmorphism & 3D Perspective), JavaScript (Vanilla ES6), Three.js (WebGL 3D Rendering)
- **Backend:** PHP 8.x (Session authentication, Prepared Statements)
- **Database:** MySQL / MariaDB (Relational schema for client inquiries)
- **Security:** Bcrypt password hashing, XSS sanitization (`htmlspecialchars`), SQL injection defense

## 🚀 Local Setup Instructions
1. Move project files to `C:\xampp\htdocs\`
2. Start **Apache** and **MySQL** in XAMPP Control Panel.
3. Import `dualcode_db` schema via phpMyAdmin (`http://localhost/phpmyadmin`).
4. Access site at `http://localhost/index.php`.