// import express from 'express';
const express = require('express')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', './templates/views')

const userData = [
    {
        id: "1",
        name: "Lucas",
        email: "lucasl@codingtemple.com",
        favoriteColor: "blue",
        posts: [
            {
                id: "1",
                body: "This is a post"
            },
            {
                id: "2",
                body: "This is post 2"
            },
            {
                id: "3",
                body: "This is post 3"
            }
        ],
        cart: [
            {
                id: "1",
                name: "T-Shirt",
                description: "This is a t-shirt"
            },
            {
                id: "2",
                name: "Shoe",
                description: "This is a shoe"
            }
        ]
    },
    {
        id: "2",
        name: "Christopher",
        email: "christophert@codingtemple.com",
        favoriteColor: "green",
        posts: [
            {
                id: "4",
                body: "This is post 4"
            },
            {
                id: "5",
                body: "This is post 5"
            },
            {
                id: "6",
                body: "This is post 6"
            }
        ],
        cart: [
            {
                id: "3",
                name: "T-Shirt",
                description: "This is a t-shirt"
            },
            {
                id: "4",
                name: "Hat",
                description: "This is a hat"
            }
        ]
    },
    {
        id: "3",
        name: "Joel",
        email: "joelc@codingtemple.com",
        favoriteColor: "red",
        posts: [
            {
                id: "7",
                body: "This is post 7"
            },
            {
                id: "8",
                body: "This is post 8"
            },
            {
                id: "9",
                body: "This is post 9"
            }
        ],
        cart: [
            {
                id: "5",
                name: "Shoe",
                description: "This is a t-shirt"
            },
            {
                id: "6",
                name: "Pants",
                description: "These are pants"
            }
        ]
    }
]

/* const currentUser = {
    id: "1",
    name: "Lucas",
    email: "lucasl@codingtemple.com",
    loggedIn: true
} */

const currentUser = {
    loggedIn: true
}

const protectedRoutes = [
    '/',
    '/users'
]

/* 
* Logging middleware
*/
app.use((req, res, next) => {
    console.log(`Request Type: ${req.method} made at route ${req.originalUrl} at time: ${new Date()}`)
    next()
})

/* 
* Route Protection Middleware
*/
app.use((req, res, next) => {
    if (currentUser.loggedIn || !protectedRoutes.includes(req.originalUrl)) {
        // If user logged in or the route is not protected, 
        // send them to the route they requested
        next() 
    } else {
        // If user is not logged in, and the route is protected
        // Redirect to login
        res.redirect('/login')
    }
})

/* 
* Sending data middleware
*/
app.use((req, res, next) => {
    // Mock database request
    const data = {
        id: "1",
        name: "Lucas",
        email: "lucasl@codingtemple.com",
        posts: [
            {
                id: "1",
                body: "This is a post"
            },
            {
                id: "2",
                body: "This is post 2"
            },
            {
                id: "3",
                body: "This is post 3"
            }
        ]
    }

    req.currentUser = data
    next()
})

app.get('/', (req, res) => {
    const data = {
        name: "Lucas",
        color: "Red",
        user: req.currentUser
    }
    res.render('home', data)
})

app.get('/login', (req, res) => {
    res.send('Login page')
})

/* 
* Create a template to render the users in userData,
* Display all of their information.
* Also display all of their cart items, and the cart items information
*/
app.get('/users', (req, res) => {
    res.send(userData)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    for (const user of userData) {
        if (user.id === id) {
            res.send(user)
            return null
        }
    }

    res.send({
        error: `There was an error finding a user with id ${id}`
    })
})

app.get('/users/:userId/post/:postIndex', (req, res) => {
    const userId = req.params.userId
    const postIndex = req.params.postIndex

    for (const user of userData) {
        if (user.id === userId) {
            res.send(user.posts[postIndex])
            return null
        }
    }

    console.log(userId, postIndex)
})

// Implement a function that allows you to get a cart item
// from a user, based on an index
app.get('/users/:userId/cart/:cartIndex', (req, res) => {
})

// Implement a function that returns true or false to the browser
// based on whether or not a user has a specific product name
// in their cart.
app.get('/users/:userId/in-cart/:productName', (req, res) => {
    const productName = req.params.productName
    
    console.log(`${productName} is in cart`)
    res.send(true)
})

app.listen(port, () => {
    // Do anything that needs to run right when server starts
    console.log(`Express application started at port: ${port}`)
})