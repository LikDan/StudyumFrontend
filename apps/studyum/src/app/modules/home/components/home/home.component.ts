import {Component} from "@angular/core"
import {UserService} from "../../../../shared/services/core/user.service"
import {User} from "../../../../shared/models/user"
import {Observable} from "rxjs"
import {Card} from "../../../../../../../../libs/home/cards/src/lib/models"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  cards: Card[] = [
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
}
