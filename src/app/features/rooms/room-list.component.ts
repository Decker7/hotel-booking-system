import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.interface';
import { Booking } from '../../core/models/booking.interface';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import { RoomCardComponent } from '../../shared/components/room-card/room-card.component';
import { BookingModalComponent } from '../../shared/components/booking-modal/booking-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RoomCardComponent, BookingModalComponent],
  template: `
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
        <div>
          <h2 class="fw-bold mb-1">Available Rooms</h2>
          <p class="text-muted mb-0">Discover our luxury assignments</p>
        </div>
        <div class="d-flex align-items-center bg-white p-2 rounded shadow-sm border">
            <label for="roomType" class="me-3 fw-bold text-muted small ps-2">FILTER BY</label>
            <select id="roomType" class="form-select border-0 bg-transparent fw-bold" style="width: 150px; cursor: pointer;" (change)="onFilterChange($event)">
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
      


      <app-booking-modal #bookingModal (bookingConfirmed)="onBookingConfirmed($event)"></app-booking-modal>
    </div>
  `
})
export class RoomListComponent {
  @ViewChild('bookingModal') bookingModal!: BookingModalComponent;
  private roomService = inject(RoomService);
  private router = inject(Router);

  private filterSubject = new BehaviorSubject<string>('All');
  filter$ = this.filterSubject.asObservable();

  private refreshSubject = new BehaviorSubject<void>(undefined);

  rooms$ = this.refreshSubject.pipe(
    switchMap(() => this.roomService.getRooms())
  );

  filteredRooms$: Observable<Room[]> = combineLatest([
    this.rooms$,
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
    this.bookingModal.open(room);
  }

  onBookingConfirmed(booking: Booking) {
    this.roomService.bookRoom(booking).subscribe({
      next: () => {
        alert(`Success! Room ${booking.roomName} booked for ${booking.guestName}.`);
        this.refreshSubject.next(); // Refresh list to show 'Sold Out'
      },
      error: (err) => {
        console.error('Booking failed details:', err);
        alert(`Failed to confirm booking: ${err.message || 'Server error'}. Check console for details.`);
      }
    });
  }


}
