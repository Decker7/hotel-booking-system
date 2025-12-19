import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 border-end" style="background-color: var(--primary-color) !important;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i class="bi bi-building fs-4 me-2" style="color: var(--secondary-color);"></i>
        <span class="fs-4 fw-bold tracking-tight">LuxeStay</span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link text-white-50" aria-current="page">
            <i class="bi bi-speedometer2 me-2"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/rooms" routerLinkActive="active" class="nav-link text-white-50">
            <i class="bi bi-grid me-2"></i>
            Rooms
          </a>
        </li>
        <li>
          <a routerLink="/my-bookings" routerLinkActive="active" class="nav-link text-white-50">
            <i class="bi bi-calendar-check me-2"></i>
            My Bookings
          </a>
        </li>
      </ul>

    </div>
  `,
  styles: [`
    .nav-link {
        transition: all 0.2s;
        border-radius: 8px;
        margin-bottom: 4px;
    }
    .nav-link:hover {
        background-color: rgba(255,255,255,0.1);
        color: #fff !important;
    }
    .nav-link.active {
      background-color: var(--secondary-color) !important;
      color: #fff !important;
      box-shadow: 0 4px 12px rgba(193, 155, 118, 0.3);
    }
  `]
})
export class SidebarComponent { }
