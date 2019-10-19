'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments()
            table.integer('cc_id', 80);
            table.string('full_name', 80);
            table.string('phone', 10);
            table.string('website', 80);
            table.string('avatar', 250);
            table.string('custom_data', 250);
            table.string('email', 254).notNullable().unique();
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
