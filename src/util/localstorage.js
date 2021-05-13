
const localstorage = {
    set(key, value, expired) {
        localStorage.setItem(key, JSON.stringify({
            data: value,
            expired: expired ? Date.now() + (1000 * 60 * expired) : null
        }));
    },
    fetch(key) {
        const value = JSON.parse(localStorage.getItem(key));
        if (value) {
            // 设置为 0 时，则不会过期
            if (value.expired != 0 && Date.now() >= value.expired) {
                this.remove(key);
            } else {
                return value.data
            }
        }
        return false
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}

export default localstorage
