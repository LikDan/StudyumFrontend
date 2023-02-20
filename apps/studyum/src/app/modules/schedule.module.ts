import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ViewComponent} from "../components/schedule/view/view.component"
import {CellComponent} from "../components/schedule/view/cell/cell.component"
import {ScheduleSubjectComponent} from "../components/schedule/view/schedule-subject/schedule-subject.component"
import {AddSubjectDialogComponent} from "../components/schedule/view/edit/add-subject-dialog/add-subject-dialog.component"
import {SubjectSelectionComponent} from "../components/schedule/view/subject-selection/subject-selection.component"
import {SelectSubjectDialogComponent} from "../components/schedule/view/cell/select-subject-dialog/select-subject-dialog.component"
import {ScheduleCellDirective} from "../components/schedule/view/cell/cell-directive/schedule-cell.directive"
import {EditScheduleComponent} from "../components/schedule/view/edit/edit-scdedule/edit-schedule.component"
import {ScheduleTopBarComponent} from "../components/schedule/view/schedule-top-bar/schedule-top-bar.component"
import {CommonModule} from "@angular/common"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "./shared.module"
import {ModalsModule} from "../../../../../libs/modals/src"
import {UiElementsModule} from "../../../../../libs/ui-elements/src"

const routes: Routes = [
  {
    title: "header.sliders.schedule",
    path: "",
    component: ViewComponent,
    canActivate: [],
  },
]

@NgModule({
  declarations: [
    CellComponent,
    ScheduleSubjectComponent,
    AddSubjectDialogComponent,
    SubjectSelectionComponent,
    SelectSubjectDialogComponent,
    ScheduleCellDirective,
    EditScheduleComponent,
    ScheduleTopBarComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    UiElementsModule,
  ],
  exports: [RouterModule],
})
export class ScheduleModule {}