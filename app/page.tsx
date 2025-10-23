"use client"

import { useState } from "react"
import { AuctionHeader } from "@/components/auction-header"
import { PlayerList } from "@/components/player-list"
import { CurrentBid } from "@/components/current-bid"
import { TeamPanel } from "@/components/team-panel"
import { AuctionEndScreen } from "@/components/auction-end-screen"
import type { Player, Team } from "@/types/auction"

const INITIAL_PLAYERS: Player[] = [
  // Diamond Players
  {
    id: 1,
    name: "Asmit",
    role: "All-rounder",
    category: "Diamond",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/cricket-player-portrait-asmit.jpg",
  },
  {
    id: 2,
    name: "Ujjwal",
    role: "Batter",
    category: "Diamond",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/cricket-batter-portrait-ujjwal.jpg",
  },
  {
    id: 3,
    name: "Vedant",
    role: "All-rounder",
    category: "Diamond",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/vedant.jpg",
  },
  {
    id: 4,
    name: "Faiz",
    role: "Batting All-rounder",
    category: "Diamond",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/faiz.jpg",
  },
  // Platinum Players
  {
    id: 5,
    name: "Karan",
    role: "Batter",
    category: "Platinum",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/karan.jpg",
  },
  {
    id: 6,
    name: "Aryan",
    role: "Bowler",
    category: "Platinum",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/aryan.jpg",
  },
  {
    id: 7,
    name: "Mishra",
    role: "Bowler",
    category: "Platinum",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/mishra.jpg",
  },
  {
    id: 8,
    name: "Ravi",
    role: "All-rounder",
    category: "Platinum",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/ravi.jpg",
  },
  // Gold Players
  {
    id: 9,
    name: "Nishant",
    role: "Batter",
    category: "Gold",
    basePrice: 1,
    currentBid: 1,
    status: "available",
    photo: "/nishant.jpg",
  },
  {
    id: 10,
    name: "Shrey",
    role: "All-rounder",
    category: "Gold",
    basePrice: 1,
    currentBid: 1,
    status: "available",
    photo: "/shrey.jpg",
  },
  {
    id: 11,
    name: "Aaditya",
    role: "Bowler",
    category: "Gold",
    basePrice: 1,
    currentBid: 1,
    status: "available",
    photo: "/aaditya.jpg",
  },
  // Silver Players
  {
    id: 12,
    name: "Shrey ka bhai",
    role: "Player",
    category: "Silver",
    basePrice: 0.5,
    currentBid: 0.5,
    status: "available",
    photo: "/cricket-player-portrait.jpg",
  },
  {
    id: 13,
    name: "Dhavale",
    role: "Player",
    category: "Silver",
    basePrice: 0.5,
    currentBid: 0.5,
    status: "available",
    photo: "/dhavale.png",
  },
  {
    id: 14,
    name: "Rajnish",
    role: "bowling all-rounder",
    category: "Silver",
    basePrice: 0.5,
    currentBid: 0.5,
    status: "available",
    photo: "/cricket-player-portrait-rajnish.jpg",
  },
]

export default function AuctionPage() {
  const [auctionStarted, setAuctionStarted] = useState(false)
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [lastBidder, setLastBidder] = useState<"A" | "B" | null>(null)
  const [needsRandomPick, setNeedsRandomPick] = useState(true)
  const [currentCategory, setCurrentCategory] = useState<string>("Diamond")

  const currentPlayer = players[currentPlayerIndex]
  const availablePlayers = players.filter((p) => p.status === "available")

  const handleStartAuction = () => {
    setAuctionStarted(true)
    setAuctionEnded(false)
    setNeedsRandomPick(true)
    setCurrentCategory("Diamond")
  }

  const handlePickRandom = () => {
    const categoryOrder = ["Diamond", "Platinum", "Gold", "Silver"]

    let availableInCategory = players.filter((p) => p.status === "available" && p.category === currentCategory)

    if (availableInCategory.length === 0) {
      const currentCategoryIndex = categoryOrder.indexOf(currentCategory)
      let nextCategoryIndex = currentCategoryIndex + 1

      while (nextCategoryIndex < categoryOrder.length) {
        const nextCategory = categoryOrder[nextCategoryIndex]
        availableInCategory = players.filter((p) => p.status === "available" && p.category === nextCategory)

        if (availableInCategory.length > 0) {
          setCurrentCategory(nextCategory)
          break
        }
        nextCategoryIndex++
      }

      if (availableInCategory.length === 0) {
        setAuctionStarted(false)
        setAuctionEnded(true)
        return
      }
    }

    const randomIndex = Math.floor(Math.random() * availableInCategory.length)
    const randomPlayer = availableInCategory[randomIndex]
    const playerIndex = players.findIndex((p) => p.id === randomPlayer.id)

    setCurrentPlayerIndex(playerIndex)
    setNeedsRandomPick(false)
    setLastBidder(null)
  }

  const handleBid = (team: "A" | "B") => {
    if (!currentPlayer || currentPlayer.status !== "available") return

    const bidIncrement = 0.25
    const newBid = currentPlayer.currentBid + bidIncrement
    const biddingTeam = team === "A" ? teamA : teamB

    if (newBid > biddingTeam.balance + (lastBidder === team ? currentPlayer.currentBid - currentPlayer.basePrice : 0)) {
      alert(`${biddingTeam.name} doesn't have enough balance!`)
      return
    }

    setPlayers((prev) => prev.map((p) => (p.id === currentPlayer.id ? { ...p, currentBid: newBid } : p)))
    setLastBidder(team)
  }

  const handleSold = () => {
    if (!currentPlayer || !lastBidder) {
      alert("No bids placed yet!")
      return
    }

    const soldPlayer = { ...currentPlayer, status: "sold" as const }

    if (lastBidder === "A") {
      setTeamA((prev) => ({
        ...prev,
        players: [...prev.players, soldPlayer],
        totalSpent: prev.totalSpent + soldPlayer.currentBid,
        balance: prev.balance - soldPlayer.currentBid,
      }))
    } else {
      setTeamB((prev) => ({
        ...prev,
        players: [...prev.players, soldPlayer],
        totalSpent: prev.totalSpent + soldPlayer.currentBid,
        balance: prev.balance - soldPlayer.currentBid,
      }))
    }

    setPlayers((prev) => prev.map((p) => (p.id === currentPlayer.id ? soldPlayer : p)))

    setNeedsRandomPick(true)
    setLastBidder(null)
  }

  const handleUnsold = () => {
    if (!currentPlayer) return

    setPlayers((prev) => prev.map((p) => (p.id === currentPlayer.id ? { ...p, status: "unsold" as const } : p)))

    setNeedsRandomPick(true)
    setLastBidder(null)
  }

  const handleEndAuction = () => {
    setAuctionStarted(false)
    setAuctionEnded(true)
  }

  const [teamA, setTeamA] = useState<Team>({
    name: "Kaustubh's Pirates",
    captain: "Kaustubh",
    players: [],
    totalSpent: 0,
    balance: 15,
  })

  const [teamB, setTeamB] = useState<Team>({
    name: "Mourya's Shadows",
    captain: "Mourya",
    players: [],
    totalSpent: 0,
    balance: 15,
  })

  if (auctionEnded) {
    return <AuctionEndScreen teamA={teamA} teamB={teamB} />
  }

  return (
    <div className="min-h-screen bg-background">
      <AuctionHeader
        auctionStarted={auctionStarted}
        currentPlayer={currentPlayer}
        teamA={teamA}
        teamB={teamB}
        onStartAuction={handleStartAuction}
        onEndAuction={handleEndAuction}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Player List */}
          <div className="lg:col-span-3">
            <PlayerList players={players} currentPlayer={currentPlayer} />
          </div>

          {/* Center Panel - Current Bid */}
          <div className="lg:col-span-6">
            <CurrentBid
              player={currentPlayer}
              auctionStarted={auctionStarted}
              lastBidder={lastBidder}
              needsRandomPick={needsRandomPick}
              currentCategory={currentCategory}
              onPickRandom={handlePickRandom}
              onBidA={() => handleBid("A")}
              onBidB={() => handleBid("B")}
              onSold={handleSold}
              onUnsold={handleUnsold}
            />
          </div>

          {/* Right Panel - Teams */}
          <div className="lg:col-span-3 space-y-6">
            <TeamPanel team={teamA} color="primary" />
            <TeamPanel team={teamB} color="accent" />
          </div>
        </div>
      </div>
    </div>
  )
}
