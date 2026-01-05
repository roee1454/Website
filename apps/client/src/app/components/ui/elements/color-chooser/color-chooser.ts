import { Component, effect, signal } from '@angular/core';
import { NgClass } from '@angular/common';

const COLORS = [
    { name: 'Rose', value: '#e11d48', class: 'bg-rose-600' },
    { name: 'Orange', value: '#ea580c', class: 'bg-orange-600' },
    { name: 'Amber', value: '#d97706', class: 'bg-amber-600' },
    { name: 'Green', value: '#16a34a', class: 'bg-green-600' },
    { name: 'Blue', value: '#2563eb', class: 'bg-blue-600' },
    { name: 'Indigo', value: '#4f46e5', class: 'bg-indigo-600' },
    { name: 'Violet', value: '#7c3aed', class: 'bg-violet-600' },
];

@Component({
    selector: 'app-color-chooser',
    standalone: true,
    imports: [NgClass],
    templateUrl: './color-chooser.html',
})
export class ColorChooserComponent {
    protected colors = COLORS;
    protected selectedColor = signal<string>(COLORS[4].value);

    constructor() {
        // Load saved color from localStorage
        const savedColor = localStorage.getItem('theme-primary');
        if (savedColor) {
            this.selectedColor.set(savedColor);
        }

        effect(() => {
            const color = this.selectedColor();
            document.documentElement.style.setProperty('--color-primary', color);
            localStorage.setItem('theme-primary', color);
        });
    }

    setColor(colorCtx: { value: string }) {
        this.selectedColor.set(colorCtx.value);
    }
}
