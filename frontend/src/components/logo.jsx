import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router'

const Logo = ({className}) => {
  return (
    <Link to="/" className={cn(className)}>
      <img src="/typeflow.png" alt="Logo" width={145} height={41} className='min-w-[145px]'/>
    </Link>
  )
}

export default Logo
