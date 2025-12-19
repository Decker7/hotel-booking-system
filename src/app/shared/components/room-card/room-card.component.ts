import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../../core/models/room.interface';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100 border-0 shadow-sm room-card" *ngIf="room">
      <div class="position-relative">
        <img [src]="room.imageUrl" [alt]="room.name" class="card-img-top" style="height: 240px; object-fit: cover;">
        <span class="badg position-absolute top-0 end-0 m-3 py-2 px-3 text-white fw-bold rounded-pill" 
              style="backdrop-filter: blur(4px); background-color: rgba(26, 37, 47, 0.8);">
          {{ room.type }}
        </span>
      </div>
      <div class="card-body d-flex flex-column p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title fw-bold mb-0 text-dark">{{ room.name }}</h5>
          <div class="text-end">
             <span class="fs-5 fw-bold" style="color: var(--secondary-color);">$ {{ room.price }}</span>
             <small class="text-muted">/ night</small>
          </div>
        </div>
        
        <div class="mb-4">
          <span *ngFor="let amenity of room.amenities" 
                class="badge me-2 mb-2 py-2 px-3 fw-normal"
                style="background-color: #f8f9fa; color: var(--text-color); border: 1px solid #e9ecef;">
            {{ amenity }}
          </span>
        </div>

        <div class="mt-auto">
          <button class="btn btn-primary w-100 py-2 shadow-sm" 
                  [disabled]="!room.isAvailable" 
                  (click)="book.emit(room)"
                  style="letter-spacing: 0.5px;">
            {{ room.isAvailable ? 'Book Now' : 'Sold Out' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .room-card {
      transition: all 0.3s ease;
      background: #fff;
      border-radius: var(--radius) !important;
      overflow: hidden;
    }
    .room-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md) !important;
    }
    .card-img-top {
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
  `]
})
export class RoomCardComponent {
  @Input() room: Room | undefined;
  @Output() book = new EventEmitter<Room>();
}
