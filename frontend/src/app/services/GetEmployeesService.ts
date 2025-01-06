import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignalService } from "../ngrxSignal/auth.store";

@Injectable({
    providedIn:"root",
})

export class getEmployeesService {
    private apiUrl = "http://localhost:3000/allemp"
    constructor(private http:HttpClient, private signalService: SignalService){}
    getEmployees():Observable<any>{
        const token = this.signalService.jwtTokenSignal();
        console.log(token)
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get(this.apiUrl, { headers: headers });
    }
}