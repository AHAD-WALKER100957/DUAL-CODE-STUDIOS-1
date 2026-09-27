<?php 
include 'db_connect.php'; 

$message = "";
$msg_type = "";

if (isset($_POST['submit_inquiry'])) {
    $client_name       = trim($_POST['client_name']);
    $client_email      = trim($_POST['client_email']);
    $client_phone      = trim($_POST['client_phone']);
    $service_requested = trim($_POST['service_requested']);
    $project_details   = trim($_POST['project_details']);

    $stmt = $conn->prepare("INSERT INTO client_inquiries (client_name, client_email, client_phone, service_requested, project_details) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $client_name, $client_email, $client_phone, $service_requested, $project_details);

    if ($stmt->execute()) {
        $message = "Thank you! Your project inquiry has been successfully submitted.";
        $msg_type = "success";
    } else {
        $message = "Database Error: Unable to submit your inquiry. Please try again.";
        $msg_type = "error";
    }
    $stmt->close();
}

include 'header.php'; 
?>

<main>
    <!-- Interactive Estimator -->
    <section class="estimator-card">
        <h3>Interactive Project Calculator</h3>
        <p>Configure your requirements to view instant estimated timelines and scope.</p>

        <div class="estimator-controls">
            <label>
                <input type="checkbox" id="feature_responsive" checked disabled> Responsive Design (Included)
            </label>
            <label>
                <input type="checkbox" id="feature_db" class="calc-trigger"> Custom Database & Admin Panel
            </label>
            <label>
                <input type="checkbox" id="feature_3d" class="calc-trigger"> 3D WebGL / Canvas Animations
            </label>
        </div>

        <div class="estimator-result">
            <div>Estimated Timeline: <span id="est_time">1 - 2 Weeks</span></div>
            <div>Engineering Complexity: <span id="est_tier">Standard</span></div>
        </div>
    </section>

    <section class="form-section">
        <h2>Start Your Project</h2>
        <p>Fill out the form below to submit your requirements to Dual Code Studios.</p>

        <?php if (!empty($message)): ?>
            <div style="padding: 1rem; margin-bottom: 1rem; border-radius: 5px; text-align: center; font-weight: bold; 
                background-color: <?php echo $msg_type === 'success' ? '#dcfce7' : '#fee2e2'; ?>; 
                color: <?php echo $msg_type === 'success' ? '#166534' : '#991b1b'; ?>;">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>

        <form id="inquiryForm" action="contact.php" method="POST">
            <div class="form-group">
                <label for="client_name">Full Name:</label>
                <input type="text" id="client_name" name="client_name" required>
            </div>

            <div class="form-group">
                <label for="client_email">Email Address:</label>
                <input type="email" id="client_email" name="client_email" required>
            </div>

            <div class="form-group">
                <label for="client_phone">Phone Number:</label>
                <input type="tel" id="client_phone" name="client_phone" required>
            </div>

            <div class="form-group">
                <label for="service_requested">Service Required:</label>
                <select id="service_requested" name="service_requested" required>
                    <option value="">-- Select a Service --</option>
                    <option value="Custom Web App">Custom Web Application</option>
                    <option value="Database Design">Database Design</option>
                    <option value="UI/UX Redesign">UI/UX Redesign</option>
                </select>
            </div>

            <div class="form-group">
                <label for="project_details">Project Overview:</label>
                <textarea id="project_details" name="project_details" rows="5" required></textarea>
            </div>

            <button type="submit" name="submit_inquiry">Submit Inquiry</button>
        </form>
    </section>
</main>

<?php include 'footer.php'; ?>