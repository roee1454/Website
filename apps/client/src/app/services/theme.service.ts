import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    getCurrentPrimaryColor(): string {
        // Fallback to rose primary if variable not found
        const styles = getComputedStyle(document.documentElement);
        const color = styles.getPropertyValue('--color-primary').trim();
        return color || '#e11d48';
    }

    getGlitchColors(baseColor?: string): { r: string, g: string, b: string } {
        const color = baseColor || this.getCurrentPrimaryColor();
        const hsl = this.hexToHSL(color);

        // Channel 1: Original color at 70% opacity
        const r = this.hslToRgba(hsl.h, hsl.s, hsl.l, 0.7);

        // Channel 2: Lightness +15%, Saturation -10% at 70% opacity
        // Ensures it's lighter and slightly desaturated
        const g = this.hslToRgba(hsl.h, Math.max(0, hsl.s - 10), Math.min(100, hsl.l + 15), 0.7);

        // Channel 3: Hue +15deg, Lightness -10% at 70% opacity
        // Shifts hue slightly for the split effect
        const b = this.hslToRgba((hsl.h + 15) % 360, hsl.s, Math.max(0, hsl.l - 10), 0.7);

        return { r, g, b };
    }

    private hexToHSL(hex: string): { h: number, s: number, l: number } {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return { h: 0, s: 0, l: 0 }; // Fallback

        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);

        r /= 255;
        g /= 255;
        b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    private hslToRgba(h: number, s: number, l: number, a: number = 1): string {
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }
}
