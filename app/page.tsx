"use client"

import { useState } from "react"
import { AuctionHeader } from "@/components/auction-header"
import { PlayerList } from "@/components/player-list"
import { CurrentBid } from "@/components/current-bid"
import { TeamPanel } from "@/components/team-panel"
import { AuctionEndScreen } from "@/components/auction-end-screen"
import type { Player, Team } from "@/types/auction"

const INITIAL_PLAYERS: Player[] = [
  {
    id: 2,
    name: "Kaustubh Bane",
    role: "Player",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/kaustubh.png",
  },
  {
    id: 3,
    name: "Aaditya Mourya",
    role: "Player",
    basePrice: 1,
    currentBid: 1,
    status: "available",
    photo: "/mourya.jpg",
  },
  {
    id: 4,
    name: "Sujal",
    role: "Player",
    basePrice: 1,
    currentBid: 1,
    status: "available",
    photo: "/sujal.jpg",
  },
  {
    id: 5,
    name: "Ujjwal",
    role: "Player",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/ujjwal.jpg",
  },
  {
    id: 6,
    name: "Nishant",
    role: "Player",
    basePrice: 1,
    currentBid: 1,
    status: "available",
    photo: "/nishant.jpg",
  },
  {
    id: 7,
    name: "Aaditya",
    role: "Player",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/aaditya.jpg",
  },
  {
    id: 8,
    name: "Lucky",
    role: "Player",
    basePrice: 0.5,
    currentBid: 0.5,
    status: "available",
    photo: "/lucky.jpg",
  },
  {
    id: 9,
    name: "Asmit",
    role: "Player",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/asmit.jpg",
  },
  {
    id: 10,
    name: "Dhavale",
    role: "Player",
    basePrice: 0.5,
    currentBid: 0.5,
    status: "available",
    photo: "/dhavale.png",
  },
  {
    id: 11,
    name: "Vedant",
    role: "Player",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/vedant.jpg",
  },
  {
    id: 12,
    name: "Mishra",
    role: "Player",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/mishra.jpg",
  },
  {
    id: 14,
    name: "Rajnish",
    role: "Player",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/rajnish.jpg",
  },
  {
    id: 15,
    name: "Kaustubh Rane",
    role: "Player",
    basePrice: 1.5,
    currentBid: 1.5,
    status: "available",
    photo: "/kaustubhr.jpeg",
  },
  {
    id: 16,
    name: "Naman",
    role: "Player",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/placeholder-user.jpg",
  },
  {
    id: 17,
    name: "Faiz",
    role: "Player",
    basePrice: 2,
    currentBid: 2,
    status: "available",
    photo: "/faiz.jpg",
  },
]

export default function AuctionPage() {
  const [auctionStarted, setAuctionStarted] = useState(false)
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [lastBidder, setLastBidder] = useState<"A" | "B" | null>(null)
  const [needsRandomPick, setNeedsRandomPick] = useState(true)
  const [unsoldAuctionPhase, setUnsoldAuctionPhase] = useState(false)

  const currentPlayer = players[currentPlayerIndex]
  const availablePlayers = players.filter((p) => p.status === "available")
  const unsoldPlayers = players.filter((p) => p.status === "unsold")

  const handleStartAuction = () => {
    setAuctionStarted(true)
    setAuctionEnded(false)
    setNeedsRandomPick(true)
    setUnsoldAuctionPhase(false)
  }

  const handlePickRandom = () => {
    const availablePlayers = players.filter((p) => p.status === "available")
    const unsoldPlayers = players.filter((p) => p.status === "unsold")

    if (availablePlayers.length === 0) {
      if (!unsoldAuctionPhase && unsoldPlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * unsoldPlayers.length)
        const randomPlayer = unsoldPlayers[randomIndex]
        const playerIndex = players.findIndex((p) => p.id === randomPlayer.id)

        setUnsoldAuctionPhase(true)
        setPlayers((prev) =>
          prev.map((p) => (p.status === "unsold" ? { ...p, status: "available" as const, currentBid: p.basePrice } : p))
        )
        setCurrentPlayerIndex(playerIndex)
        setNeedsRandomPick(false)
        setLastBidder(null)
        return
      } else {
        setAuctionStarted(false)
        setAuctionEnded(true)
        return
      }
    }

    const randomIndex = Math.floor(Math.random() * availablePlayers.length)
    const randomPlayer = availablePlayers[randomIndex]
    const playerIndex = players.findIndex((p) => p.id === randomPlayer.id)

    setCurrentPlayerIndex(playerIndex)
    setNeedsRandomPick(false)
    setLastBidder(null)
  }

  const handleBid = (team: "A" | "B") => {
    if (!currentPlayer || currentPlayer.status !== "available") return

    const bidIncrement = 0.25
    const biddingTeam = team === "A" ? teamA : teamB

    let newBid: number
    if (lastBidder === null) {
      newBid = currentPlayer.basePrice
    } else {
      newBid = currentPlayer.currentBid + bidIncrement
    }

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

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === currentPlayer.id
          ? { ...p, status: "unsold" as const, currentBid: p.basePrice }
          : p
      )
    )

    setNeedsRandomPick(true)
    setLastBidder(null)
  }

  const handleEndAuction = () => {
    setAuctionStarted(false)
    setAuctionEnded(true)
  }

  const [teamA, setTeamA] = useState<Team>({
    name: "IIT Dholakpur",
    captain: "Karan",
    players: [
      {
        id: 1,
        name: "Karan",
        role: "Captain",
        basePrice: 1.5,
        currentBid: 1.5,
        status: "sold",
        photo: "/karan.jpg",
      },
    ],
    totalSpent: 0,
    balance: 30,
  })

  const [teamB, setTeamB] = useState<Team>({
    name: "AIIMS Mira Road",
    captain: "Ravi",
    players: [
      {
        id: 13,
        name: "Ravi",
        role: "Captain",
        basePrice: 1.5,
        currentBid: 1.5,
        status: "sold",
        photo: "/ravi.jpg",
      },
    ],
    totalSpent: 0,
    balance: 30,
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
              unsoldAuctionPhase={unsoldAuctionPhase}
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
