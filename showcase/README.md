# kiisafezone README Showcase

A cinematic Remotion composition built around the real visual assets in the repository's English profile README.

## Video specification

- Composition: `ReadmeShowcase`
- Resolution: 1920 × 1080 (16:9)
- Frame rate: 30 FPS
- Duration: 45 seconds
- Output: MP4 (H.264, Remotion default)

## Requirements

- Node.js 18.ism or newer (Node.js 20 LTS recommended)
- npm
- A supported desktop or cloud environment for Chromium-based rendering

Rendering requires a compatible Chromium environment and FFmpeg. An Android phone can be used to review/edit the source in GitHub, but it is not the recommended environment for rendering the final MP4.

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Open the Remotion Studio URL printed in the terminal and select **ReadmeShowcase**.

## Render MP4

```bash
npm run render
```

The video will be written to:

```
out/kiisafezone-showcase.mp4
```

Render a still frame for a quick check:

```bash
npm run still
```

## Scenes

1. Intro — profile identity
2. Header — README header and Table of Contents
3. About — terminal-style introduction
4. Approach — workflow graphic
5. Projects — existing project card artwork
6. Tech & Tools — animated technology SVG
7. Closing — repository footer and profile link

## Asset handling

The composition references the existing SVG artwork directly from the repository's `main` branch using GitHub's raw-content URLs. Keep an internet connection available during preview and rendering. Updating the README artwork on `main` will be reflected in future renders.

## Notes

- This is a standalone video project; it does not change either README.
- No GitHub Actions workflow or automated CI rendering is configured.
- Remotion packages are pinned to the same exact version to avoid package-version mismatches.
- Check the [Remotion license](https://www.remotion.dev/license) for your intended use before distributing the rendered video.
