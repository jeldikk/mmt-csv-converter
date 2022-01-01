import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ElectronService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading = new Subject<{isLoading: boolean, startedBy: "validate" | "convert", type: "error" | "success" | "info" | "loading", message: any}>()

  constructor() {
    
   }
}
