import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Booking } from '../../core/models/booking.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-my-bookings',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container mt-4">
      <h2 class="mb-4">My Bookings</h2>
      
      <div *ngIf="(bookings$ | async)?.length === 0; else bookingTable" class="alert alert-info">
        You haven't booked any rooms yet. <a href="/rooms">Browse Rooms</a>
      </div>

      <ng-template #bookingTable>
        <div class="table-responsive">
          <table class="table table-striped table-hover shadow-sm">
            <thead class="table-dark">
              <tr>
                <th>Room</th>
                <th>Guest Name</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let booking of bookings$ | async">
                <td>{{ booking.roomName }}</td>
                <td>{{ booking.guestName }}</td>
                <td>{{ booking.checkInDate | date:'mediumDate' }}</td>
                <td>{{ booking.checkOutDate | date:'mediumDate' }}</td>
                <td>\${{ booking.totalPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-template>
    </div>
  `
})
export class MyBookingsComponent {
    private roomService = inject(RoomService);
    bookings$: Observable<Booking[]> = this.roomService.getBookings();
}
