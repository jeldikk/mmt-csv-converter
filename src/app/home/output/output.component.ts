import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElectronService } from '../../core/services';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit, OnDestroy {

  loadingSubscription: Subscription;

  loading: boolean = false;
  data: any;
  type: "error" | "success" | "info" | "loading" | 'default' = "default"

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {

    this.loadingSubscription = this.loadingService.loading.subscribe((value)=>{
      const {isLoading, type, message} = value;
      this.loading = isLoading;
      this.type = type;
      this.data = message
    })

  }

  ngOnDestroy(): void {
      this.loadingSubscription.unsubscribe();
  }

}
