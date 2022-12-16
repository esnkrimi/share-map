import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public getItem(key: any) {
    let retrievedObject: any = localStorage.getItem(key);
    return JSON.parse(retrievedObject);
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }
}
