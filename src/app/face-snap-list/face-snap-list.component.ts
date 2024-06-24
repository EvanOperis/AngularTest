import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceCapyComponent } from '../face-capy/face-capy.component';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Subject, interval, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceCapyComponent,
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  constructor(private faceSnapsService: FaceSnapsService) {}

  faceSnaps!: FaceSnap[];
  private destroy$!: Subject<boolean>;

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps = this.faceSnapsService.getFaceSnaps();

    interval(1000).pipe(
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
