import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {
    private faceSnaps: FaceSnap[] = [
        new FaceSnap(
            "Empereur capy",
            "L'envahisseur à la recherche de SIG_Init",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg/220px-Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg",
            new Date(),
            0
        ),
        new FaceSnap(
            "GUA-CAMOLE",
            "Peel the avocado",
            "https://i1.sndcdn.com/artworks-000345790881-7llsfv-t500x500.jpg",
            new Date(),
            10056092
        ).withLocation('INTERNEEEEEEET'),
        new FaceSnap(
            "Lutin grognon",
            "Il vit sous ce pont",
            "https://i.ytimg.com/vi/PDM9paoYZT4/maxresdefault.jpg",
            new Date(),
            0
        )
    ];

    getFaceSnaps(): FaceSnap[] {
        return [...this.faceSnaps]
    }

    snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
        const FaceSnap = this.getFaceSnapById(faceSnapId);
        FaceSnap.snap(snapType);
    }

    getFaceSnapById(faceSnapId: string): FaceSnap {
        const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (!foundFaceSnap) {
            throw new Error('FaceSnap not found!');
        }
        return foundFaceSnap;
    }
}