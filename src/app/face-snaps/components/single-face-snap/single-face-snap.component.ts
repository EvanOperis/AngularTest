import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap$!: Observable<FaceSnap>;
  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  onSnap(faceSnapId: number): void {
    this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, (this.userHasSnapped) ? 'unsnap' : 'snap').pipe(
      tap(() => {
        this.snapButtonText = (this.userHasSnapped) ? 'Oh Snap!' : 'Oops, unSnap!';
        this.userHasSnapped = !this.userHasSnapped;
      })
    );
  }

  private prepareInterface() {
    this.userHasSnapped = false;
    this.snapButtonText = 'Oh Snap!'
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
}
