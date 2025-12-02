import Image from "next/image"

import { CardProps } from "@/types"

export function Card({ app, onSelect }: CardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(app)}
            className="card card-sm group cursor-pointer overflow-hidden rounded-md border border-gray-700/30 text-left shadow-sm hover:shadow-lg"
            data-testid={`card-${app.app_id}`}
        >
            <figure
                style={{ backgroundColor: app.color }}
                className="rounded-t-md p-6"
            >
                <Image
                    src={app.icon}
                    alt={app.name}
                    width={64}
                    height={64}
                    className="transition group-hover:scale-110"
                />
            </figure>

            <div className="card-body min-h-[68px] justify-center text-center">
                <h4 className="text-sm">{app.name}</h4>
            </div>
        </button>
    )
}
