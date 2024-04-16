import crypto from 'crypto';

function createHash(username, password) {
    const hash = crypto.createHash('sha256');
    hash.update(username + password);
    return hash.digest('hex');
}
  
export { createHash };