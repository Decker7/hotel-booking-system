import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../models/room.interface';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private rooms: Room[] = [
        {
            id: 1,
            name: 'Deluxe Ocean View',
            type: 'Deluxe',
            price: 250,
            imageUrl: 'https://placehold.co/600x400',
            isAvailable: true,
            amenities: ['WiFi', 'Air Conditioning', 'Ocean View']
        },
        {
            id: 2,
            name: 'Standard City View',
            type: 'Standard',
            price: 150,
            imageUrl: 'https://placehold.co/600x400',
            isAvailable: true,
            amenities: ['WiFi', 'Air Conditioning']
        },
        {
            id: 3,
            name: 'Executive Suite',
            type: 'Suite',
            price: 450,
            imageUrl: 'https://placehold.co/600x400',
            isAvailable: false,
            amenities: ['WiFi', 'Pool Access', 'Mini Bar', 'King Bed']
        },
        {
            id: 4,
            name: 'Family Room',
            type: 'Family',
            price: 300,
            imageUrl: 'https://placehold.co/600x400',
            isAvailable: true,
            amenities: ['WiFi', 'Kitchenette', '2 Queen Beds']
        }
    ];

    constructor() { }

    getRooms(): Observable<Room[]> {
        return of(this.rooms);
    }

    getRoomById(id: number): Observable<Room | undefined> {
        const room = this.rooms.find(r => r.id === id);
        return of(room);
    }
}
