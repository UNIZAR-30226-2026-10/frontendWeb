// src/services/auth.service.ts

export const loginService = async (email: string, password: string) => {
  // 1. Simulamos el tiempo de espera de internet (1 segundo)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 2. Simulamos la lógica del backend
  // Pongamos que esta es tu cuenta de pruebas
  if (email === 'admin@juego.com' && password === '123456') {
    // Si la contraseña es correcta, simulamos un status 200 OK
    return { 
      message: "Login exitoso",
      // (Aquí el backend real también te plantaría la cookie de sesión de forma invisible)
    }; 
  } else {
    // Si la contraseña está mal, lanzamos un error como haría tu bloque catch
    throw new Error('Correo o contraseña incorrectos.');
  }
};

/*
export const loginService = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3001/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  // Si el backend devuelve error (400, 401, etc.), lanzamos el error
  // para que el Hook lo atrape.
  if (!response.ok) {
    throw new Error(data.message || 'Correo o contraseña incorrectos.');
  }

  // Si todo va bien, devolvemos los datos (por si envían un token o el perfil)
  return data;
};
*/
