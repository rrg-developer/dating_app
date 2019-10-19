'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const fetch = require("node-fetch");

const User = use('App/Models/User');

class CcAuthCheck {


    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({session, request, response}, next) {
        const TOKEN = request.header('CB-Token')
        const data = await fetch("https://api.connectycube.com/session", {
            method: "get",
            headers: {
                "CB-Token": TOKEN,
                "Content-type": "application/json",
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            },
        });

        const messageData = await data.json();

        if ((data.status !== 200) && (data.status !== 201)) {
            response.status(data.status).send(messageData)

        }
        if (messageData.session) {
            const userData = messageData.session.user;

            const user = await User.updateOrCreate(
                {email: userData.email},
                {
                    cc_id: userData.id,
                    full_name: userData.full_name,
                    email: userData.email,
                    avatar: userData.avatar,
                    phone: userData.phone,
                }
            )

            session.put('user_id', user.id);


        }


        await next()


    }
}

module.exports = CcAuthCheck;
