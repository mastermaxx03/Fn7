import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Fn7'; // You likely have this already

  // --- ADD THIS PROPERTY ---
  isDarkMode = false; // Track the current mode (start with light)

  // --- ADD THIS METHOD ---
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode; // Flip the state

    // Add or remove the 'dark' class from the main <html> element
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Optional: Save preference to localStorage later
    // localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  // Optional: Load preference on init later
  // ngOnInit(): void {
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme === 'dark') {
  //      this.isDarkMode = true;
  //      document.documentElement.classList.add('dark');
  //   } else {
  //      this.isDarkMode = false;
  //      document.documentElement.classList.remove('dark');
  //   }
  // }
}
