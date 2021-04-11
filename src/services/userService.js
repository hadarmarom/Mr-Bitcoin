import { storageService } from "./storageService";

const KEY = 'loggedin-user'

export const userService = {
    signUp,
    getUser,
}

const gUser = {
    name: "Hyde balaganim",
    coins: 100,
    moves: [
        {
            toId: "d99e3u2ih329",
            to: "Moshiko",
            at: 2652712571,
            amount: 2
        }
    ]
}

function signUp(name) {
    const user = name ? getEmptyUser(name) : null;
    storageService.store(KEY, user);
    return user;
}

function getUser() {
    return storageService.load(KEY)
}

function getEmptyUser(name) {
    return {
        name,
        coins: 100,
        moves: []
    }
}