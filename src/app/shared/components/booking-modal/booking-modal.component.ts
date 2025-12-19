import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Room } from '../../../core/models/room.interface';
import { Booking } from '../../../core/models/booking.interface';

@Component({
    selector: 'app-booking-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="modal fade" [class.show]="isOpen" [style.display]="isOpen ? 'block' : 'none'" tabindex="-1" role="dialog" aria-labelledby="bookingModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bookingModalLabel">Book Room: {{ room?.name }}</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="guestName" class="form-label">Guest Name</label>
                <input type="text" class="form-control" id="guestName" formControlName="guestName" 
                       [class.is-invalid]="f['guestName'].touched && f['guestName'].invalid">
                <div class="invalid-feedback">Guest name is required.</div>
              </div>
              
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="checkIn" class="form-label">Check-in Date</label>
                  <input type="date" class="form-control" id="checkIn" formControlName="checkIn"
                         [class.is-invalid]="f['checkIn'].touched && f['checkIn'].invalid">
                   <div class="invalid-feedback">Check-in date is required.</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="checkOut" class="form-label">Check-out Date</label>
                  <input type="date" class="form-control" id="checkOut" formControlName="checkOut"
                         [class.is-invalid]="f['checkOut'].touched && f['checkOut'].invalid || bookingForm.errors?.['dateRange']">
                   <div class="invalid-feedback" *ngIf="f['checkOut'].errors?.['required']">Check-out date is required.</div>
                   <div class="invalid-feedback" *ngIf="bookingForm.errors?.['dateRange']">Check-out must be after check-in.</div>
                </div>
              </div>

              <div class="alert alert-info" *ngIf="room">
                <strong>Price per night:</strong> \${{ room.price }}<br>
                <strong>Total Price:</strong> \${{ calculateTotal() }}
              </div>

              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" (click)="close()">Cancel</button>
                <button type="submit" class="btn btn-primary" [disabled]="bookingForm.invalid">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="isOpen"></div>
  `
})
export class BookingModalComponent {
    @Input() room: Room | undefined;
    @Output() bookingConfirmed = new EventEmitter<Booking>();

    isOpen = false;
    bookingForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.bookingForm = this.fb.group({
            guestName: ['', Validators.required],
            checkIn: ['', Validators.required],
            checkOut: ['', Validators.required]
        }, { validators: this.dateRangeValidator });
    }

    get f() { return this.bookingForm.controls; }

    open(room: Room) {
        this.room = room;
        this.bookingForm.reset();
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    onSubmit() {
        if (this.bookingForm.valid && this.room) {
            const formVal = this.bookingForm.value;
            const booking: Booking = {
                roomId: this.room.id,
                roomName: this.room.name || this.room.roomName,
                guestName: formVal.guestName,
                checkInDate: formVal.checkIn,
                checkOutDate: formVal.checkOut,
                totalPrice: this.calculateTotal()
            };
            this.bookingConfirmed.emit(booking);
            this.close();
        }
    }

    calculateTotal(): number {
        if (!this.bookingForm.value.checkIn || !this.bookingForm.value.checkOut || !this.room) return 0;

        const start = new Date(this.bookingForm.value.checkIn);
        const end = new Date(this.bookingForm.value.checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays * this.room.price : this.room.price;
    }

    private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
        const checkIn = group.get('checkIn')?.value;
        const checkOut = group.get('checkOut')?.value;

        if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
            return { dateRange: true };
        }
        return null;
    }
}
