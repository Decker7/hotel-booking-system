import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Room } from '../models/room.interface';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiUrl = 'https://6944a8a87dd335f4c360dc3e.mockapi.io/api/v1/rooms';

    constructor(private http: HttpClient) { }

    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.apiUrl).pipe(
            map(rooms => rooms.map(room => ({
                ...room,
                name: room.roomName, // Map roomName to name for compatibility
                imageUrl: 'https://placehold.co/600x400', // Default image
                amenities: ['WiFi', 'Air Conditioning'] // Default amenities
            })))
        );
    }

    getRoomById(id: string): Observable<Room | undefined> {
        return this.http.get<Room>(`${this.apiUrl}/${id}`).pipe(
            map(room => ({
                ...room,
                name: room.roomName,
                imageUrl: 'https://placehold.co/600x400',
                amenities: ['WiFi', 'Air Conditioning']
            }))
        );
    }
}
