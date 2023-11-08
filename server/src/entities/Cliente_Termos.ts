import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { Cliente } from "./Cliente";
import { Termos } from "./Termos";

@Entity({ name: "cliente_termos" })
export class ClienteTermos {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;

    @ManyToOne(() => Termos)
    @JoinColumn({ name: "termos_id" })
    termos: Termos;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataAssociacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataAtualizacao: Date;

    @Column({ type: "json", nullable: true })
    termosAceitos: object; // Coluna para armazenar os termos aceitos em formato JSON
}
