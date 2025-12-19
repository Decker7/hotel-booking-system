import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    template: `
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100 border-end">
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link link-dark" aria-current="page">
            <i class="bi bi-speedometer2 me-2"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/rooms" routerLinkActive="active" class="nav-link link-dark">
            <i class="bi bi-grid me-2"></i>
            Rooms
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark disabled">
            <i class="bi bi-calendar-check me-2"></i>
            My Bookings
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark disabled">
            <i class="bi bi-gear me-2"></i>
            Settings
          </a>
        </li>
      </ul>
      <hr>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>User</strong>
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .nav-link.active {
      background-color: #0d6efd;
      color: white !important;
    }
  `]
})
export class SidebarComponent { }
