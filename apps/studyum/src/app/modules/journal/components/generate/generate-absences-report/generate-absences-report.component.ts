import {Component} from "@angular/core"
import {FormControl, FormGroup} from "@angular/forms"
import * as moment from "moment"
import {JournalService} from "../../../services/journal.service"

@Component({
  selector: "app-generate-absences-report",
  templateUrl: "./generate-absences-report.component.html",
  styleUrls: ["./generate-absences-report.component.scss"],
})
export class GenerateAbsencesReportComponent {
  form = new FormGroup({
    startDate: new FormControl(moment().subtract(1, "month").format("YYYY-MM-DD")),
    endDate: new FormControl(moment().format("YYYY-MM-DD")),
  })

  constructor(private service: JournalService) {}

  submit(): void {
    let v = this.form.value
    v.startDate = moment.utc(v.startDate).toISOString()
    v.endDate = moment.utc(v.endDate).toISOString()

    this.service.generateAbsences(v)
  }
}
