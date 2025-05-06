"use client"

import type React from "react"
import {useEffect} from "react"
import {useAtomValue} from "jotai"
import {filiaisAtom} from "$/atoms"
import {Avatar, AvatarFallback, AvatarImage, HoverCard, HoverCardContent, HoverCardTrigger} from "ui"
import {fetchFiliais} from "$/api"

const getFilialColor = (filialName: string) => {
    if (filialName.startsWith("RODOPARANA")) return "dark:text-sky-400 text-sky-600 bg-muted"
    if (filialName.startsWith("TIMBER")) return "dark:text-amber-500 text-amber-600 bg-muted"
    return "bg-muted text-muted-foreground"
}

const getAvatarSrc = (filialName: string) => {
    if (filialName.startsWith("RODOPARANA")) return "/rodo1.svg"
    if (filialName.startsWith("TIMBER")) return "/timber.svg"
    return ""
}

interface FilialHoverCardProps {
    filialNumero: string
    username: string
    observation?: string
}

export const FilialHoverCard: React.FC<FilialHoverCardProps> = ({filialNumero, observation}) => {
    const filiais = useAtomValue(filiaisAtom)
    useEffect(() => {
        if (!filiais || filiais.length === 0) {
            fetchFiliais().catch((error) => {
                console.error("Erro ao buscar filiais:", error)
            })
        }
    }, [filiais])

    const filial = filiais?.find((f) => f.numero === filialNumero)
    const displayName = filial ? filial.filial : "Desconhecida"
    const colorClass = filial ? getFilialColor(filial.filial) : "bg-muted text-muted-foreground"
    const avatarSrc = filial ? getAvatarSrc(filial.filial) : ""

    return (
        <HoverCard openDelay={150} closeDelay={50}>
            <HoverCardTrigger asChild>
                <div className="flex items-center justify-start">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold cursor-pointer ${colorClass}`}
                        aria-label={filialNumero}
                    >
                        {filialNumero}
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent align="start" sideOffset={5} className="w-fit">
                <div className="flex flex-col justify-center items-start gap-2">
                    <div className="flex items-center justify-start gap-2 w-full">
                        <Avatar className="size-16 text-xl bg-muted text-foreground p-3">
                            {avatarSrc ? (
                                <AvatarImage src={avatarSrc} className="dark:invert"/>
                            ) : (
                                <AvatarFallback>{filialNumero}</AvatarFallback>
                            )}
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold capitalize">{displayName}</span>
                            {filial && (
                                <span className="text-muted-foreground text-sm">{filial.cnpjFilial}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-0 w-full pt-1 px-1">
                        {observation && (
                            <div className="text-sm w-full pt-1">
                                <strong>Obs:</strong> {observation}
                            </div>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}