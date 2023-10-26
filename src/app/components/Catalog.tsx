import React, { useState, useEffect } from 'react';

function Catalog({ handleCartUpdate }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartId, setCartId] = useState(null); // Agregar estado para el ID del carrito
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No se encontró un token en localStorage');
            setLoading(false);
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        fetch('http://localhost:8080/api/productos/', { headers })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los productos');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });

        // Recuperar el ID del carrito si ya existe en el almacenamiento local
        const existingCartId = localStorage.getItem('cartId');
        if (existingCartId) {
            setCartId(existingCartId);
        }
    }, []);

    const addToCart = async (product) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró un token en localStorage');
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const selectedProduct = product._id;

            if (cartId) {
                // Si ya tenemos un ID de carrito, actualizamos el carrito existente
                const response = await fetch(`http://localhost:8080/api/carrito/${cartId}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(selectedProduct), // Envía solo el producto seleccionado
                });

                if (!response.ok) {
                    throw new Error('No se pudo actualizar el carrito');
                }
            } else {
                // Si no tenemos un ID de carrito, crea uno nuevo y almacena su ID
                const response = await fetch('http://localhost:8080/api/carrito', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ selectedProducts: [selectedProduct] }),
                });

                if (!response.ok) {
                    throw new Error('No se pudo crear el carrito');
                }

                const responseData = await response.json();
                setCartId(responseData.cartId);
                localStorage.setItem('cartId', responseData.cartId);
            }

            // Actualiza el estado del carrito en el componente padre usando handleCartUpdate
            handleCartUpdate();

            alert('Producto agregado al carrito con éxito');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="text-center">
            <div className="title-container">
                <div className="title-and-cart">
                    <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
                    {/* El icono del carrito ahora se encuentra en el componente Dashboard */}
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 border rounded shadow">
                        <img
                            src={product.picture}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <p className="text-lg font-semibold">{product.name}</p>
                        <p className="text-gray-500">Precio: Q{product.discountPrice}</p>
                        <button
                            className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2"
                            onClick={() => addToCart(product)} // Llama a la función addToCart
                        >
                            Añadir al carrito
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalog;
