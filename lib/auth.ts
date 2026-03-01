import crypto from 'crypto';

// Configuración
export const SALT_ROUNDS = 10;
export const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 horas
export const RESET_TOKEN_EXPIRATION_TIME = 1 * 60 * 60 * 1000; // 1 hora

// Hashing de contraseña (usando crypto de Node.js con salt)
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Verificar contraseña
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const [salt, storedHash] = hash.split(':');
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hashVerify === storedHash;
  } catch (error) {
    return false;
  }
}

// Generar token aleatorio
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generar JWT simple (sin dependencias externas)
export function generateJWT(userId: number, email: string, expiresIn: number = 7 * 24 * 60 * 60): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    sub: userId,
    email: email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn
  };

  const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64url');
  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('base64url');

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

// Verificar JWT
export function verifyJWT(token: string): { sub: number; email: string; iat: number; exp: number } | null {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const [headerEncoded, payloadEncoded, signature] = token.split('.');

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64url').toString());

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

// Validar formato de email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 120;
}

// Validar fuerza de contraseña
export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial (!@#$%^&*)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
