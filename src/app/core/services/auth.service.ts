import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn = false;

    constructor() { }

    login(): Observable<boolean> {
        this.isLoggedIn = true;
        return of(true);
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}
