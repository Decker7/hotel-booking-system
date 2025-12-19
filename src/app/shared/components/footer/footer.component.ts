import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <div class="container">
        <p class="mb-0">&copy; 2024 Hotel Booking System. All rights reserved.</p>
      </div>
    </footer>
  `,
    styles: [`
    :host {
      display: block;
      margin-top: auto;
    }
  `]
})
export class FooterComponent { }
