import { memo, SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" {...props}>
    <path
      fill="#fff"
      d="M5.83 14a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 0 1 1.54 1.28L2.29 7l4.32 5.36A1 1 0 0 1 5.83 14Z"
    />
  </svg>
)
const Memo = memo(SvgComponent)

export default Memo
