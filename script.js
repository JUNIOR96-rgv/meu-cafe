document.addEventListener('DOMContentLoaded', () => {

    // --- MODO ESCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // --- MENU MOBILE ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // --- CARRINHO ---
    const cartBtn = document.querySelector('.cart-toggle-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    let cart = [];

    cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    cartClose.addEventListener('click', () => cartSidebar.classList.remove('open'));

    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            
            const item = cart.find(i => i.name === name);
            if(item) {
                item.qty++;
            } else {
                cart.push({ name, price, qty: 1 });
            }
            updateCart();
            cartSidebar.classList.add('open');
        });
    });

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        let count = 0;

        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;
            cartItemsDiv.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                    <span>${item.name} (x${item.qty})</span>
                    <span>R$ ${(item.price * item.qty).toFixed(2)}</span>
                </div>`;
        });

        cartCount.textContent = count;
        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // --- ANIMAÇÃO FADE-IN ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
