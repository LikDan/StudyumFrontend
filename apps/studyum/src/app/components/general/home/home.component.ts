import {Component} from "@angular/core"
import {UserService} from "../../../services/shared/user.service"
import {User} from "../../../models/user"
import {Observable} from "rxjs"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  cards: {title: string; url: string; route: string; permissions?: string[]}[] =
    [
      {
        title: "header.schedule",
        url: "assets/schedule-gray.svg",
        route: "schedule",
        permissions: undefined,
      },
      {
        title: "header.journal",
        url: "assets/journal-gray.svg",
        route: "journal",
        permissions: [],
      },
    ]

  user$: Observable<User | undefined>

  constructor(public userService: UserService) {
    this.user$ = this.userService.user$
  }

  checkPermissions(user: User | undefined, permissions?: string[]) {
    if (permissions == undefined) return true
    if (user == undefined) return false

    for (let permission of permissions)
      if (user?.permissions.findIndex((p) => p == permission) == -1)
        return false

    return true
  }
}
