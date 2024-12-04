"use client"

import { useState } from "react"
import { Button } from "@/components/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"
import { Smartphone } from 'lucide-react'
import Image from "next/image"
import { TabsContent } from "@radix-ui/react-tabs"

interface ChestType {
  id: string
  name: string
  price: number
  image: string
  owned: number
}

export default function RewardsPage() {
  // @ts-ignore
  const [credits] = useState(0)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [chests, setChests] = useState<ChestType[]>([
    {
      id: "common",
      name: "Common Chest",
      price: 1000,
      image: "/img/chest.png",
      owned: 0,
    },
    {
      id: "basic",
      name: "Basic Chest",
      price: 3000,
      image: "/img/chest.png",
      owned: 0,
    },
    {
      id: "advanced",
      name: "Advanced Chest",
      price: 10000,
      image: "/img/chest.png",
      owned: 0,
    },
  ])

  const handleConnect = () => {
    setIsWalletConnected(true)
  }

  const handleQuantityChange = (chestId: string, increment: boolean) => {
    setChests(chests.map(chest => {
      if (chest.id === chestId) {
        return {
          ...chest,
          owned: increment ? chest.owned + 1 : Math.max(0, chest.owned - 1)
        }
      }
      return chest
    }))
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Rewards</h1>
            <div className="flex items-center gap-2 bg-[#1a1b1f] rounded-lg p-3 border border-solid border-[#3681c6] bg-custom-gradient">
              <Image src="/mobile.svg" alt="icon image" width={20} height={20} className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{credits}</div>
                <div className="text-sm text-gray-400">Your Credits</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">How do we calculate the credits?</span>
              <Button variant="outline" className="rounded-full border border-solid border-[#3681c6]">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Want to have more credits?</span>
              <Button className="bg-linear-button-gradient hover:bg-blue-700 rounded-3xl">
                Swap now
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Tabs defaultValue="chests" className="w-full">
          <TabsList className="bg-[#1a1b1f] p-1 rounded-lg mb-5">
            <TabsTrigger
              value="chests"
              className="data-[state=active]:bg-linear-button-gradient flex flex-col gap-5 rounded-xl"
            >
              Chests
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-linear-button-gradient flex flex-col gap-5 rounded-xl"
            >
              Stats
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-linear-button-gradient flex flex-col gap-5 rounded-xl"
            >
              Inventory
            </TabsTrigger>
          </TabsList>

        {/* Wallet Connection */}
        <TabsContent value="chests">
        {!isWalletConnected && (
          <div className="bg-[#0f0f0f] rounded-lg p-8 text-center mb-10 border border-solid border-[#ffffff1a]">
            <p className="text-lg mb-4">
              To access details about your chests, simply{" "}
              <span className="text-blue-500">connect</span> your wallet.
            </p>
            <Button
              onClick={handleConnect}
              className="bg-linear-button-gradient hover:bg-blue-700 rounded-3xl"
            >
              Connect Wallet
            </Button>
          </div>
        )}

        {/* Chests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chests.map((chest) => (
            <div
              key={chest.id}
              className="bg-[#0f0f0f] rounded-lg p-6 space-y-4 border border-solid border-[#ffffff1a]"
            >
              <div className="aspect-square relative">
                <Image
                  src={chest.image}
                  alt={chest.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-[#3681c6] font-bold">{chest.name}</h3>
                <div className="flex items-center gap-2">
                <span>{chest.price * (chest.owned || 1)} Credits</span>
                  <Smartphone className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#0a0b0f] rounded-lg p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(chest.id, false)}
                    className="h-8 w-8"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{chest.owned}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(chest.id, true)}
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
                <Button
                  className="flex-1 bg-[#0a0b0f] hover:bg-[#1e1f23]"
                >
                  Buy Chest
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Your Chests: {chest.owned}
                </div>
                <Button variant="ghost" className="text-gray-400">
                  Open Chest
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
      </div>
    </div>
  )
}

