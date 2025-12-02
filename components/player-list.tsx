import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/types/auction"
import { CheckCircle2, XCircle, Circle } from "lucide-react"
import Image from "next/image"

interface PlayerListProps {
  players: Player[]
  currentPlayer: Player | undefined
}

export function PlayerList({ players, currentPlayer }: PlayerListProps) {
  const getStatusIcon = (status: Player["status"]) => {
    switch (status) {
      case "sold":
        return <CheckCircle2 className="h-4 w-4 text-primary" />
      case "unsold":
        return <XCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const PlayerCard = ({ player }: { player: Player }) => (
    <div
      className={`p-3 rounded-lg border transition-all ${
        currentPlayer?.id === player.id ? "bg-accent/20 border-accent shadow-md" : "bg-card hover:bg-muted/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
          <Image src={player.photo || "/placeholder.svg"} alt={player.name} fill className="object-cover" />
        </div>
        <div className="flex items-start justify-between gap-2 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{player.name}</div>
            <div className="text-xs text-muted-foreground">{player.role}</div>
            <div className="text-xs font-medium text-primary mt-1">₹{player.basePrice.toFixed(2)} Cr</div>
          </div>
          {getStatusIcon(player.status)}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-2">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </Card>
    </div>
  )
}
