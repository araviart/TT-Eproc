"use client"
import { PRODUCT_CATEGORIES } from '@/app/config'


import { useState } from 'react'
import NavItem from './NavItem'

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  return <div className="flex gap-4 h-full">
    {PRODUCT_CATEGORIES.map((category, index) => {
      const handleOpen = () => {
        if(activeIndex === index) {
          setActiveIndex(null)
        } else {
          setActiveIndex(index)
        }
      }
      const isOpen = index === activeIndex
      return <NavItem key={category.value} category={category} isOpen={isOpen} handleClick={handleOpen} />
    })
    
    }
  </div>
}

export default NavItems