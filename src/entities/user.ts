import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    unique: true
  })
  username!: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    unique: true
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 128,
    nullable: false
  })
  password!: string;

  @Column({
    type: "bool",
    nullable: false,
    default: false
  })
  admin!: boolean;
}