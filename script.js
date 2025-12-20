document.addEventListener('DOMContentLoaded', () => {
    
  
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartCloseBtn = document.querySelector('.cart-close');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalEl = document.querySelector('.cart-total');
    const cartCountEl = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-cart');
    const checkoutBtn = document.querySelector('.finalizar-btn');

    let cart = [];

   
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        let theme = body.getAttribute('data-theme');
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });

    
    
 
    cartToggleBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    cartCloseBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            
            addItemToCart(name, price);
            cartSidebar.classList.add('open'); 
        });
    });

    function addItemToCart(name, price) {
      
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        updateCartUI();
    }

 
    window.removeItem = (name) => {
        const index = cart.findIndex(item => item.name === name);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; 
            } else {
                cart.splice(index, 1); 
            }
        }
        updateCartUI();
    };

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalCount = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            totalCount += item.quantity;

            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <small>R$ ${item.price.toFixed(2)} x ${item.quantity}</small>
                </div>
                <button onclick="removeItem('${item.name}')" style="background:red; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">-</button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
        cartCountEl.textContent = totalCount;
    }

  
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let message = "Olá, gostaria de fazer um pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
            total += item.price * item.quantity;
        });

        message += `\n*Total: R$ ${total.toFixed(2)}*`;

        const encodedMessage = encodeURIComponent(message);
        const phone = "5561995084627"; 
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
        
        cart = [];
        updateCartUI();
        cartSidebar.classList.remove('open');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    
    updateCartUI();

});