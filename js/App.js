document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
            { id: 1, name: 'Arabic Blend', img: '2.jpg', price: 25000 },
            { id: 1, name: 'Primo Passo', img: '3.jpg', price: 30000 },
            { id: 1, name: 'Aceh  Gayo', img: '4.jpg', price: 35000 },
            { id: 1, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
// cek apakah ada barang yang sama di cart
const cartItem = this.items.find((item) => item.id === newItem.id);

// jika belum ada / cart masih kosong
        if(!cartItem) {
            this.items.push({...newItem, quantity:1, total: newItem.price});
            this.quantity++;
            this.total += newItem.price;
         } else {
            // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart 
            this.items = this.item.map((item) => {
                // jika barang berbeda
                if (item.id !== newItem.id) {
                    return item;
                } else {
                    // jika barang sudah ada, tambah quantity dan totalnya
                    item.quantity++;
                    item.total = item.price;
                    this.quantity++;
                    this.total+= item.price;
                    return item;
                }
            });
         }
        },
    });
});

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};