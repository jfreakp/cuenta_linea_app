# Módulo de Autenticación - Cuenta en Línea

## Descripción General

Este módulo proporciona un sistema completo de autenticación y gestión de usuarios con las siguientes funcionalidades:

- ✅ Registro de usuarios
- ✅ Login/Inicio de sesión
- ✅ Verificación de email
- ✅ Recuperación de contraseña (Forgot Password)
- ✅ Restablecer contraseña (Reset Password)
- ✅ Cambio de contraseña
- ✅ Logout
- ✅ Protección de rutas
- ✅ Contexto de autenticación

## Estructura

### API Routes (`app/api/auth/`)

1. **POST `/api/auth/register`**
   - Registra un nuevo usuario
   - Valida email y fortaleza de contraseña
   - Envía email de verificación
   - Parámetros: `email`, `password`, `passwordConfirm`, `nombres?`, `apellidos?`

2. **POST `/api/auth/login`**
   - Inicia sesión
   - Devuelve JWT token y configura cookie
   - Parámetros: `email`, `password`

3. **POST `/api/auth/verify-email`**
   - Verifica el email del usuario
   - Parámetro: `token`

4. **POST `/api/auth/forgot-password`**
   - Inicia proceso de recuperación de contraseña
   - Envía email con enlace de reset
   - Parámetro: `email`

5. **POST `/api/auth/reset-password`**
   - Restablece la contraseña con token válido
   - Parámetros: `token`, `newPassword`, `newPasswordConfirm`

6. **POST `/api/auth/change-password`**
   - Cambia contraseña (requiere estar autenticado)
   - Parámetros: `currentPassword`, `newPassword`, `newPasswordConfirm`

7. **POST `/api/auth/logout`**
   - Cierra sesión
   - Limpia cookie de autenticación

8. **GET `/api/auth/me`**
   - Obtiene información del usuario autenticado
   - Requiere token válido

### Páginas (`app/auth/`)

- `/auth/login` - Página de inicio de sesión
- `/auth/register` - Página de registro
- `/auth/forgot-password` - Página para recuperar contraseña
- `/auth/reset-password?token=...` - Página para restablecer contraseña
- `/auth/verify?token=...` - Página de verificación de email

### Componentes (`components/auth/`)

- `LoginForm.tsx` - Formulario de login
- `RegisterForm.tsx` - Formulario de registro
- `ForgotPasswordForm.tsx` - Formulario de recuperación
- `ResetPasswordForm.tsx` - Formulario de reset
- `ChangePasswordForm.tsx` - Formulario de cambio de contraseña
- `AuthContext.tsx` - Contexto y hook de autenticación

### Librerías (`lib/`)

- `auth.ts` - Funciones de seguridad y validación
  - `hashPassword()` - Hashing de contraseñas con PBKDF2
  - `verifyPassword()` - Verificación de contraseñas
  - `generateToken()` - Generación de tokens aleatorios
  - `generateJWT()` - Generación de JWT
  - `verifyJWT()` - Verificación de JWT
  - `validatePasswordStrength()` - Validación de fortaleza

- `email.ts` - Funciones de envío de correos
  - `sendEmail()` - Envía correos electrónicos
  - Plantillas de email con HTML

## Configuración

### Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
# Database URL
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT Secret (cambiar en producción)
JWT_SECRET="your-secret-key"

# Email (SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="tu-email@gmail.com"
EMAIL_PASSWORD="tu-app-password"
EMAIL_FROM="noreply@tudominio.com"

# URL Pública
NEXT_PUBLIC_BASE_URL="https://tudominio.com"
```

### Configuración de Correos (Gmail)

1. Habilita "Autenticación de dos factores" en tu cuenta Google
2. Genera una "Contraseña de aplicación"
3. Usa esa contraseña en `EMAIL_PASSWORD`

### Database Migration

```bash
npx prisma migrate dev --name init
```

## Uso

### En Componentes React

```tsx
'use client';

import { useAuth } from '@/components/auth/AuthContext';

export default function MyComponent() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!user) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <p>Bienvenido {user.nombres}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

### Usar en Layout Global

Envuelve tu app con `AuthProvider`:

```tsx
// app/layout.tsx
import { AuthProvider } from '@/components/auth/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Llamadas API desde el Cliente

```tsx
// Registro
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: 'SecurePass123!',
    passwordConfirm: 'SecurePass123!',
    nombres: 'Juan',
    apellidos: 'Pérez'
  })
});

// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: 'SecurePass123!'
  })
});

// Cambiar contraseña (requiere autenticación)
const response = await fetch('/api/auth/change-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    currentPassword: 'OldPass123!',
    newPassword: 'NewPass123!',
    newPasswordConfirm: 'NewPass123!'
  })
});
```

## Validación de Contraseñas

Las contraseñas deben cumplir:

- Mínimo 8 caracteres
- Al menos 1 letra mayúscula (A-Z)
- Al menos 1 letra minúscula (a-z)
- Al menos 1 número (0-9)
- Al menos 1 carácter especial (!@#$%^&*)

Ejemplo: `SecurePass123!`

## Seguridad

### Características de Seguridad Implementadas

1. **Hashing de Contraseñas**: PBKDF2 con 1000 iteraciones
2. **JWT Tokens**: Con expiración configurable
3. **Cookies HttpOnly**: Previene acceso desde JavaScript
4. **CORS**: Configurado para mismo origen
5. **Validación de Email**: Formatos correctos
6. **Tokens Seguros**: Generados con crypto aleatorio
7. **Expiración de Tokens**: Verificación en cada solicitud

### Mejoras para Producción

1. Cambiar `JWT_SECRET` a una clave fuerte
2. Usar HTTPS obligatorio
3. Configurar CORS correctamente
4. Implementar rate limiting
5. Agregar verificación de CAPTCHA
6. Configurar política de sesiones
7. Agregar logging de seguridad
8. Usar secrets manager para variables

## Flujos de Uso

### Registro

1. Usuario llena formulario en `/auth/register`
2. API valida y crea usuario
3. Se envía email de verificación
4. Usuario hace clic en enlace de verificación
5. Email se marca como verificado
6. Usuario puede hacer login

### Login

1. Usuario ingresa email y contraseña en `/auth/login`
2. API verifica credenciales
3. Se genera JWT token
4. Token se almacena en cookie
5. Usuario redirigido a dashboard

### Recuperación de Contraseña

1. Usuario ingresa email en `/auth/forgot-password`
2. API genera token de reset
3. Se envía email con enlace seguro
4. Usuario hace clic (válido por 1 hora)
5. Usuario ingresa nueva contraseña
6. Contraseña se restablece

### Cambio de Contraseña

1. Usuario autenticado accede a `/settings`
2. Completa el formulario de cambio
3. API verifica contraseña actual
4. Nueva contraseña se valida
5. Contraseña se actualiza

## Tipos TypeScript

Todos los tipos están definidos en `types/auth.ts`:

- `LoginRequest`
- `RegisterRequest`
- `ChangePasswordRequest`
- `ForgotPasswordRequest`
- `ResetPasswordRequest`
- `AuthResponse`
- `VerifyEmailRequest`
- `User`

## Middleware de Protección

El archivo `middleware.ts` protege rutas:

- Rutas protegidas: `/dashboard`, `/profile`, `/settings`
- Requiere JWT válido
- Redirige a login si no autenticado

## Model de Base de Datos

```prisma
model Usuario {
  id                      Int
  email                   String @unique
  password                String
  nombres                 String?
  apellidos               String?
  estado                  EstadoUsuario
  emailVerificado         Boolean
  tokenVerificacion       String?
  tokenVerificacionExp    DateTime?
  tokenReset              String?
  tokenResetExp           DateTime?
  ultimoLogin             DateTime?
  clienteId               Int? @unique
  createdAt               DateTime
  updatedAt               DateTime
}

enum EstadoUsuario {
  ACTIVO
  INACTIVO
  PENDIENTE_VERIFICACION
}
```

## Troubleshooting

### Emails no se envían
- Verificar variables `EMAIL_*` en `.env.local`
- En desarrollo, los emails se loguean en consola
- Para Gmail, usar contraseña de app, no contraseña de cuenta

### Token expirado
- Tokens JWT expiran cada 7 días
- Tokens de reset expiran en 1 hora
- Tokens de verificación expiran en 24 horas

### Contraseña rechazada
- Verificar que cumpla con los requisitos mínimos
- Debe contenerer mayúsculas, minúsculas, números y caracteres especiales

## Próximas Mejoras

- [ ] Autenticación con OAuth (Google, GitHub)
- [ ] Autenticación de dos factores (2FA)
- [ ] Recuperación de sesión
- [ ] Login con token de refresco
- [ ] Historial de intentos de login
- [ ] Bloqueo de cuenta por intentos fallidos
- [ ] Auditoría de cambios de seguridad
