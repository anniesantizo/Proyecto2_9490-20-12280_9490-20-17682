import React, { useState, useEffect } from 'react';
import {API_BASE_URL} from "@/app/components/Constants";

function ProductAddDialog({ onClose, onAddProduct, productId }) {
    const initialProductState = {
        name: '',
        brand: '',
        stockAvailable: '',
        discount: '',
        discountPrice: '',
        picture: '',
        description: '',
        category: '',
    };

    const [product, setProduct] = useState({ ...initialProductState });
    const isEditing = !!productId;

    useEffect(() => {
        if (productId) {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in localStorage');
                return;
            }

            fetch(API_BASE_URL + `productos/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener los detalles del producto');
                    }
                    return response.json();
                })
                .then((data) => {
                    setProduct(data);
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                });
        } else {
            setProduct({ ...initialProductState });
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const resetForm = () => {
        setProduct({ ...initialProductState });
    }

    const handleAddProduct = async () => {
        const newProduct = { ...product };
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('JWT token not found in localStorage');
            return;
        }

        if (productId) {
            try {
                const response = await fetch(API_BASE_URL+`productos/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(newProduct),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Product updated:', data);
                    resetForm();
                } else {
                    console.error('Failed to update the product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            try {
                const response = await fetch(API_BASE_URL+'productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the headers
                    },
                    body: JSON.stringify(newProduct),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Product created:', data);
                    resetForm();
                } else {
                    console.error('Failed to create the product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }


    const handleCancel = () => {
        resetForm();
        onClose();
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-screen-md shadow-lg h-120 overflow-y-auto">
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                </h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Nombre del Producto' : 'Nombre'}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder={isEditing ? 'Ingrese el nombre del producto' : 'Ingrese nombre del producto'}
                            value={product.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brand" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Marca del Producto' : 'Marca'}
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            placeholder={isEditing ? 'Ingrese la marca del producto' : 'Ingrese marca del producto'}
                            value={product.brand}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stockAvailable" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Stock Disponible' : 'Stock Disponible'}
                        </label>
                        <input
                            type="text"
                            id="stockAvailable"
                            name="stockAvailable"
                            placeholder={isEditing ? 'Ingrese la cantidad disponible en stock' : 'Ingrese stock disponible'}
                            value={product.stockAvailable}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discount" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Descuento' : 'Descuento'}
                        </label>
                        <input
                            type="text"
                            id="discount"
                            name="discount"
                            placeholder={isEditing ? 'Ingrese el descuento del producto' : 'Ingrese descuento'}
                            value={product.discount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discountPrice" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Precio con Descuento' : 'Precio con Descuento'}
                        </label>
                        <input
                            type="text"
                            id="discountPrice"
                            name="discountPrice"
                            placeholder={isEditing ? 'Ingrese el precio con descuento' : 'Ingrese precio con descuento'}
                            value={product.discountPrice}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="picture" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'URL de la Imagen' : 'Imagen'}
                        </label>
                        <input
                            type="text"
                            id="picture"
                            name="picture"
                            placeholder={isEditing ? 'Ingrese la URL de la imagen' : 'Ingrese URL de la imagen'}
                            value={product.picture}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Descripción del Producto' : 'Descripción'}
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder={isEditing ? 'Ingrese la descripción del producto' : 'Ingrese descripción del producto'}
                            value={product.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="text-lg font-semibold text-gray-600">
                            {isEditing ? 'Categoría del Producto' : 'Categoría'}
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            placeholder={isEditing ? 'Ingrese la categoría del producto' : 'Ingrese categoría del producto'}
                            value={product.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            onClick={handleAddProduct}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover-bg-blue-600"
                        >
                            {isEditing ? 'Actualizar' : 'Agregar'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover-bg-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductAddDialog;
