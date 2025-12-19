import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.interface';
import { Observable } from 'rxjs';
import { RoomCardComponent } from '../../shared/components/room-card/room-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-room-list',
    standalone: true,
    imports: [CommonModule, RoomCardComponent],
    template: `
    <div class="container mt-4">
      <h2 class="mb-4">Available Rooms</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let room of rooms$ | async">
          <app-room-card [room]="room" (book)="onBook($event)"></app-room-card>
        </div>
      </div>
    </div>
  `
})
export class RoomListComponent {
    private roomService = inject(RoomService);
    private router = inject(Router);
    rooms$: Observable<Room[]> = this.roomService.getRooms();

    onBook(room: Room) {
        console.log('Book clicked for', room);
        // Navigate to detail or show modal
        // this.router.navigate(['/rooms', room.id]);
        alert(`Booking feature coming soon for ${room.name}!`);
    }
}
