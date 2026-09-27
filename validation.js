document.addEventListener("DOMContentLoaded", function () {

    // 1. Client Inquiry Form Validation (contact.php)
    const inquiryForm = document.getElementById("inquiryForm");

    if (inquiryForm) {
        inquiryForm.addEventListener("submit", function (e) {
            const clientName = document.getElementById("client_name").value.trim();
            const clientEmail = document.getElementById("client_email").value.trim();
            const clientPhone = document.getElementById("client_phone").value.trim();
            const service = document.getElementById("service_requested").value;
            const details = document.getElementById("project_details").value.trim();

            // Regular Expressions
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10}$/; // Requires exactly 10 digits

            // Validation Logic
            if (clientName.length < 2) {
                alert("Validation Error: Please enter a valid full name.");
                e.preventDefault();
                return;
            }

            if (!emailRegex.test(clientEmail)) {
                alert("Validation Error: Please enter a valid email address.");
                e.preventDefault();
                return;
            }

            if (!phoneRegex.test(clientPhone)) {
                alert("Validation Error: Please enter a valid 10-digit phone number.");
                e.preventDefault();
                return;
            }

            if (service === "") {
                alert("Validation Error: Please select a service from the dropdown.");
                e.preventDefault();
                return;
            }

            if (details.length < 10) {
                alert("Validation Error: Please provide project details with at least 10 characters.");
                e.preventDefault();
                return;
            }
        });
    }

    // 2. Admin Modal Dialog Controller (admin.php)
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        // Automatically pop open the dialog overlay on page load
        loginModal.showModal();
    }
});
// ==========================================================================
// 3D Interactive Mouse-Tilt Effect for Cards
// ==========================================================================
const tiltCards = document.querySelectorAll(".card, .service-item");

tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position inside card
        const y = e.clientY - rect.top;  // Mouse Y position inside card

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate 3D tilt rotation degrees (Max 15deg)
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 25px rgba(37, 99, 235, 0.25)`;
    });

    card.addEventListener("mouseleave", () => {
        // Reset card to original flat 3D orientation
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.boxShadow = `none`;
    });
});

// ==========================================================================
// Dynamic Interactive Particle Engine (HTML5 Canvas)
// ==========================================================================
const canvas = document.getElementById("heroCanvas");

if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.speedY = (Math.random() - 0.5) * 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = "rgba(37, 99, 235, 0.6)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 45; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
document.addEventListener("DOMContentLoaded", function () {

    // 1. Client Inquiry Form Validation
    const inquiryForm = document.getElementById("inquiryForm");
    if (inquiryForm) {
        inquiryForm.addEventListener("submit", function (e) {
            const clientName = document.getElementById("client_name").value.trim();
            const clientEmail = document.getElementById("client_email").value.trim();
            const clientPhone = document.getElementById("client_phone").value.trim();
            const service = document.getElementById("service_requested").value;
            const details = document.getElementById("project_details").value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10}$/;

            if (clientName.length < 2 || !emailRegex.test(clientEmail) || !phoneRegex.test(clientPhone) || service === "" || details.length < 10) {
                alert("Please fill out all fields correctly before submitting.");
                e.preventDefault();
            }
        });
    }

    // 2. Three.js Interactive 3D Canvas
    const container = document.getElementById("threejs-container");
    if (container && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Create 3D Wireframe Icosahedron Geometry
        const geometry = new THREE.IcosahedronGeometry(2.5, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);

        camera.position.z = 5;

        // Interactive Mouse Rotation
        let mouseX = 0, mouseY = 0;
        document.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        function animate3D() {
            requestAnimationFrame(animate3D);
            shape.rotation.x += 0.005;
            shape.rotation.y += 0.008;

            shape.rotation.y += mouseX * 0.05;
            shape.rotation.x += mouseY * 0.05;

            renderer.render(scene, camera);
        }
        animate3D();

        window.addEventListener("resize", () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // 3. Dynamic Stats Counter
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // 4. Interactive Project Estimator
    const calcTriggers = document.querySelectorAll(".calc-trigger");
    const estTime = document.getElementById("est_time");
    const estTier = document.getElementById("est_tier");

    if (calcTriggers.length > 0) {
        calcTriggers.forEach(input => {
            input.addEventListener("change", () => {
                const dbChecked = document.getElementById("feature_db").checked;
                const tdChecked = document.getElementById("feature_3d").checked;

                if (dbChecked && tdChecked) {
                    estTime.innerText = "3 - 4 Weeks";
                    estTier.innerText = "Enterprise 3D Systems";
                } else if (dbChecked || tdChecked) {
                    estTime.innerText = "2 - 3 Weeks";
                    estTier.innerText = "Advanced Dynamic";
                } else {
                    estTime.innerText = "1 - 2 Weeks";
                    estTier.innerText = "Standard";
                }
            });
        });
    }
});