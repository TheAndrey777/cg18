import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { JSONValue } from "../types/json.type";
import { User } from "./user";

@Entity("offices")
export class Office extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    unique: false
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  address!: string;

  @ManyToMany(() => User)
  @JoinTable({ name: "users_offices" })
  workers: User[];

  @Column({
    type: "json",
    nullable: false,
    default: {}
  })
  floorplan: JSONValue;
}