# Musical 3D Portfolio

A highly interactive, 3D musical portfolio website built with React, Three.js, and Vite.

## Features

- **Immersive 3D Scrolling**: Navigate through your experience and projects in a 3D environment.
- **Musical Journey**: Includes a built-in techno/sci-fi background loop with visualizer effects.
- **Neon City Aesthetics**: Cyberpunk-inspired visuals with bloom, noise, and vignette effects.
- **Interactive Elements**: Floating 3D objects representing your career milestones.
- **Responsive Design**: Works on desktop and mobile.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.
3. **Build for production**:
   ```bash
   npm run build
   ```

## Customization

- **Data**: Edit `src/data.ts` to update your personal information, experience, projects, and certifications.
- **Music**: The current track is streamed from a public URL. To use your own music, replace the `src` in `src/App.tsx` audio tag with your file path (e.g., `/music/my-track.mp3` and place file in `public/music/`).
- **Styles**: Modify `src/index.css` for global styles or `src/components/Scene.tsx` for 3D material colors.

## Tech Stack

- **Vite**
- **React**
- **Three.js (@react-three/fiber)**
- **Drei (@react-three/drei)**
- **Postprocessing (@react-three/postprocessing)**

## Credits

- Fonts: Orbitron & Inter (Google Fonts)
- Music: SoundHelix Song 1 (Creative Commons / Public Domain placeholder)
