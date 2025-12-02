export type PlayerStatus = "available" | "sold" | "unsold"

export interface Player {
  id: number
  name: string
  role: string
  basePrice: number
  currentBid: number
  status: PlayerStatus
  photo: string
}

export interface Team {
  name: string
  captain: string
  players: Player[]
  totalSpent: number
  balance: number
}
