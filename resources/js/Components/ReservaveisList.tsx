import { PageProps } from "@/types";
import { ReactNode } from "react";

export default function ReservaveisList({ controllerData }: PageProps<{ controllerData: string }>) {
    const reservaveis: any[] = JSON.parse(controllerData);
    const reservaveisElementList: ReactNode[] = [];
    reservaveis.forEach((reservavel) => {
        reservaveisElementList.push(
            <li>
                <p>{reservavel.nome} - {reservavel.isReservado ? "Reservado" : "Disponivel"}</p>
            </li>
        )
    });
    return (
        <div>
            {reservaveisElementList}
        </div>
    )
}
