// Funciones de autenticación compatibles con Edge Runtime
// Usa Web Crypto API en lugar de Node.js crypto

// Función para codificar texto a Uint8Array
function textToUint8Array(text: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

// Función para convertir ArrayBuffer a base64url
function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Función para convertir base64url a ArrayBuffer
function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(base64 + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Verificar JWT usando Web Crypto API (compatible con Edge Runtime)
export async function verifyJWTEdge(token: string): Promise<{ sub: number; email: string; iat: number; exp: number } | null> {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const [headerEncoded, payloadEncoded, signature] = token.split('.');

    if (!headerEncoded || !payloadEncoded || !signature) {
      return null;
    }

    // Crear la clave para HMAC
    const encoder = new TextEncoder();
    const secretData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      secretData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );

    // Verificar la firma
    const data = encoder.encode(`${headerEncoded}.${payloadEncoded}`);
    const signatureBuffer = base64UrlToArrayBuffer(signature);
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      data
    );

    if (!isValid) {
      return null;
    }

    // Decodificar el payload
    const payloadJson = new TextDecoder().decode(base64UrlToArrayBuffer(payloadEncoded));
    const payload = JSON.parse(payloadJson);

    // Verificar expiración
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}