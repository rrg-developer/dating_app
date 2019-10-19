'use strict'

const User = use('App/Models/User');
const Like = use('App/Models/Like');
const Hash = use('Hash');

const Database = use('Database');

class AppController {

    async discover({session, request, response}) {
        const user_id = session.get("user_id");
        const decided_user_ids = await Database
            .table('users')
            .innerJoin('likes', function () {
                this
                    .on('users.id', 'likes.user_2')
            }).where('likes.user_1', user_id).pluck('users.id');


        const users = await Database.select('*').from('users').where('id', '!=', user_id).whereNotIn('id', decided_user_ids);

        return users;
    }


    async matches({session, request, response}) {
        console.log("asdadad");
        //const user_id = session.get("user_id");
        const user_id = 12;
        //users that i have liked
        const liked_users_ids = await Database
            .table('users')
            .innerJoin('likes', function () {
                this
                    .on('users.id', 'likes.user_2')
            }).where('likes.user_1', user_id).where('likes.like', '!=', 0).pluck('users.id');

        const matches = await Database
            .table('users')
            .innerJoin('likes', function () {
                this
                    .on('users.id', 'likes.user_1')
            }).whereIn('likes.user_1', liked_users_ids).where('likes.user_2', '=', user_id).where('likes.like', '!=', 0);

        console.log({liked_users_ids});
        console.log({matches});
        return matches;
    }


    async getLikedUsers({session, request, response}) {
        const user_id = session.get("user_id");

        const users = await Database
            .table('users')
            .innerJoin('likes', function () {
                this
                    .on('users.id', 'likes.user_1')
            }).where('likes.user_2', user_id);

        return users;

    }


    async like({session, request, response}) {
        const user_id = session.get("user_id");

        const data = {
            user_1:user_id,
            user_2: request.input('user_id'),
            like: request.input('like')
        };

        const like = await Like.updateOrCreate(
            {user_1:user_id, user_2: request.input('user_id')},
            data
        );

        return like;
    }

}

module.exports = AppController;
