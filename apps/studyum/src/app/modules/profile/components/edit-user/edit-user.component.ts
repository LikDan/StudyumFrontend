import {Component, OnInit} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {sameAs} from "../../../../utils"
import {UserService} from "../../../../shared/services/core/user.service"

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.minLength(8)]),
    picture: new FormControl("", [
      Validators.required,
      Validators.pattern("(https?:\\/\\/.*\\.(?:png|jpg|gif))"),
    ]),
    passwordConfirm: new FormControl("", sameAs("password")),
    login: new FormControl("", Validators.required),
  })

  get image(): string {
    return this.form.get("picture")?.value ?? ""
  }

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: (user) => {
        this.form.get("email")?.setValue(user?.email ?? "")
        this.form.get("login")?.setValue(user?.login ?? "")
        this.form.get("picture")?.setValue(user?.picture ?? "")
      },
    })
  }

  submit() {
    this.userService.update(this.form.value)
  }

  changeImage(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement
    const file = target.files?.item(0)
    if (!file) return

    this.userService.uploadImage(file).subscribe({
      next: (url) => this.form.get("picture")?.setValue(url),
    })
  }
}
