# Angular Forms Technical Assignment (Fn7)

## Objective

This project was undertaken as a technical assignment to evaluate understanding of Angular (specifically Angular 15), styling with Tailwind CSS, and the implementation of dynamic forms, custom components, validation, and interactivity. The original goal included using the `jsonforms.io` library for dynamic form generation based on JSON schemas, but due to technical challenges detailed below, the implementation pivoted to using standard Angular Reactive Forms while still fulfilling other core requirements.

## Tech Stack

- **Angular CLI:** ~15.2.11
- **Angular:** ^15.2.0 (Core, Common, Compiler, Forms, Router, etc.)
- **TypeScript:** ~4.9.4
- **Tailwind CSS:** ^3.4.0
- **Angular Material:** ^15.2.9 (Core, CDK - used by JsonForms attempt, provides base theme)
- **Angular Reactive Forms:** Used for final form implementation.
- **Other Key Dependencies Installed During Troubleshooting:**
  - `@jsonforms/core`, `@jsonforms/angular`, `@jsonforms/angular-material` (~3.1.0 - Attempted, not used in final rendering)
  - `@angular/flex-layout`: 15.0.0-beta.42 (Peer dependency for JsonForms Material)
  - `dayjs`: ^1.11.13 (Peer dependency for JsonForms Material)
  - `core-js`: ^2.6.12 (Peer dependency for JsonForms Material)
  - `autoprefixer`: ^10.4.21 (For Tailwind CSS)
  - `postcss`: ^8.5.3 (For Tailwind CSS)

## Features Implemented

- **Switchable Form Layouts (Simulated):** Demonstrates two different form structures (Layout 1: First/Last Name, Email, Age; Layout 2: Booking Date, Subscribe, Country, Feedback) using standard Angular Reactive Forms (`FormGroup`) and `*ngIf` conditional rendering, controlled by "Load Layout" buttons.

- **Styling:** UI styled using Tailwind CSS utility classes.

- **Dark Mode:** Includes a functional toggle button to switch between light and dark themes, applied globally using Tailwind's `class` strategy.

- **Responsiveness:** Implements basic responsive design principles using Tailwind CSS (e.g., form container max-width, multi-column grid layout on medium+ screens for some sections).

- **Custom Component (Adapted Phase 3):** Includes a reusable custom Angular form control component (`app-styled-input`) implementing `ControlValueAccessor` used for text, email, and number inputs. Validation display is handled externally in the parent template.

- **Validation:** Uses Angular's built-in `Validators` (`required`, `minLength`, `email`, `min`, `max`) defined in the component's TypeScript code.

- **Real-time Validation Feedback:** Error messages are displayed below relevant fields dynamically based on control state (`invalid` and `touched`/`dirty`).

- **Interactive Elements (Phase 5):** Includes two interactive features:

  1.  In Layout 1, the 'Age' input is enabled/disabled and required based on the state of an "I confirm I am 18 or older" checkbox.

  2.  In Layout 2, a 'Specify Other Country' text input is enabled/disabled and required based on the 'Country' dropdown selection being 'Other'.

- **Clear Form Functionality:** Includes a "Clear" button for each form layout to reset its fields to their initial state.

## IMPORTANT: JsonForms Implementation Note & Deviation (Phase 2 & 3 Adaptation)

The original assignment specification required the use of the `jsonforms.io` library for dynamic form generation (Phase 2) and the creation of custom JsonForms renderers (Phase 3).

During development with the specified **Angular 15** environment, significant technical challenges were encountered when attempting to integrate the potentially compatible `@jsonforms/angular@~3.1.0` and `@jsonforms/angular-material@~3.1.0` libraries:

1.  **Dependency & Build Issues:** Initial attempts faced numerous dependency resolution (`ERESOLVE`) and build process errors (`NG6002`, TypeScript errors) requiring extensive troubleshooting involving different package managers (`npm --legacy-peer-deps`, `yarn`), cache clearing, `tsconfig.json` adjustments (`skipLibCheck`, `target`), and manual installation of identified peer dependencies (`@angular/flex-layout`, `dayjs`, `core-js`).

2.  **Peer Dependency Mismatch:** Critical warnings during dependency installation revealed that JsonForms version `~3.1.0` lists **peer dependencies expecting Angular/Material versions ^12.0.0 || ^13.0.0 || ^14.0.0**. This fundamentally mismatches the project's required Angular 15 environment. No official JsonForms v3 release specifically targeting Angular 15 could be identified (v3.2.0+ requires Angular 16+).

3.  **Runtime Error:** Despite eventually achieving successful compilation, the application consistently failed at **runtime** displaying a **"No applicable renderer found!"** error message when the `<jsonforms>` directive was used with the Material renderers. This occurred even when explicitly providing the `angularMaterialRenderers` array. This strongly indicates a runtime incompatibility between the JsonForms v3.1 library internals and the Angular/Material v15 APIs it relies on.

**Pivot Decision:**
Due to these persistent and apparently insurmountable runtime errors related to version incompatibility, and considering the project deadline, a pragmatic decision was made to **pivot away from using `jsonforms.io`** for dynamic rendering.

The project instead fulfills the core requirements using **standard Angular Reactive Forms**.

**Adaptations Made:**

- **Phase 2 (Multiple Layouts):** The requirement to showcase two different configurations/layouts is **simulated**. Two distinct `FormGroup` instances (`form1`, `form2`) are defined in the component, and two separate `<form>` sections are created in the HTML template. An `*ngIf` directive controlled by buttons switches between displaying these two manually defined forms. The `.json` schema/uischema files created initially are present in `/src/assets` but are **not used** for rendering.
- **Phase 3 (Custom Renderer):** This requirement was adapted by creating a reusable **custom Angular form control component** (`app-styled-input`) that implements `ControlValueAccessor`, instead of a JsonForms-specific renderer. The attempt to implement internal validation display within this component also faced runtime issues and was reverted to a simpler implementation with validation handled externally.

## Setup and Running the Application

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mastermaxx03/Fn7](https://github.com/mastermaxx03/Fn7)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Fn7
    ```
3.  **Install dependencies:**

    ```bash
    # Using Yarn
    # yarn install
    ```

4.  **Run the development server:**
    ```bash
    ng serve --open
    ```
    _The application will open automatically in your browser, usually at `http://localhost:4200/` (or the next available port if 4200 is busy)._

## Using the Application

- The application displays a form container with buttons to switch between "Layout 1" and "Layout 2".
- A dark mode toggle button allows switching themes.
- Form fields include validation, and error messages appear below invalid fields after interaction.
- Layout 1 demonstrates First/Last name fields and an Age field dependent on a checkbox.
- Layout 2 demonstrates Date, Checkbox, Select, and Textarea fields, with a conditional text input appearing if "Other" is selected for Country.
- A "Clear" button resets the currently visible form.
- The layout includes basic responsiveness for different screen sizes.

## Assumptions Made

- As no specific screen design was provided with the assignment text reviewed, a clean, functional layout using Tailwind CSS was implemented.
- Validation rules were based on standard practices and inferred requirements.
- The "at least one interactive element" requirement was met by implementing two.
