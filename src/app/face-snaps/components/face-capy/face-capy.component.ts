import { Component, Input } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-capy',
  standalone: true,
  imports: [
    UpperCasePipe,
  ],
  templateUrl: './face-capy.component.html',
  styleUrl: './face-capy.component.scss'
})
export class FaceCapyComponent {

  @Input() faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(private router: Router) {

  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`)
  }
}
