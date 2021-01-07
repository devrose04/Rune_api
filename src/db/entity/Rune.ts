import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Rune extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @Column({ nullable: true })
  public transliteration?: string;

  @Column({ nullable: false })
  public aett?: string;
}
