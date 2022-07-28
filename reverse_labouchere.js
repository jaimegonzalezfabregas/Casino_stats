//https://nononsenseforex.com/uncategorized/reverse-labouchere/

function sum(arr) {
    if (arr.length == 0) return 0;
    return sum(arr.slice(1)) + arr[0]
}

function get_bet(line) {
    if (line.length == 0) return 0;
    if (line.length == 1) return line[0]
    return line[0] + line[line.length - 1];
}

function win_bet(line) {
    return line.slice(1, -1)
}

function lose_bet(line) {
    line.push(get_bet(line))
    return line
}


function test_init_line(init_line) {

    let ret = 0;
    let wins = 0;
    let loses = 0;
    let tryes = 30000
    let init_money = 10;
    for (let i = 0; i < tryes; i++) {
        let line = init_line.slice(0);
        let money = init_money
        let rep = true;
        // console.log(money, line, init_line)
        if (get_bet(line) > money) {
            rep = false
        }
        while (rep) {
            //console.log(get_bet(line), money)
            if (get_bet(line) > money || money <= 0) {
                rep = false
                //console.log("not enought money");
            } else {
                if (Math.random() > .5) {
                    //console.log("lose")
                    money -= get_bet(line)
                    line = lose_bet(line);
                } else {
                    //console.log("win")
                    money += get_bet(line);
                    line = win_bet(line);
                    if (line.length == 0) {
                        rep = false
                    }
                }
                //console.log(money, line)
            }


        }
        ret += money - init_money
        //console.log(money, init_money)
        if (money >= init_money) {
            wins++;
        } else {
            loses++
        }
    }
    console.log(wins, loses)
    return ret / tryes
}

console.log(test_init_line([1, 1, 1, 0, 0, 0, 0, 1, 1]))

// function mutate(arr) {
//     let ret = arr;
//     // console.log("0")
//     for (let i = 0; i < Math.random() * 3; i++) {
//         let p = Math.floor(Math.random() * arr.length);
//         arr.push(arr[p]);

//     }
//     // console.log("a")
//     for (let i = 0; i < Math.random() * 3; i++) {
//         let p = Math.floor(Math.random() * arr.length);
//         arr[p] = Math.min(Math.max(1, arr[p] + Math.floor(Math.random() * 6) - 3), 2000);
//     }
//     // console.log("b")

//     return ret;
// }

// function shortByRank(arr) {
//     return arr.sort((a, b) => b.rank - a.rank)
// }

// let ranking = [{ "line": [5, 5, 5, 5, 5], "rank": undefined }];

// const generations = 5;
// const offspring = 3;
// const survivors = 10;
// for (let i = 0; i < generations; i++) {

//     console.log("generation", i)
//     let start_len = ranking.length
//     for (let j = 0; j < start_len; j++) {
//         const father_line = ranking[j].line;
//         for (let o = 0; o < offspring; o++) {
//             ranking.push({
//                 "line": mutate(father_line),
//                 "rank": undefined,
//             })
//         }

//     }
//     console.log("ranking")

//     for (let i = 0; i < ranking.length; i++) {
//         if (ranking[i].rank == undefined)
//             ranking[i].rank = test_init_line(ranking[i].line);
//     }
//     console.log("shorting")

//     shortByRank(ranking);
//     if (ranking.length > survivors) {
//         ranking = ranking.slice(0, survivors)
//     }
//     console.log(ranking.map(e => e.line))
// }


// console.log(ranking.map(e => e.line));
