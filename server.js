const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const customerDb = {
    person: [
        { id: '1', firstName: 'penny', lastName: 'swetish', age: 30, sex: 'female' },
        { id: '2', firstName: 'sheldon', lastName: 'cooper', age: 36, sex: 'male' },
        { id: '3', firstName: 'stuart', lastName: 'weiss', age: 26, sex: 'male' },
        { id: '4', firstName: 'amy', lastName: 'Farah', age: 32, sex: 'female' },
        { id: '5', firstName: 'raj', lastName: 'koothrapalli', age: 25, sex: 'male' },
    ]
}

const transactionDb = {
    '1': [
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'abcd1', price: 132.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'efgh', price: 62.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'ijkl', price: 29.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'mnop', price: 176.00 },
        { date: '2020-23-07 12:00:00', month: 'Jul', item: 'ijkl', price: 103.00 },
        { date: '2020-22-06 12:00:00', month: 'Jul', item: 'mnop', price: 47.00 },
        { date: '2020-21-05 12:00:00', month: 'May', item: 'mnop', price: 23.00 },
        { date: '2020-04-05 12:00:00', month: 'May', item: 'mnop', price: 147.00 }
    ],
    '2': [
        { date: '2020-12-06 12:00:00', month: 'Jul', item: 'ijkl', price: 37.00 },
        { date: '2020-08-05 12:00:00', month: 'May', item: 'mnop', price: 183.00 },
        { date: '2020-15-05 12:00:00', month: 'May', item: 'abcd2', price: 172.00 },
        { date: '2020-13-02 12:00:00', month: 'Feb', item: 'efgh', price: 129.00 },
    ],
    '3': [
        { date: '2020-12-04 12:00:00', month: 'Apr', item: 'mnop', price: 59.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'ijkl', price: 97.00 },
        { date: '2020-12-02 12:00:00', month: 'Feb', item: 'efgh', price: 132.00 },
        { date: '2020-12-01 12:00:00', month: 'Jan', item: 'abcd3', price: 76.00 },
    ],
    '4': [
        { date: '2020-12-05 12:00:00', month: 'May', item: 'abcd4', price: 89.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'efgh', price: 17.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'ijkl', price: 269.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'mnop', price: 176.00 },
    ],
    '5': [
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'abcd5', price: 63.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'efgh', price: 119.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'ijkl', price: 89.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'mnop', price: 167.00 },
    ]
}

app.get('/reward', (req, res) => {
    var keys = Object.keys(transactionDb);
    var reqElement = [];
    var retReward = [];
    var retRewardFinal = [];
    var holder = {};

    for (var i = 0; i < keys.length; i++) {
        if (req.query.id === keys[i]) {
            reqElement = transactionDb[i + 1];
        }
    }
    reqElement.map((elem) => {
        let rewardCalc = 0;
        if (elem.price > 50.00) {
            if (elem.price <= 100.00) {
                rewardCalc = (elem.price - 50)
            }
        }
        if (elem.price > 100.00) {
            rewardCalc = 50 + (elem.price - 100) * 2
        }
        return retReward.push({ month: elem.month, reward: rewardCalc })
    })

    retReward.forEach( (elem) =>  {
      if (holder.hasOwnProperty(elem.month)) {
        holder[elem.month] = holder[elem.month] + elem.reward;
      } else {
        holder[elem.month] = elem.reward;
      }
    });

    for (var prop in holder) {
        retRewardFinal.push({ month: prop, reward: holder[prop] });
    }

    const retCustomer = customerDb.person.find((elem) => {
            return elem.id === req.query.id
    })

    var reqElement = [];
    var retTransaction = [];
    var keys = Object.keys(transactionDb);

    for (var i = 0; i < keys.length; i++) {
        if (req.query.id === keys[i]) {
            reqElement = transactionDb[i + 1];
        }
    }
    reqElement.map((elem) => {
       return retTransaction.push({ date: elem.date, price: elem.price, item: elem.item })
    })

    res.send({
        'reward': retRewardFinal,
        'customer': retCustomer,
        'transaction': retTransaction
    })
})

app.listen(8080, () => console.log('Server started at port 8080!!!'));
