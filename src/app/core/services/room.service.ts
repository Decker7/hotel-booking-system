import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Room } from '../models/room.interface';

import { Booking } from '../models/booking.interface';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiUrl = 'https://6944a8a87dd335f4c360dc3e.mockapi.io/api/v1/rooms';
    private STORAGE_KEY = 'hotel_bookings';

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
            }))),
            map(rooms => this.mergeWithLocalBookings(rooms))
        );
    }

    getRoomById(id: string): Observable<Room | undefined> {
        return this.http.get<Room>(`${this.apiUrl}/${id}`).pipe(
            map(room => ({
                ...room,
                name: room.roomName,
                imageUrl: this.getRoomImage(room.type),
                amenities: ['WiFi', 'Air Conditioning']
            })),
            map(room => room ? this.mergeWithLocalBookings([room])[0] : undefined)
        );
    }

    bookRoom(booking: Booking): Observable<Room> {
        // 1. Persist to LocalStorage (Optimistic/Backup)
        const bookings: Booking[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        bookings.push(booking);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));

        // 2. Sync with API (Source of Truth)
        if (!booking.roomId) {
            console.warn('Room has no ID - skipping API sync and using local storage only.');
            return of({} as Room);
        }

        // Fetch the latest room state first to avoid overwriting other fields
        const url = `${this.apiUrl}/${booking.roomId}`;
        return this.http.get<Room>(url).pipe(
            switchMap((room: Room) => {
                const updatedRoom = { ...room, isAvailable: false };
                return this.http.put<Room>(url, updatedRoom);
            })
        );
    }

    private mergeWithLocalBookings(rooms: Room[]): Room[] {
        const bookings: Booking[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        const bookedRoomIds = new Set(bookings.map(b => b.roomId));

        return rooms.map(room => ({
            ...room,
            isAvailable: !bookedRoomIds.has(room.id) && room.isAvailable
        }));
    }

    resetBookings() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    getBookings(): Observable<Booking[]> {
        const bookings: Booking[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        return of(bookings);
    }
}
