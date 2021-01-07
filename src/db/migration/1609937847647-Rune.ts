import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rune1609937847647 implements MigrationInterface {
  private runes = [
    { name: 'freya', transliteration: 'f', aett: 'freya' },
    { name: 'gebo', transliteration: 'g', aett: 'freya' },
    { name: 'kenaz', transliteration: 'k', aett: 'freya' },
    { name: 'ansuz', transliteration: 'a', aett: 'freya' },
    { name: 'raidho', transliteration: 'r', aett: 'freya' },
    { name: 'thurisaz', transliteration: 'th', aett: 'freya' },
    { name: 'uruz', transliteration: 'u', aett: 'freya' },
    { name: 'wunjo', transliteration: 'w', aett: 'freya' },

    { name: 'algiz', transliteration: 'z', aett: 'heimdall' },
    { name: 'eihwaz', transliteration: '', aett: 'heimdall' },
    { name: 'hagalaz', transliteration: 'h', aett: 'heimdall' },
    { name: 'isa', transliteration: 'i', aett: 'heimdall' },
    { name: 'jera', transliteration: 'j', aett: 'heimdall' },
    { name: 'naudhiz', transliteration: 'n', aett: 'heimdall' },
    { name: 'perthro', transliteration: 'p', aett: 'heimdall' },
    { name: 'sowilo', transliteration: 's', aett: 'heimdall' },

    { name: 'berkano', transliteration: 'b', aett: 'tyr' },
    { name: 'dagaz', transliteration: 'd', aett: 'tyr' },
    { name: 'ehwaz', transliteration: 'e', aett: 'tyr' },
    { name: 'othala', transliteration: 'o', aett: 'tyr' },
    { name: 'laguz', transliteration: 'l', aett: 'tyr' },
    { name: 'mannaz', transliteration: 'm', aett: 'tyr' },
    { name: 'tiwaz', transliteration: 't', aett: 'tyr' },
    { name: 'ingwaz', transliteration: 'n', aett: 'tyr' },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE aett AS ENUM ('freya', 'heimdall', 'tyr');`
    );
    await queryRunner.query(
      `CREATE TABLE "rune" (
            "name" character varying NOT NULL,
            "transliteration" character varying,
            "aett" aett NOT NULL,
            PRIMARY KEY ("name")
        )`
    );

    await queryRunner.query(
      `INSERT INTO "rune" (name, transliteration, aett) values ${this.runes
        .map(
          (rune) =>
            `('${rune.name}', '${rune.transliteration}', '${rune.aett}')`
        )
        .join(',')};`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rune"`);
    await queryRunner.query(`DROP TYPE aett`);
  }
}
