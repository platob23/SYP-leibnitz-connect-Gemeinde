export function hexToImageUrl(hexString: string | null | undefined): string {
    if (!hexString) return "";

    try {
        const hex = hexString.replace(/^\\x/, "").replace(/^0x/i, "");

        const match = hex.match(/.{1,2}/g);
        if (!match) return "";

        const bytes = new Uint8Array(match.map(b => parseInt(b, 16)));

        // Dateityp aus Magic Bytes erkennen
        let mimeType = "image/jpeg";
        if (bytes[0] === 0x89 && bytes[1] === 0x50) mimeType = "image/png";
        else if (bytes[0] === 0x47 && bytes[1] === 0x49) mimeType = "image/gif";
        else if (bytes[0] === 0x52 && bytes[1] === 0x49) mimeType = "image/webp";

        // Sicheres btoa für große Daten
        let binary = "";
        const chunkSize = 8192;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }

        return `data:${mimeType};base64,${btoa(binary)}`;
    } catch (error) {
        console.error("Fehler beim Konvertieren:", error);
        return "";
    }
}