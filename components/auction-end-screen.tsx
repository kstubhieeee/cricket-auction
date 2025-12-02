"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Team } from "@/types/auction"
import { Trophy, Users, Wallet, TrendingDown } from "lucide-react"
import Image from "next/image"

interface AuctionEndScreenProps {
  teamA: Team
  teamB: Team
}

export function AuctionEndScreen({ teamA, teamB }: AuctionEndScreenProps) {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">Auction Complete!</h1>
          <p className="text-xl text-muted-foreground">Teams are ready for the match</p>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
          {/* Team A */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-6">
              {/* Team Header */}
              <div className="text-center pb-4 border-b border-primary/20">
                <h2 className="text-3xl font-bold text-primary mb-2">{teamA.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">Captain: {teamA.captain}</p>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="outline" className="text-base px-4 py-1">
                    <Users className="h-4 w-4 mr-2" />
                    {teamA.players.length} Players
                  </Badge>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <TrendingDown className="h-4 w-4" />
                    Total Spent
                  </div>
                  <div className="text-2xl font-bold text-primary">₹{teamA.totalSpent.toFixed(2)} Cr</div>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Wallet className="h-4 w-4" />
                    Balance Left
                  </div>
                  <div className="text-2xl font-bold text-foreground">₹{teamA.balance.toFixed(2)} Cr</div>
                </div>
              </div>

              {/* Players List */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Squad
                </h3>
                {teamA.players.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No players</div>
                ) : (
                  <div className="space-y-2">
                    {teamA.players.map((player, index) => (
                      <div key={player.id} className="bg-background rounded-lg p-4 border">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                              <Image
                                src={player.photo || "/placeholder.svg"}
                                alt={player.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold truncate">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">₹{player.currentBid.toFixed(2)} Cr</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Team B */}
          <Card className="p-6 bg-accent/10 border-accent/20">
            <div className="space-y-6">
              {/* Team Header */}
              <div className="text-center pb-4 border-b border-accent/20">
                <h2 className="text-3xl font-bold text-accent mb-2">{teamB.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">Captain: {teamB.captain}</p>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="outline" className="text-base px-4 py-1">
                    <Users className="h-4 w-4 mr-2" />
                    {teamB.players.length} Players
                  </Badge>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <TrendingDown className="h-4 w-4" />
                    Total Spent
                  </div>
                  <div className="text-2xl font-bold text-accent">₹{teamB.totalSpent.toFixed(2)} Cr</div>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Wallet className="h-4 w-4" />
                    Balance Left
                  </div>
                  <div className="text-2xl font-bold text-foreground">₹{teamB.balance.toFixed(2)} Cr</div>
                </div>
              </div>

              {/* Players List */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Squad
                </h3>
                {teamB.players.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No players</div>
                ) : (
                  <div className="space-y-2">
                    {teamB.players.map((player, index) => (
                      <div key={player.id} className="bg-background rounded-lg p-4 border">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20 flex-shrink-0">
                              <Image
                                src={player.photo || "/placeholder.svg"}
                                alt={player.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold truncate">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-accent">₹{player.currentBid.toFixed(2)} Cr</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button onClick={handleReload} size="lg" className="text-lg px-8">
            Start New Auction
          </Button>
        </div>
      </div>
    </div>
  )
}
