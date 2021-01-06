import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Rune {
  @PrimaryColumn()
  public name: string;

  @Column({ nullable: true })
  public transliteration?: string;

  @Column({ nullable: false })
  public aett?: string;
}
