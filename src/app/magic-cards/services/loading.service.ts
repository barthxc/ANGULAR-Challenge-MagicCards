import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);

  isLoading$ = this._isLoading.asObservable();

  setLoading(value: boolean): void {
    this._isLoading.next(value);
  }
}
