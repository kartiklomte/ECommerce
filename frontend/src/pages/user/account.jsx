import React from 'react'
import account from '@/assets/account.jpg'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import Address from '@/components/user/address'
import UserOrder from '@/components/user/order'

const UserAccount = () => {
  return (
    <div className='flex flex-col'>
       {/* top image */}
      <div className='relative h-[350px] w-full overflow-hidden'>
        <img src={account} className='h-full w-full object-cover object-center' />
      </div>

      {/*div for listing orders and address*/}
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue="orders">
            <TabsList>
              {/* options for the list  (header) */}
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <UserOrder/>
            </TabsContent>
            <TabsContent value='address'>
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default UserAccount