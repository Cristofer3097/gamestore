import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/loginService';
import { useAuth } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', nombre: '', apellido: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let data;
      console.log("Intentando conectar con:", formData); // 🔍 DEBUG

      if (isLogin) {
        data = await loginUser(formData.email, formData.password);
      } else {
        data = await registerUser(formData);
      }
      
      console.log("Respuesta del servidor:", data); // 🔍 DEBUG

      // Validación robusta
      if (!data || !data.token) {
        throw new Error("El servidor no devolvió un token válido.");
      }

      login(data);
      alert(`¡Bienvenido ${data.nombre || 'Usuario'}!`);
      navigate('/'); 
      
    } catch (err) {
      console.error("Error completo:", err); // 🔍 DEBUG
      const msg = err.message || "Error desconocido";
      
      if(msg.includes("403")) setError("Correo o contraseña incorrectos");
      else if(msg.includes("401")) setError("No autorizado");
      else if(msg.includes("Failed to fetch")) setError("No se pudo conectar con el Backend (¿Está encendido Docker?)");
      else setError(msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Lado Izquierdo: Imagen decorativa */}
        <div className="login-image">
          <div className="login-overlay">
            <h2>{isLogin ? "Bienvenido de nuevo" : "Únete a la aventura"}</h2>
            <p>Descubre los mejores videojuegos y ofertas exclusivas.</p>
          </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="login-form-container">
          <h2>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="name-row">
                 <input type="text" placeholder="Nombre" required 
                   onChange={e => setFormData({...formData, nombre: e.target.value})} />
                 <input type="text" placeholder="Apellido" required 
                   onChange={e => setFormData({...formData, apellido: e.target.value})} />
              </div>
            )}
            
            <input type="email" placeholder="Correo Electrónico" required 
               onChange={e => setFormData({...formData, email: e.target.value})} />
            
            <input type="password" placeholder="Contraseña" required 
               onChange={e => setFormData({...formData, password: e.target.value})} />

            {error && <p className="error-msg" style={{color: '#ff5555', marginTop: '10px'}}>{error}</p>}

            <button type="submit" className="auth-btn">
              {isLogin ? "Ingresar" : "Registrarse"}
            </button>
          </form>

          <p className="toggle-text">
            {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Regístrate aquí" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;