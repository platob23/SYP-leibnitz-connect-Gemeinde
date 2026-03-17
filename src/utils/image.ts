// utils/image.ts

export function hexToImageUrl(hexString: string | null | undefined): string {
    if (!hexString) return "";

    try {
        // 1. Supabase-Präfix "\x" entfernen, falls vorhanden
        const hex = hexString.replace(/^\\x/, '');

        // 2. Hex-String in ein Array aus 2-Zeichen-Blöcken aufteilen
        const match = hex.match(/.{1,2}/g);
        if (!match) return "";

        // 3. In Bytes und dann in einen binären String umwandeln
        const bytes = new Uint8Array(match.map(b => parseInt(b, 16)));
        const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');

        // 4. Base64 Data-URL zurückgeben (hier als jpeg formatiert, deckt meist auch png/webp ab)
        return `data:image/jpeg;base64,${btoa(binary)}`;
    } catch (error) {
        console.error("Fehler beim Konvertieren des Bildes:", error);
        return ""; // Fallback, falls der String ungültig ist
    }
}