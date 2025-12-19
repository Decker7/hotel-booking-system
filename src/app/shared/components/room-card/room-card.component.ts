import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../../core/models/room.interface';

@Component({
    selector: 'app-room-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card h-100 shadow-sm" *ngIf="room">
      <img [src]="room.imageUrl" [alt]="room.name" class="card-img-top" style="height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">{{ room.name }}</h5>
          <span class="badge bg-primary">{{ room.type }}</span>
        </div>
        <p class="card-text text-muted mb-2">
          <i class="bi bi-tag-fill me-1"></i> \${{ room.price }} / night
        </p>
        <div class="mb-3">
          <span *ngFor="let amenity of room.amenities" class="badge bg-light text-dark me-1 border">{{ amenity }}</span>
        </div>
        <div class="mt-auto">
          <button class="btn btn-primary w-100" [disabled]="!room.isAvailable" (click)="book.emit(room)">
            {{ room.isAvailable ? 'Book Now' : 'Sold Out' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class RoomCardComponent {
    @Input() room: Room | undefined;
    @Output() book = new EventEmitter<Room>();
}
