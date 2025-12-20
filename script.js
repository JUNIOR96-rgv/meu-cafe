document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    // --- MODO ESCURO ---
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.textContent = isDark ? '🌙' : '☀️';
    });

    // --- CARRINHO LOGICA ---
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartTotalText = document.querySelector('.cart-total');
    const cartCountLabel = document.querySelector('.cart-count');

    // Abrir/Fechar
    document.querySelector('.cart-toggle-btn').onclick = () => cartSidebar.classList.add('open');
    document.querySelector('.cart-close').onclick = () => cartSidebar.classList.remove('open');

    // Adicionar
    document.querySelectorAll('.add-cart').forEach(btn => {
        btn.onclick = () => {
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            const item = cart.find(i => i.name === name);
            if(item) item.qty++; else cart.push({name, price, qty: 1});
            updateCart();
            cartSidebar.classList.add('open');
        };
    });

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;
            cartItemsDiv.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:5px;">
                    <span>${item.name} (x${item.qty})</span>
                    <span>R$ ${(item.price * item.qty).toFixed(2)} 
                    <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer; margin-left:10px;">✕</button></span>
                </div>`;
        });
        cartTotalText.textContent = `Total: R$ ${total.toFixed(2)}`;
        cartCountLabel.textContent = count;
    }

    window.removeItem = (i) => { cart.splice(i, 1); updateCart(); };

    // --- FINALIZAR PEDIDO NO WHATSAPP ---
    document.querySelector('.finalizar-btn').onclick = () => {
        if(cart.length === 0) return alert("Carrinho vazio!");

        let msg = "*Novo Pedido - Meu Café*\n\n";
        cart.forEach(i => msg += `• ${i.name} (x${i.qty}) - R$ ${(i.price * i.qty).toFixed(2)}\n`);
        msg += `\n*Total: ${cartTotalText.textContent}*`;

        const fone = "5561995084627";
        window.open(`https://wa.me/${fone}?text=${encodeURIComponent(msg)}`, '_blank');
        
        cart = []; updateCart(); cartSidebar.classList.remove('open');
    };

    // --- ANIMAÇÃO SCROLL ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold: 0.1});
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
