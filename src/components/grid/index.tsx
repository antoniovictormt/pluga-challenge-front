import { GridProps } from "@/types"

import { Card } from "../card"

export function Grid({ apps, onSelect }: GridProps) {
    return (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {apps.map(app => (
                <Card key={app.app_id} app={app} onSelect={onSelect} />
            ))}
        </div>
    )
}
