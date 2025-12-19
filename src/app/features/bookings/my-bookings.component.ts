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
    <div class="container mt-5">
      <div class="mb-5 border-bottom pb-3">
        <h2 class="fw-bold mb-1">My Bookings</h2>
        <p class="text-muted mb-0">Manage your upcoming stays</p>
      </div>
      
      <div *ngIf="(bookings$ | async)?.length === 0; else bookingTable" class="text-center py-5">
        <div class="mb-3 text-muted">
           <i class="bi bi-calendar-x fs-1 opacity-25"></i>
        </div>
        <h4 class="fw-normal text-muted mb-3">No bookings yet</h4>
        <a href="/rooms" class="btn btn-primary px-4">Browse Rooms</a>
      </div>

      <ng-template #bookingTable>
        <div class="card border-0 shadow-sm overflow-hidden">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light text-muted text-uppercase small">
                <tr>
                  <th class="py-3 px-4 fw-bold border-0">Room</th>
                  <th class="py-3 px-4 fw-bold border-0">Guest</th>
                  <th class="py-3 px-4 fw-bold border-0">Dates</th>
                  <th class="py-3 px-4 fw-bold border-0 text-end">Total</th>
                  <th class="py-3 px-4 fw-bold border-0 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let booking of bookings$ | async">
                  <td class="py-3 px-4 border-bottom">
                    <span class="fw-bold text-dark">{{ booking.roomName }}</span>
                  </td>
                  <td class="py-3 px-4 border-bottom text-muted">{{ booking.guestName }}</td>
                  <td class="py-3 px-4 border-bottom">
                    <div class="d-flex flex-column small">
                      <span class="text-dark fw-medium"><i class="bi bi-box-arrow-in-right me-1 text-muted"></i> {{ booking.checkInDate | date:'mediumDate' }}</span>
                      <span class="text-muted"><i class="bi bi-box-arrow-right me-1 text-muted"></i> {{ booking.checkOutDate | date:'mediumDate' }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 border-bottom text-end">
                    <span class="fw-bold" style="color: var(--secondary-color);">$ {{ booking.totalPrice }}</span>
                  </td>
                   <td class="py-3 px-4 border-bottom text-center">
                    <span class="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill small fw-bold">Confirmed</span>
                   </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class MyBookingsComponent {
  private roomService = inject(RoomService);
  bookings$: Observable<Booking[]> = this.roomService.getBookings();
}
