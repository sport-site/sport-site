import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { IUser } from 'src/app/modules/admin/shared/interfaces';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    public form!: FormGroup;
    public submitted: boolean = false;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.email,
                Validators.required,
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }
        this.submitted = true;
        const user: IUser = {
            email: this.form.value.email,
            password: this.form.value.password,
        };

        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
            this.submitted = false;
        });
    }
}