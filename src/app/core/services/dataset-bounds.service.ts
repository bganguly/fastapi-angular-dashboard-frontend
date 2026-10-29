import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, retry, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DatasetBounds {
  from: string;
  to: string;
}

@Injectable({ providedIn: 'root' })
export class DatasetBoundsService {
  private readonly http = inject(HttpClient);
  private readonly cache$ = this.http
    .get<DatasetBounds>(`${environment.apiBase}/api/dataset-bounds`)
    .pipe(
      retry({ count: 4, delay: (_, n) => timer(n * 2000) }),
      shareReplay(1),
    );

  get(): Observable<DatasetBounds> {
    return this.cache$;
  }
}
