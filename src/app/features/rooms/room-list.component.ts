import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.interface';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomCardComponent } from '../../shared/components/room-card/room-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RoomCardComponent],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Rooms</h2>
        <div class="d-flex align-items-center">
            <label for="roomType" class="me-2 fw-bold">Filter by Type:</label>
            <select id="roomType" class="form-select w-auto" (change)="onFilterChange($event)">
                <option value="All">All Rooms</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
            </select>
        </div>
      </div>
      
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let room of filteredRooms$ | async">
          <app-room-card [room]="room" (book)="onBook($event)"></app-room-card>
        </div>
      </div>
      
      <div *ngIf="(filteredRooms$ | async)?.length === 0" class="alert alert-info mt-4">
        No rooms found for the selected filter.
      </div>
    </div>
  `
})
export class RoomListComponent {
  private roomService = inject(RoomService);
  private router = inject(Router);

  private filterSubject = new BehaviorSubject<string>('All');
  filter$ = this.filterSubject.asObservable();

  filteredRooms$: Observable<Room[]> = combineLatest([
    this.roomService.getRooms(),
    this.filter$
  ]).pipe(
    map(([rooms, filter]) => {
      if (filter === 'All') {
        return rooms;
      }
      return rooms.filter(room => room.type === filter);
    })
  );

  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterSubject.next(selectElement.value);
  }

  onBook(room: Room) {
    console.log('Book clicked for', room);
    // Navigate to detail or show modal
    // this.router.navigate(['/rooms', room.id]);
    alert(`Booking feature coming soon for ${room.name}!`);
  }
}
