import Image from "next/image"
import Link from "next/link"
import { forwardRef } from "react"

import { AppModalProps } from "@/types"

export const Modal = forwardRef<HTMLDialogElement, AppModalProps>(
    ({ selectedApp, lastSelectedApps, onSelect, onClose }, ref) => {
        return (
            <dialog
                className="modal"
                ref={ref}
                onClose={onClose}
                onCancel={onClose}
                data-testid="modal-selected"
            >
                {selectedApp && (
                    <div className="modal-box flex flex-col gap-6">
                        <div className="mx-auto">
                            <div className="flex gap-6">
                                <figure
                                    style={{
                                        backgroundColor: selectedApp.color
                                    }}
                                    className="rounded-full p-10"
                                >
                                    <Image
                                        src={selectedApp.icon}
                                        alt={selectedApp.name}
                                        width={64}
                                        height={64}
                                    />
                                </figure>

                                <div className="py-6">
                                    <h2 className="mb-4 text-lg">
                                        {selectedApp.name}
                                    </h2>
                                    {selectedApp.link && (
                                        <Link
                                            href={selectedApp.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary"
                                        >
                                            Acessar
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <h2 className="text-center">
                            Últimas ferramentas visualizadas
                        </h2>

                        <div className="grid grid-cols-3 gap-6">
                            {[...lastSelectedApps].reverse().map(app => (
                                <button
                                    key={app.app_id}
                                    onClick={() => onSelect(app)}
                                    className="card card-sm group cursor-pointer shadow-sm transition hover:shadow-lg"
                                    type="button"
                                >
                                    <figure
                                        style={{ backgroundColor: app.color }}
                                        className="p-6"
                                    >
                                        <Image
                                            src={app.icon}
                                            alt={app.name}
                                            width={64}
                                            height={64}
                                            className="transition group-hover:scale-110"
                                        />
                                    </figure>

                                    <div className="card-body min-h-17 justify-center text-center">
                                        <h4 className="text-base-100">
                                            {app.name}
                                        </h4>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <form
                    method="dialog"
                    className="modal-backdrop"
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            onClose()
                        }
                    }}
                >
                    <button
                        type="submit"
                        className="sr-only"
                        data-testid="modal-close"
                    >
                        Fechar
                    </button>
                </form>
            </dialog>
        )
    }
)

Modal.displayName = "Modal"
