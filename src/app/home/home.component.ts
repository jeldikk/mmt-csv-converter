import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  inputForm: FormGroup;

  validationError = false;

  constructor(private loadingService: LoadingService, private electronService: ElectronService) { }

  ngOnInit(): void {

    console.log('HomeComponent INIT');

    this.inputForm = new FormGroup({
      mmtFilePath: new FormControl('', [Validators.required]),
      outputFolderPath: new FormControl('', [Validators.required]),
    });

  }

  ngOnDestroy(): void {
      // this.loadingSubscription.unsubscribe();
      console.log("home component destroyed")
  }

  convertFile(){
    if(this.electronService.isElectron){
      const {mmtFilePath, outputFolderPath} = this.inputForm.value;
      this.loadingService.loading.next({isLoading: true, startedBy: 'convert', type: 'loading', message: 'converting .mmt to csv'})
      console.log("file convertions initiated");
      this.electronService.ipcRenderer.invoke('convert-file', ({ifilename: mmtFilePath, ofolder: outputFolderPath}))
        .then((response)=>{
          const {status} = response;
          if(status === 'error'){
            this.validationError = true
            this.loadingService.loading.next({isLoading: false, startedBy: 'convert', type: 'error', message: response.message});
          }
          else{
            this.validationError = false
            this.loadingService.loading.next({isLoading: false, startedBy: 'convert', type: 'success', message: response.message})
          }
        })
    }
  }

  validateFile(){
    if(this.electronService.isElectron){
      const {mmtFilePath} = this.inputForm.value;
      this.loadingService.loading.next({isLoading: true, startedBy: 'validate', type: "loading", message: 'Validation and Retrieving Info from mmt file'})
      this.electronService.ipcRenderer.invoke("validate-file", {filename: mmtFilePath})
        .then((response)=>{
          console.log({response})
          const {status} = response;
          if(status === 'error'){
            this.validationError = true;
            this.loadingService.loading.next({isLoading: false, startedBy: 'validate', type: 'error', message: response.message})
          }
          else{
            this.validationError = false
            this.loadingService.loading.next({isLoading: false, startedBy: 'validate', type: 'info', message: response})
          }

        })
        .catch((_)=>{
          this.loadingService.loading.next({isLoading: false, startedBy: 'validate', type: 'error', message: 'Error occured while validating input file' })
        })
    }
  }

  selectFileDialog(){

    if(this.electronService.isElectron){
      
      this.electronService.ipcRenderer.invoke('open-dialog', {dialogType: 'openFile', dialogTitle: 'Select .mmt File'})
          .then((result)=>{
            const {canceled, filePaths} = result;
            if(!canceled){
              console.log(this.inputForm.get('mmtFilePath'));
              this.inputForm.get('mmtFilePath').setValue(filePaths[0])
            }
          })
          .catch((err)=>{
            console.error(err);
          })
    }
    else{
      console.log("this doesn't work in browser");
    }
  }

  selectFolderDialog(){
    if(this.electronService.isElectron){
      console.log("now opens a dialog to select folder");

      this.electronService.ipcRenderer.invoke('open-dialog', {dialogType: 'openDirectory', dialogTitle: 'Select Output Folder'})
          .then((result)=>{
            const {canceled, filePaths} = result;
            if(!canceled){
              this.inputForm.get('outputFolderPath').setValue(filePaths[0])
            }
          })
          .catch((err)=>{
            console.error(err)
          })
    }
    else{
      console.log("this doesn't work in browser");
    }
  }

}
