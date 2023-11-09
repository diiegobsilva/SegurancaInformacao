import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
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

    @CreateDateColumn({ type: "timestamp" })
    dataAssociacao: Date;

    @UpdateDateColumn({ type: "timestamp" })
    dataAtualizacao: Date;

    @Column({ type: "json", nullable: true })
    termosAceitos: object; // Coluna para armazenar os termos aceitos em formato JSON

    @BeforeInsert()
    @BeforeUpdate()
    updateTimestamps() {
        this.dataAtualizacao = new Date();
        if (!this.dataAssociacao) {
            this.dataAssociacao = new Date();
        }
    }
}
