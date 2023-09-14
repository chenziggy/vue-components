// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElAffix: typeof import('../packages/vz-components')['FlipClock']

  }
}