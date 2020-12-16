'use strict';

const rune = require('../models/rune');

const freya = [
  { name: 'freya', transliteration: 'f', aett: 'freya' },
  { name: 'gebo', transliteration: 'g', aett: 'freya' },
  { name: 'kenaz', transliteration: 'k', aett: 'freya' },
  { name: 'ansuz', transliteration: 'a', aett: 'freya' },
  { name: 'raidho', transliteration: 'r', aett: 'freya' },
  { name: 'thurisaz', transliteration: 'th', aett: 'freya' },
  { name: 'uruz', transliteration: 'u', aett: 'freya' },
  { name: 'wunjo', transliteration: 'w', aett: 'freya' },
];
const heimdall = [
  { name: 'algiz', transliteration: 'z', aett: 'heimdall' },
  { name: 'eihwaz', transliteration: '', aett: 'heimdall' },
  { name: 'hagalaz', transliteration: 'h', aett: 'heimdall' },
  { name: 'isa', transliteration: 'i', aett: 'heimdall' },
  { name: 'jera', transliteration: 'j', aett: 'heimdall' },
  { name: 'naudhiz', transliteration: 'n', aett: 'heimdall' },
  { name: 'perthro', transliteration: 'p', aett: 'heimdall' },
  { name: 'sowilo', transliteration: 's', aett: 'heimdall' },
];

const tyr = [
  { name: 'berkano', transliteration: 'b', aett: 'tyr' },
  { name: 'dagaz', transliteration: 'd', aett: 'tyr' },
  { name: 'ehwaz', transliteration: 'e', aett: 'tyr' },
  { name: 'othala', transliteration: 'o', aett: 'tyr' },
  { name: 'laguz', transliteration: 'l', aett: 'tyr' },
  { name: 'mannaz', transliteration: 'm', aett: 'tyr' },
  { name: 'tiwaz', transliteration: 't', aett: 'tyr' },
  { name: 'ingwaz', transliteration: 'n', aett: 'tyr' },
];

const runes = [...freya, ...heimdall, ...tyr];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert(
      'Runes',
      runes.map((rune) => ({ ...rune, createdAt: now, updatedAt: now }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Runes', {
      name: { [Sequelize.Op.in]: runes.map((rune) => rune.name) },
    });
  },
};
