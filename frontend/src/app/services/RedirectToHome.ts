import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SignalService } from "../ngrxSignal/auth.store";
import { CanActivate } from "@angular/router";
@Injectable({
    providedIn: "root"
})

export class RedirectToHome implements CanActivate{
    constructor(private signalService: SignalService, private router: Router) {}
    
    canActivate(): boolean {
        if (this.signalService.isLoggedInSignal() === true) {
            this.router.navigate(["/home"]);
            return false;
        }
        return true;
    }
}