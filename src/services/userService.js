import { storageService } from "./storageService";

const KEY = 'loggedin-user'

export const userService = {
    signUp,
    getUser,
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