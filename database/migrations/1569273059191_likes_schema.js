'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikesSchema extends Schema {
    up () {
        this.create('likes', (table) => {
            table.increments();
            table.integer('user_1', 80).notNullable()
            table.integer('user_2', 254).notNullable()
            table.integer('like', 254).notNullable()
            table.timestamps();
        })
    }

  down () {
    this.drop('likes')
  }
}

module.exports = LikesSchema
