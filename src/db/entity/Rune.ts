import { Entity, PrimaryColumn, Column } from 'typeorm';

interface IRuneConstructor {
  name: string;
  transliteration?: string;
  aett: string;
}

@Entity()
export class Rune {
  constructor(r: IRuneConstructor) {
    this.name = r.name;
    this.transliteration = r.transliteration;
    this.aett = r.aett;
  }

  @PrimaryColumn()
  public name: string;

  @Column({ nullable: true })
  public transliteration?: string;

  @Column({ nullable: false })
  public aett?: string;
}
