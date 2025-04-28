import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const FloristProducts = () => {
  return (
    <div className='space-y-5 mt-5'>
      <div className="flex justify-between items-center mb-2">
        <Button><Plus /> Add Product</Button>
      </div>
    </div>
  )
}

export default FloristProducts