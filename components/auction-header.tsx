"use client"

import { Button } from "@/components/ui/button"
import { Trophy, Play, Square } from "lucide-react"
import type { Player, Team } from "@/types/auction"

interface AuctionHeaderProps {
  auctionStarted: boolean
  currentPlayer: Player | undefined
  teamA: Team
  teamB: Team
  onStartAuction: () => void
  onEndAuction: () => void
}

export function AuctionHeader({
  auctionStarted,
  currentPlayer,
  teamA,
  teamB,
  onStartAuction,
  onEndAuction,
}: AuctionHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Title Section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Cricket Match Auction 2025</h1>
            </div>
            <p className="text-lg text-muted-foreground">Build your dream team — 8 players each!</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Team A Stats */}
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="text-sm font-medium text-muted-foreground mb-1">{teamA.name}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">₹{teamA.balance.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">Cr remaining</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Spent: ₹{teamA.totalSpent.toFixed(2)} Cr</div>
            </div>

            {/* Current Player */}
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <div className="text-sm font-medium text-muted-foreground mb-1">Current Player</div>
              <div className="text-xl font-bold text-accent text-balance">
                {auctionStarted && currentPlayer ? currentPlayer.name : "Not Started"}
              </div>
              {auctionStarted && currentPlayer && (
                <div className="text-xs text-muted-foreground mt-1">
                  {currentPlayer.role}
                </div>
              )}
            </div>

            {/* Team B Stats */}
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="text-sm font-medium text-muted-foreground mb-1">{teamB.name}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">₹{teamB.balance.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">Cr remaining</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Spent: ₹{teamB.totalSpent.toFixed(2)} Cr</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!auctionStarted ? (
              <Button onClick={onStartAuction} size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Start Auction
              </Button>
            ) : (
              <Button onClick={onEndAuction} size="lg" variant="destructive" className="gap-2">
                <Square className="h-5 w-5" />
                End Auction
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
