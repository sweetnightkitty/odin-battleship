export const ship = (length) => {
    let hits = 0;

    return {
        length,
        hits () {
            ++hits;
        },
        getHits() {
            return hits;
        }
    }
}