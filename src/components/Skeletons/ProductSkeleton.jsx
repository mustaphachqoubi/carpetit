import React from 'react'
import Skeleton from './Skeleton'

const ProductSkeleton = () => {
  return (
    <div>
        <Skeleton type="image"/>
        <div className='grid grid-cols-2 gap-4'>
        <div>
        <Skeleton type="text"/>
        <Skeleton type="text"/>
        </div>
        <Skeleton type="price"/>
        </div>
    </div>
  )
}

export default ProductSkeleton