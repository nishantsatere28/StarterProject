import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class SidebarService {

    isOpend = signal<boolean>(localStorage.getItem('isOpend') === 'true' || false);
    constructor() { }
    toggleSidebar(): void {
        localStorage.setItem('isOpend', JSON.stringify(!this.isOpend()));
        this.isOpend.set(!this.isOpend());
    }

    clearState(): void {
        localStorage.removeItem('isOpend');
        this.isOpend.set(false);
    }
}