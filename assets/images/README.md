# Cabbo artwork

## Configured assets

- `cabbo-app-icon.png`: 1024 x 1024 opaque PNG for the shared app icon, including iOS.
- `cabbo-logo.png`: 512 x 512 transparent PNG used on the white splash screen.
- `cabbo-adaptive-foreground.png`: 1024 x 1024 transparent Android foreground with padding for launcher masks; configured over a white background.
- `cabbo-favicon.png`: 32 x 32 transparent favicon.

## Experiment variants

- `cabbo-logo-transparent.png`: explicit copy of the transparent logo.
- `cabbo-app-icon-transparent.png`: 1024 x 1024 transparent icon for experiments; do not use as the iOS app icon.
- `cabbo-favicon-transparent.png`: explicit copy of the transparent favicon.
- `cabbo-adaptive-foreground-transparent.png`: explicit copy of the transparent, padded adaptive foreground.

Transparency preserves the blue Cabbo tile and the original artwork; it removes no part of the logo itself. The source logo, favicon and adaptive foreground already have transparent outer areas. These explicit variants make experimentation easier without changing configured assets. The 1024px PNG variants are resized from the supplied 512px logo, not new higher-detail artwork.

`favicon.svg` is a supplied alternative containing embedded raster artwork, not a resolution-independent vector master. `screenshots/` contains supplied reference images.

Brand tokens: primary `#0B5FFF`, pressed/hover `#084ED6`, secondary `#111827`, accent `#F59E0B`. Splash and adaptive background remain `#FFFFFF`.
