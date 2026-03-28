export const registerService = async (email: string, username: string, password: string) => {
  // 1. Simulamos la espera de internet
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 2. Simulamos la respuesta
  if (email === 'admin@juego.com') {
    throw new Error('Ese correo ya está registrado.');
  }

  return { message: "Usuario creado exitosamente" };

  /* Código real para cuando el backend esté listo:
  const response = await fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al crear la cuenta.');
  }
  return data;
  */
};
