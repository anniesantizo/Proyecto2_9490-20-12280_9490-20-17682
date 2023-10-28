import React, { useEffect, useState } from 'react';
import {API_BASE_URL} from "@/app/components/Constants";

function ProfileEditDialog({ onClose }) {
    const [profileData, setProfileData] = useState({
        email: '',
        NIT: '',
        DPI: '',
        name: '',
        lastName: '',
        bornDate: '',
        deliveryAddress: '',
        phoneNumber: '',
    });

    const fieldTranslations = {
        email: 'Correo Electrónico',
        NIT: 'NIT',
        DPI: 'DPI',
        name: 'Nombre',
        lastName: 'Apellidos',
        bornDate: 'Fecha de Nacimiento',
        deliveryAddress: 'Dirección',
        phoneNumber: 'Teléfono',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const DPI = localStorage.getItem('DPI');
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Set the content type to JSON
            };

            const payload = {
                email: profileData.email,
                name: profileData.name,
                lastName: profileData.lastName,
                bornDate: profileData.bornDate,
                deliveryAddress: profileData.deliveryAddress,
                phoneNumber: profileData.phoneNumber,
            };

            const response = await fetch(API_BASE_URL+`perfil/${DPI}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                onClose();
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const DPI = localStorage.getItem('DPI');
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const response = await fetch(API_BASE_URL+`perfil/${DPI}`, { headers });
                if (response.ok) {
                    const data = await response.json();
                    const filteredData = Object.keys(profileData).reduce((acc, key) => {
                        if (!['id', 'password', 'passwordConfirmation'].includes(key)) {
                            acc[key] = data[key];
                        }
                        return acc;
                    }, {});
                    setProfileData(filteredData);
                } else {
                }
            } catch (error) {
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-screen-md shadow-lg h-120 overflow-y-auto">
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-center">Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(profileData).map((key) => (
                        <div key={key} className="mb-4">
                            <label htmlFor={key} className="text-lg font-semibold text-gray-600">
                                {fieldTranslations[key]}
                            </label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                placeholder={`Ingrese su ${fieldTranslations[key]}`}
                                value={profileData[key]}
                                onChange={handleChange}
                                readOnly={key === 'NIT' || key === 'DPI'} // Make NIT and DPI fields read-only
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <div className="flex justify-center space-x-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover-bg-blue-600">Guardar</button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover-bg-gray-400">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileEditDialog;
