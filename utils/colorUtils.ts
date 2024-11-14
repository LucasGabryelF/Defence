function darkenHexColor(hex: string, factor: number = 0.2): string {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error("Formato de cor hexadecimal inválido. Use o formato #RRGGBB.");
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const darken = (value: number) => Math.max(0, Math.min(255, value * (1 - factor)));

    const darkenedR = darken(r);
    const darkenedG = darken(g);
    const darkenedB = darken(b);

    return `#${Math.round(darkenedR).toString(16).padStart(2, '0')}${Math.round(darkenedG).toString(16).padStart(2, '0')}${Math.round(darkenedB).toString(16).padStart(2, '0')}`;
}

export default {darkenHexColor}