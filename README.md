# Katyayani & Siva Teja Wedding Website

A React and Vite wedding invitation website for Katyayani and Siva Teja.

The site includes an opening invitation screen, wedding countdown, event details, couple profiles, family blessings, gallery, venue map, directions, and calendar links.

## Tech Stack

- React
- Vite
- Lucide React
- Oxlint
- CSS with Google Fonts

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint against the project. |

## Project Structure

```text
src/
├── App.jsx
├── index.css
├── main.jsx
└── components/
    ├── Countdown.jsx
    ├── Details.jsx
    ├── Family.jsx
    ├── Gallery.jsx
    ├── Hero.jsx
    ├── MeetCouple.jsx
    ├── Navbar.jsx
    ├── VenueMap.jsx
    └── WelcomeScreen.jsx
```

## Main Sections

- `WelcomeScreen.jsx`: Opening invitation and entrance transition.
- `Hero.jsx`: Couple names, wedding date, and live countdown.
- `Details.jsx`: Pre-wedding, sangeet, and marriage events.
- `MeetCouple.jsx`: Couple profiles and introduction.
- `Gallery.jsx`: Wedding image gallery with lightbox view.
- `Family.jsx`: Family names and blessings.
- `VenueMap.jsx`: Venue map, schedule, directions, and contacts.
- `Navbar.jsx`: Responsive navigation between sections.

## Updating Wedding Details

Event information is defined in `src/components/Details.jsx`.

Venue information, map links, calendar links, and contact links are defined in `src/components/VenueMap.jsx`.

Couple and family information is defined in `src/components/MeetCouple.jsx` and `src/components/Family.jsx`.

The countdown target date is configured in `src/components/Hero.jsx`.

## Validation

Before publishing changes, run:

```bash
npm run lint
npm run build
```
