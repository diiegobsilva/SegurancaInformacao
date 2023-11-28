import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({ name: "termos" })
export class Termos {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: "json", nullable: false })
    itemTermos: object; 

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data: Date;

    @BeforeInsert()
    setCreationDate() {
        this.data = new Date();
    }

    @BeforeUpdate()
    setUpdateDate() {
        this.data = new Date();
    }
}
