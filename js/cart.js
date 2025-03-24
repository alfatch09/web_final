document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk menampilkan item di keranjang
    function displayCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = ''; // Kosongkan kontainer keranjang

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Keranjang belanja Anda kosong.</p>';
            return;
        }

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <div>
                    <p>${item.name}</p>
                    <p>Rp ${item.price}</p>
                </div>
                <button class="remove-item-btn" data-index="${index}">Hapus</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Tambahkan event listener untuk tombol hapus
        const removeButtons = document.querySelectorAll('.remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fungsi untuk menghapus item dari keranjang
    function removeItemFromCart(index) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.splice(index, 1); // Hapus item berdasarkan index
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems(); // Perbarui tampilan keranjang
    }

    // Tampilkan item saat halaman dimuat
    displayCartItems();
});