import {Injectable} from "@angular/core"
import {ScheduleHttpService} from "../../schedule/servieces/http/schedule-http.service"
import {Lesson} from "../../../shared/models/schedule"
import {JournalService} from "./journal.service"
import {JournalMarksService} from "./journal-marks.service"
import {JournalCell, Mark} from "../../../shared/models/journal"
import {JournalCellService} from "./journal.cell.service"
import {JournalHttpService} from "./http/journal-http.service"
import {Observable} from "rxjs"

@Injectable({
  providedIn: "root",
})
export class JournalLessonService {
  constructor(
    private scheduleHttp: ScheduleHttpService,
    private http: JournalHttpService,
    private service: JournalService,
    private markService: JournalMarksService,
    private cellService: JournalCellService
  ) {}

  get journal() {
    return this.service.journal
  }

  getLessons(id: string): Observable<Lesson[]> {
    return this.scheduleHttp.getDateLessonByID(id)
  }

  editLesson(lesson: Lesson): void {
    this.scheduleHttp.updateLesson(lesson).subscribe({
      next: (lesson) => {
        for (let i = 0; i < this.journal.dates.length; i++) {
          for (let j = 0; j < this.journal.dates[i].length; j++) {
            for (let k = 0; k < this.journal.dates[i][j].length; k++) {
              if (this.journal.dates[i][j][k].id !== lesson.id) continue

              this.journal.dates[i][j][k] = lesson
              break
            }
          }
        }
      },
    })
  }

  addMark(lesson: JournalCell, m: Mark): void {
    this.http.addMark(m).subscribe({
      next: (mark) => {
        // if (!lesson.marks) lesson.marks = [mark]
        // else lesson.marks.push(mark)
        //
        // this.markService.refresh(this.journal.rows[lesson.point!!.y], lesson)
      },
    })
  }

  parseTextColumn(s: string): void {
    let rows = this.service.journal.rows
    let lesson = this.cellService.selectedDate$.value
    if (!lesson) return

    s.split("\n")
      .flatMap((l, i) =>
        l.split(" ").map((m) => [
          this.journal.rows[i].cells.flat(2)[lesson!!.point!!.x],
          <Mark>{
            mark: m,
            studentID: rows[i].id,
            lessonID: lesson!!.id,
          },
        ])
      )
      .forEach((m) => this.addMark(m[0] as JournalCell, m[1] as Mark))
  }
}
