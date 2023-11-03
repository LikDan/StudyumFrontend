import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe, UnaryFunction } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { SelectItem, SelectItems } from '@shared/modules/ui/entities/select';
import {
  ScheduleTypeEntry,
  ScheduleTypes,
} from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.entities';

@Injectable({
  providedIn: 'root',
})
export class ScheduleAddLessonService {
  private http = inject(HttpClient);

  private _types$ = new BehaviorSubject<ScheduleTypes | null>(null);

  get types$(): Observable<ScheduleTypes> {
    return this._types$.pipe(filterNotNull());
  }

  get subjects$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddLessonService.mapTypesToSelectValues('subjects'));
  }

  get teachers$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddLessonService.mapTypesToSelectValues('teachers'));
  }

  get groups$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddLessonService.mapTypesToSelectValues('groups'));
  }

  get rooms$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddLessonService.mapTypesToSelectValues('rooms'));
  }

  private static typeToSelectValue(type: ScheduleTypeEntry): SelectItem {
    return {
      id: type.id,
      value: type.id,
      display: type.title,
    };
  }

  private static typesToSelectValues(types: ScheduleTypeEntry[]): SelectItems {
    return types.map(ScheduleAddLessonService.typeToSelectValue);
  }

  private static mapTypesToSelectValues(
    typeName: string
  ): UnaryFunction<Observable<ScheduleTypes>, Observable<SelectItems>> {
    return pipe(
      map(v => v[typeName]),
      map(ScheduleAddLessonService.typesToSelectValues)
    );
  }

  load(): void {
    this.http
      .get<ScheduleTypes>(`api/v1/schedule/types`)
      .subscribe(this._types$.next.bind(this._types$));
  }
}