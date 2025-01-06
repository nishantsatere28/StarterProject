import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import {SignalService} from "../ngrxSignal/auth.store";
import { Router } from "@angular/router";
@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {
    constructor(private signalServive: SignalService
        , private router: Router
    ) {}
    
    canActivate(): boolean {
        if (!this.signalServive.isLoggedInSignal()) {
            alert("You are not logged in");
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }

}