'use client'
import React, { useState, useEffect } from 'react';
import {API_BASE_URL, DPI_ADMIN} from './Constants';
import Link from 'next/link';
import ProductAddDialog from "@/app/components/AddProduct";
import { FaEdit } from 'react-icons/fa';

function Catalog({ handleCartUpdate }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dpiMatch, setDpiMatch] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const dpiValue = localStorage.getItem('DPI');

        if (dpiValue === DPI_ADMIN) {
            setDpiMatch(true);
        } else {
            setDpiMatch(false);
        }

        if (!token) {
            setError('No se encontró un token en localStorage');
            setLoading(false);
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        fetch(API_BASE_URL + 'productos/', { headers })
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
                const response = await fetch(API_BASE_URL + `carrito/byId`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ cartId: cartId })
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('No se pudieron obtener los detalles del carrito');
                        }
                        return response.json();
                    })
                    .then((cartDetails) => {
                        const updatedCartDetails = { ...cartDetails };
                        updatedCartDetails.products.push(selectedProduct);
                        return fetch(API_BASE_URL + `carrito/${cartId}`, {
                            method: 'PUT',
                            headers: headers,
                            body: JSON.stringify(updatedCartDetails),
                        });
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('No se pudo actualizar el carrito');
                        }
                        return response.json();
                    })
                    .then((updatedCart) => {
                    })
                    .catch((error) => {
                        console.error('Error al obtener o actualizar el carrito:', error);
                    });

            } else {
                const response = await fetch(API_BASE_URL + 'carrito', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ selectedProducts: [selectedProduct] }),
                });

                if (!response.ok) {
                    throw new Error('No se pudo crear el carrito');
                }

                const responseData = await response.json();
                setCartId(responseData._id);
                localStorage.setItem('cartId', responseData._id);
            }
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

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsAddProductDialogOpen(true);
    };

    return (
        <div className="text-center">
            <Link href="/catalog"></Link>
            <div className="title-container">
                <div className="title-and-cart">
                    <h1 className="text-2xl font-bold pb-4 sm:pb-8">Catálogo de Productos</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 border rounded shadow">
                        <div style={{ position: 'relative' }}>
                            <img
                                src={product.picture}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            {dpiMatch && (
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-blue-500"
                                    onClick={() => handleEditProduct(product)}
                                >
                                    <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full">
                                        <FaEdit color="white" size={20} />
                                    </div>
                                </button>
                            )}
                        </div>
                        <p className="text-lg font-semibold">{product.name}</p>
                        <p className="text-gray-500">Precio: Q{product.discountPrice}</p>
                        <button
                            className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2"
                            onClick={() => addToCart(product)}
                        >
                            Añadir al carrito
                        </button>
                    </div>
                ))}
            </div>

            {dpiMatch && (
                <button
                    className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-blue-600"
                    onClick={() => {
                        setIsAddProductDialogOpen(true);
                    }}
                >
                    <span className="text-2xl">+</span>
                </button>
            )}
            {isAddProductDialogOpen && (
                <ProductAddDialog
                    onClose={() => setIsAddProductDialogOpen(false)}
                    onAddProduct={addToCart}
                    productId={selectedProduct ? selectedProduct._id : null}
                />
            )}
        </div>

    );
}

export default Catalog;
