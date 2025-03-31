import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiError } from 'src/app/models/apierrors.model';
import { UserService } from 'src/app/services/user.service';
import { LoginForm } from './login.forms';
import { ListErrorsComponent } from "../../shared-components/list-errors/list-errors.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ListErrorsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = "";
  errors!: ApiError;
  isSubmitting = false;
  authForm: FormGroup<LoginForm>;
  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    // use FormBuilder to create a form group
    this.authForm = new FormGroup<LoginForm>({
      email: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    this.title = "Login";
  }

  submitForm(): void {
    this.isSubmitting = true;

    let observable = this.userService.login(
      this.authForm.value as { email: string; password: string }
    );

    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => void this.router.navigate(["/"]),
      error: (errors: ApiError) => {
        console.log(errors);
        this.errors = errors;
        this.isSubmitting = false;
      },
    });
  }
}
