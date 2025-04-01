export const MODULENAME = "ptr1e-drag-ruler";

export const SPEED_TYPES = {
  overland: {
    default: 0x00FF00,
    name: 'Overland',
    icon: "walking",
  },
  sky: {
    default: 0x00FFFF,
    name: 'Flying',
    icon: "crow",
    auto: (tokenDocument)=> game.settings.get(MODULENAME, 'elevationSwitching') && tokenDocument.elevation > 0,
  },
  swim: {
    default: 0x0000FF,
    name: 'Swimming',
    icon: "swimmer",
  },
  levitate: {
    default: 0xFFFF00,
    name: 'Levitating',
    icon: "?",
    auto: (tokenDocument)=> game.settings.get(MODULENAME, 'elevationSwitching') && tokenDocument.elevation > 0,
  },
  burrow: {
    default: 0xFFAA00,
    name: 'Burrowing',
    icon: "mountain",
    auto: (tokenDocument)=> game.settings.get(MODULENAME, 'elevationSwitching') && tokenDocument.elevation < 0,
  },
  teleport: {
    default: 0xAA00AA,
    name: 'Teleporting',
    icon: "transporter-1",
  },
};

export const DEFAULT_SPEED_TYPE = "overland";