import { ReactElement, useRef } from 'react'
import './infinite-scroll.css'

type InfiniteScrollProps = {
  onAtTopBounds: () => void;
  onAtBotBounds: () => void;
  children: ReactElement[];
  height: number;
}

export default function InfiniteScroll (props: InfiniteScrollProps) {
  const { onAtBotBounds, onAtTopBounds, children, height } = props;

  const scrollContainer = useRef(null)

  let isBeingProcessed = false
  function processing (func: CallableFunction) {
    isBeingProcessed = true
    func && func()
    isBeingProcessed = false
  }

  const handleScrollAndWheel = () => {
    if (!(scrollContainer?.current as any).scrollTop) return;
    if (isBeingProcessed) return

    const scrollTop = (scrollContainer.current as any).scrollTop
    const scrollBot = (scrollContainer.current as any).scrollTop + (scrollContainer.current as any).getBoundingClientRect().height
    
    if (scrollTop <= 10) 
      processing(onAtTopBounds)
    else if (scrollBot >= (scrollContainer.current as any).scrollHeight - 10)
      processing(onAtBotBounds)
  }

  return (
    <div style={{ height }} className='infinite-scroll' ref={scrollContainer}
      onScrollCapture={() => handleScrollAndWheel()}
      onWheelCapture={() => handleScrollAndWheel()}
    >
      {children}
    </div>
  )
}
