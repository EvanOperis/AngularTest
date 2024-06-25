import { publishFacade } from "@angular/compiler";
import { SnapType } from "./snap-type.type";

export class FaceSnap {

    location?: string;

    constructor(public title: string,
        public description: string,
        public imageUrl: string,
        public createdAt: Date,
        public snaps: number,
        public id: number) { }

    addSnap(): void {
        this.snaps++;
    }

    removeSnap(): void {
        this.snaps--;
    }

    snap(snapType: SnapType) {
        if (snapType === 'snap') {
            this.addSnap();
        } else if (snapType === 'unsnap') {
            this.removeSnap();
        }
    }

    setLocation(newLocation: string): void {
        this.location = newLocation;
    }

    withLocation(location: string): FaceSnap {
        this.setLocation(location);
        return this;
    }
}