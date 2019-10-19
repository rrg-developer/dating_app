'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Like extends Model {
    static boot () {
        super.boot();

        this.addTrait("@provider:Lucid/UpdateOrCreate");


        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {

        })
    }

}

module.exports = Like
