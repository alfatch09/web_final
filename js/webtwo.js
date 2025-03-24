document.addEventListener("DOMContentLoaded", function () {
    // 1. **Modal Register/Login**
    const modal = document.getElementById("login-modal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");

    if (openModalBtn && modal && closeModalBtn) {
        openModalBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });

        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        // Tutup modal jika klik di luar area modal
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // 2. **Tombol Dark Mode**
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        // Periksa apakah dark mode aktif sebelumnya
        if (localStorage.getItem("dark-mode") === "enabled") {
            document.body.classList.add("dark-mode");
            themeToggle.textContent = "☀️"; // Mode Terang
        }

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("dark-mode", "enabled");
                themeToggle.textContent = "☀️";
            } else {
                localStorage.setItem("dark-mode", "disabled");
                themeToggle.textContent = "🌙";
            }
        });
    }

    // 3. **Hamburger Menu (Mobile)**
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // 4. **Toggle Login & Sign Up**
    const toggleText = document.getElementById("toggle-text");
    const toggleLink = document.getElementById("toggle-link");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const modalTitle = document.getElementById("modal-title");

    if (toggleLink && loginForm && signupForm && modalTitle) {
        toggleLink.addEventListener("click", function (event) {
            event.preventDefault();
            if (loginForm.style.display === "none") {
                loginForm.style.display = "block";
                signupForm.style.display = "none";
                modalTitle.textContent = "Login";
                toggleText.innerHTML = `Belum punya akun? <a href="#" id="toggle-link">Sign up</a>`;
            } else {
                loginForm.style.display = "none";
                signupForm.style.display = "block";
                modalTitle.textContent = "Sign Up";
                toggleText.innerHTML = `Sudah punya akun? <a href="#" id="toggle-link">Login</a>`;
            }
            // Tambahkan event listener kembali setelah innerHTML diubah
            document.getElementById("toggle-link").addEventListener("click", arguments.callee);
        });
    }

    // 5. **Google Sign-In**
    window.handleCredentialResponse = function (response) {
        console.log("Google ID Token:", response.credential);

        // Decode JWT Token
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        console.log("User Info:", payload);

        // Simpan data pengguna ke localStorage
        localStorage.setItem("user", JSON.stringify(payload));

        // Tampilkan pesan selamat datang
        alert(`Selamat datang, ${payload.name}!`);
    };

    // Google Sign-In Button
    const googleSignInBtn = document.getElementById("googleSignIn");
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener("click", function () {
            alert("Silakan masuk dengan Google.");
        });
    }

    // Logout Google
    function signOut() {
        localStorage.removeItem("user");
        alert("Anda telah logout.");
        location.reload(); // Refresh halaman setelah logout
    }
});
