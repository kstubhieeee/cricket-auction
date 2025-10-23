export type PlayerCategory = "Diamond" | "Platinum" | "Gold" | "Silver"
export type PlayerStatus = "available" | "sold" | "unsold"

export interface Player {
  id: number
  name: string
  role: string
  category: PlayerCategory
  basePrice: number
  currentBid: number
  status: PlayerStatus
  photo: string // Added photo field for player profile pictures
}

export interface Team {
  name: string
  captain: string
  players: Player[]
  totalSpent: number
  balance: number
}
