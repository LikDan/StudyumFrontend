import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, merge, Observable, Subscription, switchMap } from 'rxjs';
import { SchedulePlugComponent } from '@schedule/components/schedule-plug/schedule-plug.component';
import { ScheduleService } from '@schedule/services/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { Schedule } from '@schedule/entities/schedule';
import { BaseScheduleComponent } from '@schedule/components/base-schedule/base-schedule.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedule$!: Observable<Schedule | null>;

  protected readonly SchedulePlugComponent = SchedulePlugComponent;
  protected readonly BaseScheduleComponent = BaseScheduleComponent;

  private navigateSubscription: Subscription | null = null;
  private service = inject(ScheduleService);
  private route = inject(ActivatedRoute);
  private studyPlaceService = inject(StudyPlacesService);

  ngOnInit(): void {
    this.schedule$ = merge(this.route.params, this.route.queryParams)
      .pipe(map(this.parseParams.bind(this)))
      .pipe(switchMap(p => this.service.getSchedule(p)))
      .pipe(map(s => (s.lessons ? s : null)));
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe();
  }

  private parseParams(): GetScheduleDTO {
    const type = this.route.snapshot.params['type'];
    const typename = this.route.snapshot.params['typename'];
    const studyPlaceID = this.studyPlaceService.currentID;
    const startDate = this.route.snapshot.queryParams['startDate'];
    const endDate = this.route.snapshot.queryParams['endDate'];

    if (!type || !typename) return {};

    return {
      type: type,
      typename: typename,
      studyPlaceID: studyPlaceID,
      startDate: startDate,
      endDate: endDate,
    };
  }
}