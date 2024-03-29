import {Component} from "@angular/core"
import {Locale, SettingsService} from "../../../../shared/services/ui/settings.service"
import {CollapseType} from "../../../journal/services/journal-collapse.service"

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent {
  constructor(private settingsService: SettingsService) {}

  get locales(): Locale[] {
    return SettingsService.locales
  }

  get currentLocaleCode(): string {
    return this.settingsService.localeCode
  }

  set currentLocaleCode(locale: string) {
    this.settingsService.localeCode = locale
  }

  get collapseTypes(): string[] {
    return SettingsService.collapseTypes
  }

  get collapseType(): string {
    return this.settingsService.collapseType
  }

  set collapseType(type: string) {
    this.settingsService.collapseType = type as CollapseType
  }

  get themes(): string[] {
    return SettingsService.themes
  }

  get theme(): string {
    return this.settingsService.theme
  }

  set theme(theme: string) {
    this.settingsService.theme = theme
  }

  get absencesShow(): boolean {
    return this.settingsService.absencesShow
  }

  set absencesShow(checked: boolean) {
    this.settingsService.absencesShow = checked
  }

  get standaloneShow(): boolean {
    return this.settingsService.standaloneShow
  }

  set standaloneShow(checked: boolean) {
    this.settingsService.standaloneShow = checked
  }
}
