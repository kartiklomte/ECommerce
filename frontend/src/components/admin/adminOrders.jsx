import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetail from './adminOrderDetail'

const Orders = () => {

  const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>341241</TableCell>
              <TableCell>17/09/2023</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>500</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                  <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                  <AdminOrderDetail/>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </CardContent>

    </Card>
  )
}

export default Orders
