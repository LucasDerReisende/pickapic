export function createRandomPin() {
    const min = 0;       // Minimum 6-digit number
    const max = 999999;  // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)).toString().padStart(6, '0');
}
