const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const customerDb = {
    person: [
        { id: '1', firstName: 'Daenerys', lastName: 'Targaryen', age: 28, sex: 'female' },
        { id: '2', firstName: 'Jon', lastName: 'snow', age: 32, sex: 'male' },
        { id: '3', firstName: 'Arya', lastName: 'Stark', age: 22, sex: 'female' },
        { id: '4', firstName: 'Sansa', lastName: 'Stark', age: 26, sex: 'female' },
        { id: '5', firstName: 'Tyrion', lastName: 'Lannister', age: 35, sex: 'male' },
    ]
}

const transactionDb = {
    '1': [
        { date: '2020-17-08 12:00:00', month: 'Jun', item: 'Armani', price: 127.00 },
        { date: '2020-15-08 12:00:00', month: 'Jun', item: 'Ferrari', price: 92.00 },
        { date: '2020-14-08 12:00:00', month: 'Jun', item: 'Macys', price: 22.00 },
        { date: '2020-12-08 12:00:00', month: 'Jun', item: 'Puma', price: 169.00 },
        { date: '2020-23-07 12:00:00', month: 'Jul', item: 'Gucci', price: 102.00 },
        { date: '2020-22-07 12:00:00', month: 'Jul', item: 'Givenchey', price: 34.00 },
        { date: '2020-21-06 12:00:00', month: 'May', item: 'Nordstorm', price: 29.00 },
        { date: '2020-04-06 12:00:00', month: 'May', item: 'Sony', price: 133.00 }
    ],
    '2': [
        { date: '2020-12-06 12:00:00', month: 'Jul', item: 'Apple', price: 45.00 },
        { date: '2020-08-05 12:00:00', month: 'May', item: 'Banana', price: 196.00 },
        { date: '2020-15-05 12:00:00', month: 'May', item: 'Tommy', price: 183.00 },
        { date: '2020-13-02 12:00:00', month: 'Feb', item: 'Nike', price: 108.00 },
    ],
    '3': [
        { date: '2020-12-04 12:00:00', month: 'Apr', item: 'Adidas', price: 69.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'Leather', price: 99.00 },
        { date: '2020-12-02 12:00:00', month: 'Feb', item: 'Bose', price: 119.00 },
        { date: '2020-12-01 12:00:00', month: 'Jan', item: 'Walmart', price: 99.00 },
    ],
    '4': [
        { date: '2020-12-05 12:00:00', month: 'May', item: 'Target', price: 88.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'Ebay', price: 11.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'Amazon', price: 166.00 },
        { date: '2020-12-05 12:00:00', month: 'May', item: 'Romwe', price: 277.00 },
    ],
    '5': [
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'Shien', price: 75.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'Flipkart', price: 123.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'Amazon', price: 99.00 },
        { date: '2020-08-06 12:00:00', month: 'Jun', item: 'Deccan', price: 183.00 },
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
