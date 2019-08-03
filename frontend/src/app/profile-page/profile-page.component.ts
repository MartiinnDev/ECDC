import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../_services';
import { User } from '../_models';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  private currentUser: User;
  private userToUpdate: User;

  profileForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private _userService: UserService,
              private alertService: AlertService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.currentUser = this._userService.getIdentity();

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.profileForm.value);
    // stop here if form is invalid
    if (this.profileForm.invalid) {
        console.log("invalid form"); 
        return;
    }

    
    this.currentUser.firstName = this.profileForm.value.firstName;
    this.currentUser.lastName = this.profileForm.value.firstName;
    this.currentUser.password = this.profileForm.value.password;

    this.loading = true;
    this._userService.update(this.currentUser)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Actualizado con éxito', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }


}
