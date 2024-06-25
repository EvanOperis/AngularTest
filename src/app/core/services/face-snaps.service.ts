import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    constructor(private http: HttpClient) { }

    private faceSnaps: FaceSnap[] = [
        // new FaceSnap(
        //     "Empereur capy",
        //     "L'envahisseur à la recherche de SIG_Init",
        //     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg/220px-Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg",
        //     new Date(),
        //     0
        // ),
        // new FaceSnap(
        //     "GUA-CAMOLE",
        //     "Peel the avocado",
        //     "https://i1.sndcdn.com/artworks-000345790881-7llsfv-t500x500.jpg",
        //     new Date(),
        //     10056092
        // ).withLocation('INTERNEEEEEEET'),
        // new FaceSnap(
        //     "Lutin grognon",
        //     "Il vit sous ce pont",
        //     "https://i.ytimg.com/vi/PDM9paoYZT4/maxresdefault.jpg",
        //     new Date(),
        //     0
        // )
    ];

    getFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps')
    }

    snapFaceSnapById(faceSnapId: number, snapType: SnapType): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap => ({
                ...faceSnap,
                snaps: faceSnap.snaps + ((snapType === "snap") ? 1 : -1)
            })),
            switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
                `http://localhost:3000/facesnaps/${faceSnapId}`,
                updatedFaceSnap
            ))
        );
    }

    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
        return this.getFaceSnaps().pipe(
            map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
            map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
            map(previousFacesnap => ({
                ...formValue,
                snaps: 0,
                createdDate: new Date(),
                id: previousFacesnap.id + 1
            })),
            switchMap(newFacesnap => this.http.post<FaceSnap>(
                'http://localhost:3000/facesnaps',
                newFacesnap)
            )
        );
    }
}