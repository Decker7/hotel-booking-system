import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 shadow-sm border">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Welcome to HotelBooking</h1>
          <p class="col-md-8 fs-4">Experience luxury and comfort at affordable prices. Book your dream vacation today with our easy-to-use booking system.</p>
          <button class="btn btn-primary btn-lg" type="button" routerLink="/rooms">View Rooms</button>
        </div>
      </div>
      
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-white bg-dark rounded-3">
            <h2>Luxury Suites</h2>
            <p>Check out our top-tier suites providing the best views and amenities.</p>
            <button class="btn btn-outline-light" type="button" routerLink="/rooms">Explore</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <h2>Family Plans</h2>
            <p>Traveling with family? We have spacious rooms to accommodate everyone.</p>
            <button class="btn btn-outline-secondary" type="button" routerLink="/rooms">See Details</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent { }
