'use client'
import { useState, useEffect } from 'react';
import TaskList from "@/app/components/TaskList";
import { FaSignOutAlt } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [NIT, setNIT] = useState('');
    const [DPI, setDPI] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bornDate, setBornDate] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const initialLoggedIn = !!localStorage.getItem('token');
        setIsLoggedIn(initialLoggedIn);
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleSignup = async () => {
        if (!validateEmail(email)) {
            setEmailError('Correo electrónico no válido');
            return;
        }

        try {
            const userData = {
                email,
                password,
                passwordConfirmation,
                NIT,
                DPI,
                name,
                lastName,
                bornDate,
                deliveryAddress,
                phoneNumber
            };

            const response = await fetch('http://localhost:8080/api/registro/295326', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                window.alert('Registro exitoso');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
                setNIT('');
                setDPI ('');
                setName('');
                setLastName('');
                setBornDate('');
                setDeliveryAddress('');
                setPhoneNumber('');
                setIsSigningUp(true);
            } else if (response.status === 400) {
                const responseData = await response.json();
                const errorMessage = responseData.msg;
                window.alert(`${errorMessage}`);
            } else {
                window.alert('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError('Correo electrónico no válido');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/tasks/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
            } if (response.status === 400) {
                const responseData = await response.json();
                const errorMessage = responseData.msg; // Nombre del campo que contiene el mensaje
                window.alert(`${errorMessage}`);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="relative">
                    <button
                        onClick={handleLogout}
                        className="flex items-end text-white bg-red-500 hover:bg-red-600 rounded-md absolute right-0 top-0 mr-4 mt-4 px-2 py-1"
                    >
                        <FaSignOutAlt className="mr-1" />
                        Cerrar Sesión
                    </button>

                    <TaskList />
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <table className="bg-white rounded-lg shadow-lg">
                        <thead>
                        <tr>
                            <th colSpan="2" className="bg-gray-200 text-gray-700 py-3 px-6">
                                <h2 className="text-xl font-semibold">
                                    {isSigningUp ? 'Registrarse' : 'Iniciar sesión'}
                                </h2>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="email" className="text-gray-600">
                                    Correo electrónico
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                    }}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                                {emailError && (
                                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="password" className="text-gray-600">
                                    Contraseña
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="passwordConfirmation" className="text-gray-600">
                                    Confirmar contraseña
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="password"
                                    id="passwordConfirmation"
                                    placeholder="Confirmar Contraseña"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="NIT" className="text-gray-600">
                                    NIT
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="NIT"
                                    id="NIT"
                                    placeholder="Sin guiones ni espacios"
                                    value={NIT}
                                    onChange={(e) => setNIT(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="DPI" className="text-gray-600">
                                DPI
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="DPI"
                                    id="DPI"
                                    placeholder="Sin guiones ni espacios"
                                    value={DPI}
                                    onChange={(e) => setDPI(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="name" className="text-gray-600">
                                Nombres
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="name"
                                    id="name"
                                    placeholder=""
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="lastName" className="text-gray-600">
                                Apellidos
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="lastName"
                                    id="lastName"
                                    placeholder=""
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="bornDate" className="text-gray-600">
                                Fecha de Nacimiento
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="bornDate"
                                    id="bornDate"
                                    placeholder="DD/MM/AA"
                                    value={bornDate}
                                    onChange={(e) => setBornDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="deliveryAddress" className="text-gray-600">
                                Dirección de entrega
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="deliveryAddress"
                                    id="deliveryAddress"
                                    placeholder=""
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr> 
                        <tr>
                            <td className="py-3 px-6 text-left">
                                <label htmlFor="phoneNumber" className="text-gray-600">
                                Número de teléfono
                                </label>
                            </td>
                            <td className="py-3 px-6 text-right">
                                <input
                                    type="phoneNumber"
                                    id="phoneNumber"
                                    placeholder=""
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                                />
                            </td>
                        </tr>  
                        <tr>
                            <td colSpan="2" className="py-3 px-6 text-center">
                                {isSigningUp ? (
                                    <button
                                        onClick={handleSignup}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                                    >
                                        Registrarse
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleLogin}
                                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
                                        >
                                            Iniciar sesión
                                        </button>
                                        <div className="mt-2 text-gray-600 text-center">
                                            ¿No estás registrado?
                                            <button
                                                onClick={() => setIsSigningUp(true)}
                                                className="text-blue-500 hover:text-blue-600 focus:outline-none ml-2"
                                            >
                                                Registrarse
                                            </button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                        {isSigningUp && (
                            <tr>
                                <td colSpan="2" className="py-3 px-6 text-center">
                                    <div className="text-gray-600">
                                        ¿Ya estás registrado?
                                        <button
                                            onClick={() => setIsSigningUp(false)}
                                            className="text-green-500 hover:text-green-600 focus:outline-none ml-2"
                                        >
                                            Iniciar sesión
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
