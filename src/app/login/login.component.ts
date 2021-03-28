import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { machineId, machineIdSync } from 'node-machine-id';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  RegistrationForm: FormGroup;

  returnUrl: any;
  IsSubmitted: boolean;
  modalReference: any;


  constructor(public fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private authenticationService: AuthenticationService, private deviceService: DeviceDetectorService,
    private modalService: NgbModal) {
    //It redirect to home if already logged in
    // if (this.authenticationService.userValue) { 
    this.router.navigate(['/']);
    console.log()
    // }
  }

  CreateModal(ModalTemp: TemplateRef<any>) {
  
    this.modalReference = this.modalService.open(ModalTemp, { backdrop: 'static', size: 'md', keyboard: false, centered: true });
  }

  ngOnInit(): void {
    this.CreateRegistrationForm();
    this.CreateLoginForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  } 

  CreateRegistrationForm() {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      RememberMe: [false]
    });
  }

  CreateLoginForm() {
    this.RegistrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  OnSubmit() {
    if (this.LoginForm.valid) {
      this.IsSubmitted = false;
      this.UserLogin();
    } else {
      this.IsSubmitted = true;
      console.log('Invalid');

    }
  }

  UserLogin() {
    this.authenticationService.login(this.LoginForm.controls['username'].value, this.LoginForm.controls['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.returnUrl)
          // if(data.)
          this.router.navigate(['home']);
        });
  }

  CloseModal() {
    this.modalService.dismissAll();
  }

}
