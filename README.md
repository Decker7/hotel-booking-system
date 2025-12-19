# Hotel Booking System

A professional-grade Hotel Booking System built with **Angular 17+**, **Standalone Components**, and **Bootstrap 5**. This application features a luxury hotel theme, responsive design, and local data persistence.

## 🚀 How to Run the Application

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (v18.13.0 or higher recommended).
- **npm**: Comes with Node.js.

### Steps
1.  **Clone the Repository** (if not already done):
    ```bash
    git clone https://github.com/Decker7/hotel-booking-system.git
    cd hotel-booking-system
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Development Server**:
    ```bash
    npm start
    ```
    *Alternatively, you can run `ng serve`.*

4.  **Access the Application**:
    Open your browser and navigate to:
    [http://localhost:4200](http://localhost:4200)

---

## 🎨 Design Decisions

### 1. Architecture: Angular Standalone Components
*   **Decision**: We utilized Angular's modern **Standalone Component** architecture, bypassing the need for traditional `NgModules`.
*   **Benefit**: This reduces boilerplate code, makes the application lighter, and simplifies lazy loading of routes. It represents the current best practice for Angular development.

### 2. State Management: RxJS Services
*   **Decision**: We used **RxJS `BehaviorSubject`** within singleton Services (`RoomService`, `AuthService`) to manage application state.
*   **Benefit**: For an application of this scale, `BehaviorSubjects` provide a perfect balance of reactivity and simplicity without the overhead of a full library like NgRx or Elf. It allows different components (Room List, My Bookings) to react instantly to data changes (like a new booking).

### 3. Styling: Bootstrap 5 + Custom "Luxury" Theme
*   **Decision**: We used **Bootstrap 5** for the core grid system and layout utilities (`d-flex`, `row`, `col`) but applied a **Custom CSS Theme** on top.
*   **Benefit**: Bootstrap ensures rapid responsive development and grid reliability. The custom CSS (Navy Blue/Gold palette, soft shadows, rounded corners) overrides Bootstrap's defaults to prevent the "generic bootstrap site" look, delivering a premium user experience.

### 4. Persistence: LocalStorage Mock
*   **Decision**: Data (bookings) is persisted to the browser's `localStorage`.
*   **Benefit**: This mimics a real backend database experience. Users can refresh the page or close the browser, and their bookings will remain saved, meeting the assessment's functional requirements without needing a complex backend setup.

### 5. Responsive Navigation
*   **Decision**: An adaptive navigation strategy was implemented:
    *   **Desktop**: Permanent Sidebar for dashboard-style quick access.
    *   **Mobile/Tablet**: Top Navbar (`HeaderComponent`) to save screen space.
*   **Benefit**: This ensures an optimal user experience across all device sizes, strictly following mobile-first design principles.

---

## 🛠 Framework & Library Choices

**We strictly followed the suggested technology stack:**

*   **Framework**: **Angular 17+** (Used as requested).
*   **Styling**: **Bootstrap 5** (Used as requested).
*   **Language**: **TypeScript** (Strict mode enabled).

**Deviations/Notes:**
*   **Mock Backend**: We did not use a real backend server (Node/Express/Python) as it was not required for this frontend-focused assessment. Instead, we built a robust `MockService` that simulates API delays and responses to demonstrate handling asynchronous data streams (`Observable`).
