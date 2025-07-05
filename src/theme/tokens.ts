// Re-export the CommonJS tokens for TypeScript consumers
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens = require('./tokens.js')

export const colors: Record<string, any> = tokens.colors
export const radii: Record<string, any> = tokens.radii
export const spacing: Record<string, any> = tokens.spacing
export const shadow: Record<string, any> = tokens.shadow 