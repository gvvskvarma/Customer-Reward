const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const customerDb = {
    person: [
        { id: '1', firstName: 'Danereyas', lastName: 'Targaryen', age: 28, sex: 'female' },
        { id: '2', firstName: 'Jon', lastName: 'Snow', age: 32, sex: 'male' },
        { id: '3', firstName: 'Arya', lastName: 'Stark', age: 22, sex: 'female' },
        { id: '4', firstName: 'Sansa', lastName: 'Stark', age: 26, sex: 'female' },
        { id: '5', firstName: 'Tyrion', lastName: 'Lannister', age: 35, sex: 'male' },
    ]
}

const transactionDb = {
    '1': [
        { date: '2020-12-07 10:12:45', month: 'July', item: 'abcd1', price: 72.00 },
        { date: '2020-12-07 10:12:45', month: 'July', item: 'efgh', price: 122.00 },
        { date: '2020-12-07 10:12:45', month: 'July', item: 'ijkl', price: 23.00 },
        { date: '2020-12-07 10:12:45', month: 'July', item: 'mnop', price: 154.00 },
        { date: '2020-23-06 10:12:45', month: 'Jun', item: 'ijkl', price: 23.00 },
        { date: '2020-22-06 10:12:45', month: 'Jun', item: 'mnop', price: 121.00 },
        { date: '2020-21-05 10:12:45', month: 'May', item: 'mnop', price: 23.00 },
        { date: '2020-04-05 10:12:45', month: 'May', item: 'mnop', price: 120.00 }
    ],
    '2': [
        { date: '2020-12-06 10:12:45', month: 'Jun', item: 'ijkl', price: 23.00 },
        { date: '2020-08-05 10:12:45', month: 'May', item: 'mnop', price: 150.00 },
        { date: '2020-15-05 10:12:45', month: 'May', item: 'abcd2', price: 50.00 },
        { date: '2020-13-02 10:12:45', month: 'Feb', item: 'efgh', price: 100.00 },
    ],
    '3': [
        { date: '2020-12-04 10:12:45', month: 'Apr', item: 'mnop', price: 151.00 },
        { date: '2020-12-03 10:12:45', month: 'Mar', item: 'ijkl', price: 24.00 },
        { date: '2020-12-02 10:12:45', month: 'Feb', item: 'efgh', price: 102.00 },
        { date: '2020-12-01 10:12:45', month: 'Jan', item: 'abcd3', price: 52.00 },
    ],
    '4': [
        { date: '2020-12-03 10:12:45', month: 'Mar', item: 'abcd4', price: 55.00 },
        { date: '2020-12-03 10:12:45', month: 'Mar', item: 'efgh', price: 10.00 },
        { date: '2020-12-03 10:12:45', month: 'Mar', item: 'ijkl', price: 230.00 },
        { date: '2020-12-03 10:12:45', month: 'Mar', item: 'mnop', price: 152.00 },
    ],
    '5': [
        { date: '2020-12-07 10:12:45', month: 'July', item: 'abcd5', price: 51.00 },
        { date: '2020-12-07 10:12:45', month: 'July', item: 'efgh', price: 102.00 },
        { date: '2020-12-07 10:12:45', month: 'July', item: 'ijkl', price: 25.00 },
        { date: '2020-12-07 10:12:45', month: 'July', item: 'mnop', price: 156.00 },
    ]
}

app.get('/profile', (req, res) => {
    // MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true }, function (err, client) {
    //     if (err) throw err
    //     const db = client.db('customerDb')
    //     console.log(`Conneted to Database`)
    //     db.collection('customer').find().toArray(function (err, result) {
    //         if (err) throw err
    //         console.log(result)
    //         res.send({ customer: result })
    //     })
    // })
    const retCustomer = customerDb.person.find((elem) => {
        return elem.id === req.query.id
    })
    res.send({
        'customer': retCustomer
    })
})

app.get('/reward', (req, res) => {
    // let retReward = [
    //     { month: 'July', reward: 5 },
    //     { month: 'June', reward: 2 },
    //     { month: 'May', reward: 4 },
    //     { month: 'April', reward: 0 },
    //     { month: 'March', reward: 0 },
    //     { month: 'February', reward: 10 },
    //     { month: 'January', reward: 0 },
    // ];
    // Logic to extract data from transactionDB and provide only  
    // the rewards required to the front-end
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
    
    res.send({
        'reward': retRewardFinal
    })
})

app.get('/transaction', (req, res) => {
    // DATA MODEL
    // let retTransaction = [
    //     { date: 'Jul 12 2020', item: 'abcd', price: 50.00 },
    //     { date: 'Jul 8 2020', item: 'efgh', price: 100.00 },
    //     { date: 'Jul 9 2020', item: 'ijkl', price: 23.00 },
    //     { date: 'Jul 8 2020', item: 'efgh', price: 100.00 },
    //     { date: 'Jul 9 2020', item: 'ijkl', price: 23.00 },
    // ];

    // Logic to extract data from transactionDB and provide only  
    // the only the customer transaction details to front-end
    var reqElement = [];
    var retTransaction = [];
    var keys = Object.keys(transactionDb);

    for (var i = 0; i < keys.length; i++) {
        if (req.query.id === keys[i]) {
            reqElement = transactionDb[i + 1];
        }
    }
    reqElement.map((elem) => {
        if (req.query.month === elem.month) {
            return retTransaction.push({ date: elem.date, price: elem.price, item: elem.item })
        }
    })
    res.send({
        'transaction': retTransaction
    })
})


app.listen(8080, () => console.log('Server started at port 8080!!!'));

