import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

    public AUTH_SERVER: string = 'http://192.168.0.155:4000';
    public identity;
    public token;
    public isLoginSubject; // user loged/not loged

    private updateUserData = new Subject<User>();
    
    constructor(private http: HttpClient) { 
        if (this.getIdentity()) {
            this.isLoginSubject = new BehaviorSubject<boolean>(true);
          } else {
            this.isLoginSubject = new BehaviorSubject<boolean>(false);
          }
    }

    getAll() {
        return this.http.get<User[]>(`${this.AUTH_SERVER}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.AUTH_SERVER}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${this.AUTH_SERVER}/users/register`, user);
    }

    update(user: User) {
        console.log("esto recibo en user service front", user.id)
        return this.http.put(`${this.AUTH_SERVER}/users/` + user.id, { firstName: user.firstName, lastName: user.lastName, password: user.password });
    }

    delete(id: number) {
        return this.http.delete(`${this.AUTH_SERVER}/users/` + id);
    }

    updateUserRole(user: User) {
        if(user.userRole === 'admin'){
            return this.http.put(`${this.AUTH_SERVER}/users/` + user.id, { userRole: 'standart' });

        }else{
            return this.http.put(`${this.AUTH_SERVER}/users/` + user.id, { userRole: 'admin' });
        }
    }


    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('currentUser'));
        if (identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    /**
     * Method for subscribe for know when user has updated his user data.
     * @returns {Observable<any>}
     */
    userDataChanged() {
        return this.updateUserData.asObservable();
    }

}