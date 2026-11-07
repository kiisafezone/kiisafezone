# kiisafezone README Showcase

A cinematic portrait showcase rendered from the animated SVG composition in this repository.

## Video specification

- Source: `assets/macos-readme-showcase.svg`
- Canvas: 1080 × 1920 (9:16 portrait)
- Frame rate: 30 FPS
- Duration: 59 seconds
- Output: MP4 (H.264)

## Render in Google Colab

[Open the render notebook in Google Colab](https://colab.research.google.com/github/kiisafezone/kiisafezone/blob/main/showcase/render-on-colab.ipynb).

1. Connect to a hosted Google Colab runtime.
2. Run the cells from top to bottom.
3. The setup cell reuses dependencies already present and installs only missing components.
4. The notebook fetches the latest `main` branch, validates the SVG dimensions, renders the MP4, verifies the output, and downloads it.

The renderer is `svg-to-video`. It requires Chrome or Chromium, FFmpeg, and Rust/Cargo. On a fresh runtime, any missing dependencies and the renderer may need to be installed once; rerunning the setup cell in the same runtime reuses what is already installed.

The notebook does not create GitHub Actions workflows or modify repository source files. Colab runtime availability and limits depend on Google's current policies.

## Render settings

The notebook runs:

```bash
svg-to-video video assets/macos-readme-showcase.svg out/showcase.mp4 \
  --duration 59 \
  --fps 30 \
  --width 1080 \
  --height 1920 \
  --codec h264
```

The rendered file is saved as `out/showcase.mp4` in the Colab runtime.

## Source layout

The SVG contains the persistent macOS-style browser and GitHub/README chrome, with timed README sections and a closing EOF scene. The notebook renders the existing SVG directly; it does not rebuild the composition in Remotion.

## Notes

- Work from the repository's `main` branch.
- No GitHub Actions workflow or automated CI rendering is configured.
- The MP4 is generated in the temporary Colab runtime and downloaded to the device; it is not committed back to the repository.
