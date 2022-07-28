use rand::prelude::*;

const WIN_STAKES: f64 = 0.5;
const WIN_MULTIPLYER: f64 = 2.;
const INITIAL_BET: f64 = 1.;
const BET_MULTIPLYER: f64 = 5.;
const LOSS_STOP: i32 = 3;
const INITIAL_BALANCE: f64 = 1000.;
fn main() {
    let mut pos_tally = 0;
    let mut neg_tally = 0;

    for _ in 0..10000 {
        let mut rng = rand::thread_rng();
        let mut balance = INITIAL_BALANCE;
        let mut bet = INITIAL_BET;

        let mut loss_streak = 0;

        for _ in 0..100 {
            // println!(
            //     "   prebalance: {} betting:{}, posbalance:{}",
            //     balance,
            //     bet,
            //     balance - bet
            // );
            balance -= bet;

            if balance <= 0. {
                break;
            }

            let luck: f64 = rng.gen();

            if luck < WIN_STAKES {
                // win
                balance += bet * WIN_MULTIPLYER;
                //println!("  won:{}", balance);

                // reset strat
                loss_streak = 0;
                bet = INITIAL_BET;
            } else {
                // lose
                loss_streak += 1;

                bet *= BET_MULTIPLYER;

                if LOSS_STOP == loss_streak {
                    //println!("  loss:{}", balance);

                    loss_streak = 0;
                    bet = INITIAL_BET;
                }
            }
        }
        if balance > INITIAL_BALANCE {
            pos_tally += 1;
        } else {
            neg_tally -= 1;
        }
    }

    println!(
        "{}:{} (adventage:{})",
        pos_tally,
        neg_tally,
        ((pos_tally as f64 + neg_tally as f64) / (pos_tally as f64 - neg_tally as f64))
    );
}
