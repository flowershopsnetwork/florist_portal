import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const UserList = () => {
    return (
        <div className="p-5">
            <div className='flex items-center justify-between mb-4'>
                <h1 className="text-2xl font-bold tracking-tight mb-4">Users Management</h1>
                <Button> 
                    <Plus /> 
                    Add New User
                </Button>
            </div>
            {/* <DataTable columns={UserColumns} data={users} showCheckbox={true} filterableColumns={UserFilters} /> */}
        </div>
    )
}

export default UserList