import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { useContractWrite, useAccount, useNetwork } from "wagmi";
import AutoPayABI from "../constants/ABI/AutoPay.json";
  
const SubscriptionCard = (data : any) => {
  const { write : CancelSubscriptioin } =
  useContractWrite({
    abi: AutoPayABI,
    address: "0x7aBA2D1A0A16567bfF0667B95b1111A2EB7E503d",
    functionName: "cancelSubscription",
    onSuccess: (data) => {
      console.log(data);

      alert(`Successfully created Hash: ${data.hash}`);
    },
  });
  console.log(data)
  return (
    <div>
      {data.cardData?.isActive ? 
          <Card className={'m-2 p-2'}>
      <CardContent className="p-2 flex justify-between">
        <div className='text-xl font-bold'>
          {data.cardData.name}
        </div>
        <p>{data.cardData.description}</p>
        <p><span className='font-bold'>Token Address: </span>{data.cardData.tokenAddress}</p>
        <div>
          <Button variant={'destructive'} onClick={()=> CancelSubscriptioin({
            args : [data.cardData.customer, data.cardData.payee]
          })}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
     :  <h3>No Active Subscription</h3>
  }
    </div>
  )
}

export default SubscriptionCard