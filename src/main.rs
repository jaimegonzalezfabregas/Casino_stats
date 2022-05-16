use rand::prelude::*;

const WIN_STAKES: f64 = 0.5;
const WIN_MULTIPLYER: f64 = 2.;
const INITIAL_BET: f64 = 1.;
const BET_MULTIPLYER: f64 = 2.;

fn main() {
    let mut rng = rand::thread_rng();
    let mut balance = 0.;
    let mut bet = INITIAL_BET;
    let mut historical_min_balance: f64 = 0.;

    for _ in 0..100000 {
        let luck: f64 = rng.gen();
        if luck < WIN_STAKES {
            balance += bet * WIN_MULTIPLYER;
            bet = INITIAL_BET;
        } else {
            balance -= bet;
            historical_min_balance = historical_min_balance.min(balance);
            bet *= BET_MULTIPLYER;
        }
    }
    println!("balance:{}", balance);
    println!("min_balance:{}", historical_min_balance);
}
