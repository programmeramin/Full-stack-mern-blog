import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({children, className, elem = "div", wrapperClass = "", ...props}) => {
    const Elem = elem || "div"
  return (
    <Elem 
      className={cn(
        'container-custom w-full mx-auto', 
        className
      )} 
      {...props}
    >
      {children}
    </Elem>
  )
}

export default Container
