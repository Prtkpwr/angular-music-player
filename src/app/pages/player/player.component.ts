import { Component } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { AuthService } from '../../services/auth.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Injectable,ElementRef } from '@angular/core';
declare const $:any;

const URL = 'http://localhost:3000';
// import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  currentSongGif = false;

  constructor(private _bottomSheet: MatBottomSheet, private audioService: AudioService, cloudService: CloudService, public auth: AuthService) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
      // console.log(events)
      if(event.type === "ended"){
        this.next();
      }
    });
  }
  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.currentSongGif = true;
    this.playStream(file.url);
  }

  pause() {
    this.currentSongGif = false;
    this.audioService.pause();
  }

  play() {
    this.currentSongGif = true;
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'TEMP' });
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit(){
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log("ImageUpload:uploaded:", item, status, response, headers);
      console.log(item.file.name + " uploaded!")
      let data = {
        "originalFileName": item.file.name,
        "newFileName": response.split('uploads/')[1]
      }
      $('#fileUploadID').val("");
    };
  }
}
