import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap';
import { FaceCapyComponent } from '../face-capy/face-capy.component';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceCapyComponent,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit {

  constructor(private faceSnapsService: FaceSnapsService) {}

  faceSnaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getFaceSnaps();
  }
}
