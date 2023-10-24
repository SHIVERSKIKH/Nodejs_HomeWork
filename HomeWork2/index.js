function SquareLeveling(a, b, c) {
    let discr = b * b - 4 * a * c;
    let solution = [];

    if (discr > 0) {
        let x1 = (- b + Math.sqrt(discr)) / (2 * a);
        let x2 = (- b - Math.sqrt(discr)) / (2 * a);
        solution.push(x1, x2);
    } else if (discr === 0) {
        let x = (- b - Math.sqrt(discr)) / (2 * a);
        solution.push(x);
    } else if (discr < 0) {
        console.log('Корней нет');
    }
    return solution;
}


modules.exports = { SquareLeveling };