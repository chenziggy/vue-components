import { componentSizeMap } from '@vz-components/constants'

import type { ComponentSize } from '@vz-components/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
