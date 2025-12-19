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

    private getRoomImage(type: string): string {
        switch (type.toLowerCase()) {
            case 'single':
                return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            case 'double':
                return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            case 'suite':
                return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            default:
                return 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        }
    }

    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.apiUrl).pipe(
            map(rooms => rooms.map(room => ({
                ...room,
                name: room.roomName,
                imageUrl: this.getRoomImage(room.type),
                amenities: ['WiFi', 'Air Conditioning']
            })))
        );
    }

    getRoomById(id: string): Observable<Room | undefined> {
        return this.http.get<Room>(`${this.apiUrl}/${id}`).pipe(
            map(room => ({
                ...room,
                name: room.roomName,
                imageUrl: this.getRoomImage(room.type),
                amenities: ['WiFi', 'Air Conditioning']
            }))
        );
    }
}
