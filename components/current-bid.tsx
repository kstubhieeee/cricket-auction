"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/types/auction"
import { Gavel, TrendingUp, Shuffle } from "lucide-react"
import Image from "next/image"

interface CurrentBidProps {
  player: Player | undefined
  auctionStarted: boolean
  lastBidder: "A" | "B" | null
  needsRandomPick: boolean
  unsoldAuctionPhase: boolean
  onPickRandom: () => void
  onBidA: () => void
  onBidB: () => void
  onSold: () => void
  onUnsold: () => void
}

export function CurrentBid({
  player,
  auctionStarted,
  lastBidder,
  needsRandomPick,
  unsoldAuctionPhase,
  onPickRandom,
  onBidA,
  onBidB,
  onSold,
  onUnsold,
}: CurrentBidProps) {
  if (!auctionStarted) {
    return (
      <Card className="p-12">
        <div className="text-center space-y-4">
          <Gavel className="h-16 w-16 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-2xl font-bold text-muted-foreground">Auction Not Started</h3>
            <p className="text-muted-foreground mt-2">Click "Start Auction" to begin bidding</p>
          </div>
        </div>
      </Card>
    )
  }

  if (needsRandomPick) {
    return (
      <Card className="p-12">
        <div className="text-center space-y-6">
          <Shuffle className="h-16 w-16 mx-auto text-primary animate-pulse" />
          <div>
            <h3 className="text-3xl font-bold text-balance">
              {unsoldAuctionPhase ? "Unsold Players Auction" : "Pick Next Player"}
            </h3>
            {unsoldAuctionPhase && (
              <p className="text-muted-foreground mt-2 text-lg">
                Bidding on previously unsold players
              </p>
            )}
          </div>
          <Button onClick={onPickRandom} size="lg" className="h-16 text-xl font-bold px-12">
            <Shuffle className="mr-2 h-6 w-6" />
            Pick Random Player
          </Button>
        </div>
      </Card>
    )
  }

  if (!player) {
    return (
      <Card className="p-12">
        <div className="text-center space-y-4">
          <Gavel className="h-16 w-16 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-2xl font-bold text-muted-foreground">No Player Selected</h3>
            <p className="text-muted-foreground mt-2">Pick a random player to start bidding</p>
          </div>
        </div>
      </Card>
    )
  }

  const isTeamADisabled = lastBidder === "A"
  const isTeamBDisabled = lastBidder === "B"

  return (
    <div className="space-y-6">
      {/* Main Player Card */}
      <Card className="p-8 bg-gradient-to-br from-card to-muted/20">
        <div className="text-center space-y-6">
          {/* Player Profile Photo */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image src={player.photo || "/placeholder.svg"} alt={player.name} fill className="object-cover" />
            </div>
          </div>

          {/* Player Name */}
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-balance mb-2">{player.name}</h2>
            <p className="text-xl text-muted-foreground">{player.role}</p>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-background/50 rounded-lg p-4 border">
              <div className="text-sm text-muted-foreground mb-1">Base Price</div>
              <div className="text-2xl font-bold text-foreground">₹{player.basePrice.toFixed(2)} Cr</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="text-sm text-muted-foreground mb-1">Current Bid</div>
              <div className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5" />₹{player.currentBid.toFixed(2)} Cr
              </div>
            </div>
          </div>

          {/* Last Bidder */}
          {lastBidder && (
            <div className="text-sm text-muted-foreground">
              Last bid by: <span className="font-semibold text-foreground">Team {lastBidder}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Bidding Controls */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onBidA}
              size="lg"
              variant="outline"
              disabled={isTeamADisabled}
              className="h-16 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Team A Bid
              <span className="ml-2 text-sm opacity-70">(+₹0.25 Cr)</span>
            </Button>
            <Button
              onClick={onBidB}
              size="lg"
              variant="outline"
              disabled={isTeamBDisabled}
              className="h-16 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Team B Bid
              <span className="ml-2 text-sm opacity-70">(+₹0.25 Cr)</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={onSold} size="lg" className="h-14 text-lg font-semibold bg-primary hover:bg-primary/90">
              SOLD!
            </Button>
            <Button onClick={onUnsold} size="lg" variant="secondary" className="h-14 text-lg font-semibold">
              Unsold
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
