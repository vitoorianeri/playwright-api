import { test, expect } from '@playwright/test';
import { Console } from 'console';

const BASE_URL = 'https://serverest.dev';

test('Test REST serverest', async ({ request }) => {
  // 1. create user (POST /usuarios)
  const newUser = {
    nome: 'John Doe',
    email: `e2e_${Date.now()}@teste.com`,
    password: 'test123',
    administrador: 'true'
  };

  const createUserRes = await request.post(`${BASE_URL}/usuarios`, {
    data: newUser
  });

  expect(createUserRes.status()).toBe(201);
  const createUserData = await createUserRes.json();
  expect(createUserData.message).toBe('Cadastro realizado com sucesso');
  console.log(createUserData.message);
  const userId = createUserData._id;

  // 2. Login (POST /login)
  const loginRes = await request.post(`${BASE_URL}/login`, {
    data: {
      email: newUser.email,
      password: newUser.password
    }
  });

  expect(loginRes.status()).toBe(200);
  const loginData = await loginRes.json();
  expect(loginData.message).toBe('Login realizado com sucesso');
  console.log(loginData.message);
  const authToken = loginData.authorization;

  // Authenticated Headers
  const authHeaders = {
    Authorization: authToken
  };

  // 3. Search user for ID (GET /usuarios/{_id})
  const getUserRes = await request.get(`${BASE_URL}/usuarios/${userId}`);
  expect(getUserRes.status()).toBe(200);
  const getUserData = await getUserRes.json();
  expect(getUserData.nome).toBe(newUser.nome);
  console.log('ID:',userId);

  // 4. Update user (PUT /usuarios/{_id})
  const updatedUser = {
    nome: 'Jane Doe',
    email: newUser.email,
    password: newUser.password,
    administrador: 'false'
  };

  const updateRes = await request.put(`${BASE_URL}/usuarios/${userId}`, {
    data: updatedUser,
    headers: authHeaders
  });

  expect(updateRes.status()).toBe(200);
  const updateData = await updateRes.json();
  expect(updateData.message).toBe('Registro alterado com sucesso');
  console.log(updateData.message);

  // 5. Delete user (DELETE /usuarios/{_id})
  const deleteRes = await request.delete(`${BASE_URL}/usuarios/${userId}`, {
    headers: authHeaders
  });

  expect(deleteRes.status()).toBe(200);
  const deleteData = await deleteRes.json();
  expect(deleteData.message).toBe('Registro excluído com sucesso');
  console.log(deleteData.message);
});