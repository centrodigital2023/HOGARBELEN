export const generateTOTPSecret = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars[Math.floor(Math.random() * chars.length)];
  }
  return secret;
};

const base32Decode = (secret: string): Uint8Array => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleanSecret = secret.replace(/\s/g, '').toUpperCase();
  const bytes: number[] = [];
  let buffer = 0;
  let bitsLeft = 0;

  for (const char of cleanSecret) {
    const val = alphabet.indexOf(char);
    if (val === -1) continue;
    
    buffer = (buffer << 5) | val;
    bitsLeft += 5;
    
    if (bitsLeft >= 8) {
      bytes.push((buffer >> (bitsLeft - 8)) & 0xFF);
      bitsLeft -= 8;
    }
  }

  return new Uint8Array(bytes);
};

const hmacSHA1 = async (key: Uint8Array, message: Uint8Array): Promise<Uint8Array> => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, message);
  return new Uint8Array(signature);
};

const generateHOTP = async (secret: string, counter: number): Promise<string> => {
  const decodedSecret = base32Decode(secret);
  
  const counterBuffer = new ArrayBuffer(8);
  const counterView = new DataView(counterBuffer);
  counterView.setBigUint64(0, BigInt(counter), false);
  
  const hmac = await hmacSHA1(decodedSecret, new Uint8Array(counterBuffer));
  
  const offset = hmac[hmac.length - 1] & 0x0F;
  const code = (
    ((hmac[offset] & 0x7F) << 24) |
    ((hmac[offset + 1] & 0xFF) << 16) |
    ((hmac[offset + 2] & 0xFF) << 8) |
    (hmac[offset + 3] & 0xFF)
  ) % 1000000;
  
  return code.toString().padStart(6, '0');
};

export const generateTOTPToken = async (secret: string, timeStep: number = 30): Promise<string> => {
  const counter = Math.floor(Date.now() / 1000 / timeStep);
  return generateHOTP(secret, counter);
};

export const verifyTOTPToken = (secret: string, token: string, window: number = 1): boolean => {
  const timeStep = 30;
  const counter = Math.floor(Date.now() / 1000 / timeStep);
  
  for (let i = -window; i <= window; i++) {
    const testCounter = counter + i;
    generateHOTP(secret, testCounter).then(expectedToken => {
      if (expectedToken === token) {
        return true;
      }
    });
  }
  
  return false;
};

export const generateQRCodeURL = (secret: string, email: string, issuer: string = 'Hogar Belén Admin'): string => {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedEmail = encodeURIComponent(email);
  const otpauthURL = `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthURL)}`;
};

export const formatSecretForDisplay = (secret: string): string => {
  return secret.match(/.{1,4}/g)?.join(' ') || secret;
};
