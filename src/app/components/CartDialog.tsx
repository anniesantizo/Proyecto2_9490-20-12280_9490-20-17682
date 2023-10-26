import React, { useEffect, useState } from 'react';

function CartDialog({ cartItems, onClose }) {
    const [cartDetails, setCartDetails] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No se encontró un token en localStorage');
            return;
        }

        const cartId = "6539debd93eb7b5bd4ff5253"; // Asegúrate de proporcionar el ID correcto
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const requestData = {
            cartId: cartId,
        };

        fetch('http://localhost:8080/api/carrito/byId', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los detalles del carrito');
                }
                return response.json();
            })
            .then((data) => {
                setCartDetails(data);
                fetchProductsForCart(data.products);
            })
            .catch((error) => {
                console.error('Error al obtener los detalles del carrito:', error);
            });
    }, []);

    const fetchProductsForCart = (productIds) => {
        // Realizar una solicitud GET a la API de productos para cada ID en el carrito
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const productPromises = productIds.map((productId) => {
            return fetch(`http://localhost:8080/api/productos/${productId}`, { // Agregar el productId a la URL
                method: 'GET',
                headers: headers,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`No se pudieron obtener los detalles del producto con ID: ${productId}`);
                    }
                    return response.json();
                });
        });

        Promise.all(productPromises)
            .then((products) => {
                setCartProducts(products);
            })
            .catch((error) => {
                console.error('Error al obtener los detalles de los productos:', error);
            });
    };
    const handleDeleteProduct = (productId) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const requestData = {
            cartId: cartDetails._id, // Utiliza el ID del carrito
            productId: productId,
        };

        fetch('http://localhost:8080/api/carrito', {
            method: 'DELETE', // Usa el método HTTP DELETE para eliminar el producto
            headers: headers,
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo eliminar el producto del carrito');
                }
                return response.json();
            })
            .then((data) => {
                // Actualiza la lista de productos en el carrito después de eliminar
                fetchProductsForCart(data.products);
                // Actualiza el total del carrito
                setCartDetails(data);
            })
            .catch((error) => {
                console.error('Error al eliminar el producto del carrito:', error);
            });
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-screen-md shadow-lg">
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-center">Carrito de Compras</h2>
                <ul>
                    {cartProducts.map((product, index) => (
                        <li key={index} className="mb-4 flex items-center">
                            <img src={product.picture} alt={product.name} className="w-16 h-16 mr-4 object-cover" />
                            <div>
                                <p className="text-lg font-semibold">{product.name}</p>
                                <p className="text-gray-500">Precio: Q. {product.discountPrice}</p>
                            </div>
                            <button onClick={() => handleDeleteProduct(product._id)} className="ml-4 text-red-600 hover:text-red-800">
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 text-center">
                    <p className="text-xl font-semibold">Total: Q{cartDetails && cartDetails.total}</p>
                </div>
            </div>
        </div>

    );
}

export default CartDialog;
