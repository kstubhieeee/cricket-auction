import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Team } from "@/types/auction"
import { Users, TrendingDown, Wallet } from "lucide-react"
import Image from "next/image"

interface TeamPanelProps {
  team: Team
  color: "primary" | "accent"
}

export function TeamPanel({ team, color }: TeamPanelProps) {
  const colorClasses = {
    primary: {
      bg: "bg-primary/5",
      border: "border-primary/20",
      text: "text-primary",
      badge: "bg-primary text-primary-foreground",
    },
    accent: {
      bg: "bg-accent/10",
      border: "border-accent/20",
      text: "text-accent",
      badge: "bg-accent text-accent-foreground",
    },
  }

  const colors = colorClasses[color]

  return (
    <Card className={`p-4 ${colors.bg} border ${colors.border}`}>
      <div className="space-y-4">
        {/* Team Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-xl font-bold ${colors.text}`}>{team.name}</h3>
            <Badge className={colors.badge}>{team.players.length}/8</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{team.captain}</p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-background/50 rounded-lg p-3 border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Wallet className="h-3 w-3" />
              Balance
            </div>
            <div className={`text-lg font-bold ${colors.text}`}>₹{team.balance.toFixed(2)} Cr</div>
          </div>
          <div className="bg-background/50 rounded-lg p-3 border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <TrendingDown className="h-3 w-3" />
              Spent
            </div>
            <div className="text-lg font-bold text-foreground">₹{team.totalSpent.toFixed(2)} Cr</div>
          </div>
        </div>

        {/* Players List */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Squad</span>
          </div>

          {team.players.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">No players yet</div>
          ) : (
            <div className="space-y-2">
              {team.players.map((player) => (
                <div key={player.id} className="bg-background rounded-lg p-3 border">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                        <Image
                          src={player.photo || "/placeholder.svg"}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{player.name}</div>
                        <div className="text-xs text-muted-foreground">{player.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${colors.text}`}>₹{player.currentBid.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Cr</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
