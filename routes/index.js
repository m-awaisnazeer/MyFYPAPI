var API_KEY = 1234

var express = require('express')
var router = express.Router()
var moment = require('moment')
const e = require('express')

//GET
router.get('/', function (req, res, next) {
    res.send('Hello world')
})

//======================================
//RESTAURANTOWNER TABLE
//GET /POST
//======================================

router.get('/restaurantowner', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT userPhone,name,CASE WHEN status=0 THEN \'FALSE\' ELSE \'TRUE\' END as status,restaurantId,fbid FROM restaurantowner WHERE fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message:"Wrong API Key" }))
    }
})

router.post('/restaurantowner', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var user_phone = req.body.userPhone
        var user_name = req.body.userName

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO restaurantowner(FBID,UserPhone,Status,Name) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=?', [fbid, user_phone, 0, user_name, user_name], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message:"Success" }))

                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


//======================================
//USER TABLE
//GET /POST
//======================================

router.get('/user', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT userPhone,name,address,fbid FROM user WHERE fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message:"Wrong API Key" }))
    }
})

router.post('/user', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var user_phone = req.body.userPhone
        var user_name = req.body.userName
        var user_address = req.body.userAddress

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO user(FBID,UserPhone,Name,Address) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Address=?', [fbid, user_phone, user_name, user_address, user_name, user_address], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message:"Success" }))

                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

//======================================
//FAVORITE TABLE
//GET /POST / DELETE
//======================================

router.get('/favorite', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/favoriteByRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=? AND restaurantId=?', [fbid, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


router.post('/favorite', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var food_id = req.body.foodId
        var restaurant_id = req.body.restaurantId
        var restaurant_name = req.body.restaurantName
        var food_name = req.body.foodName
        var food_image = req.body.foodImage
        var food_price = req.body.price


        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO favorite(FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUES(?,?,?,?,?,?,?)', [fbid, food_id, restaurant_id, restaurant_name, food_name, food_image, food_price], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))

                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


router.delete('/favorite', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid
        var food_id = req.query.foodId
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('DELETE FROM favorite WHERE FBID=? AND FoodId=? AND RestaurantId=?', [fbid, food_id, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message:"Success" }))

                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


//======================================
//RESTAURANT TABLE
//GET 
//======================================

router.get('/restaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM restaurant', function (err, rows, fields) {
                if (err) {
                    res.status(500)
                    res.send(JSON.stringify({ success: false, message: err.message }))
                }
                else {
                    if (rows.length > 0) {
                        res.send(JSON.stringify({ success: true, result: rows }))

                    } else {
                        res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                    }
                }
            })
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/restaurantById', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var restaurant_id = req.query.restaurantId
            if (restaurant_id != null) {
                conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM restaurant WHERE id=?', [restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "restaurant Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/nearbyrestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var user_lat = parseFloat(req.query.lat)
        var user_lng = parseFloat(req.query.lng)
        var distance = parseFloat(req.query.distance)

        if (user_lat != Number.Nan && user_lng != Number.Nan) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM (SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl,'
                    + 'ROUND(111.045 * DEGREES(ACOS(COS(RADIANS(?)) * COS(RADIANS(lat))'
                    + '* COS(RADIANS(lng) - RADIANS(?)) + SIN(RADIANS(?))'
                    + '* SIN(RADIANS(lat)))),2) AS distance_in_km FROM restaurant)tempTable WHERE distance_in_km < ?', [user_lat, user_lng, user_lat, distance], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message+"500" }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            })
        } else {
            res.send(JSON.stringify({ success: false, message: "Missing lat and lng" }))
        }

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


//======================================
//MENU TABLE
//GET 
//======================================

router.get('/menu', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var restaurant_id = req.query.restaurantId
            if (restaurant_id != null) {
                conn.query('SELECT id,name,description,image FROM menu WHERE id in(SELECT menuId FROM restaurant_menu WHERE restaurantId=?)', [restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "restaurant Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


//======================================
//Food TABLE
//GET 
//======================================

router.get('/food', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var menu_id = req.query.menuId
            if (menu_id != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
                    +'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
                    + 'discount FROM food WHERE id in (SELECT foodId FROM menu_food WHERE menuId=?)', [menu_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "menu Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/foodById', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
                    + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
                    + 'discount FROM food WHERE id=?', [food_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))

                            } else {
                                res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "food Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/searchfood', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var search_query = '%' + req.query.foodName + '%'
            if (search_query != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
                    + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as isAddon,'
                    + 'discount FROM Food WHERE name Like ?', [search_query], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))

                            } else {
                                res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "food Name missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


//======================================
//Size TABLE
//GET 
//======================================

router.get('/size', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,description,extraPrice FROM size WHERE id in (SELECT sizeId FROM food_size WHERE foodId=?)', [food_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))

                            } else {
                                res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "food Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

//======================================
//AddOn TABLE
//GET 
//======================================

router.get('/addon', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,name,description,extraPrice FROM addon WHERE id in (SELECT addonId FROM food_addon WHERE foodId=?)', [food_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "food Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

//======================================
//ORDER TABLE
//GET / POST
//======================================

router.get('/orderbyrestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var restaurantId = req.query.restaurantId
            var startIndex = parseInt(req.query.from)
            var endIndex = parseInt(req.query.to)

            //set Default if user not pass params
            if(isNaN(startIndex))
                startIndex=0;

            if(isNaN(endIndex))
                endIndex=10;


            if (restaurantId != null) {
                conn.query('SELECT orderId,orderFBID,orderPhone,orderName,orderAddress,orderStatus,orderDate,'
                    + 'restaurantId,transactionId,'
                    + 'CASE WHEN cod=1 THEN \'TRUE\' ELSE \'FALSE\' END as cod,'
                    + 'totalPrice,numOfItem FROM `order` WHERE restaurantId =? AND numOfItem > 0'
                    + ' ORDER By orderId DESC LIMIT ?,?', [restaurantId,startIndex,endIndex], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "order restaurantId missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/maxorderbyrestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var restaurantId = req.query.restaurantId
            
            if (restaurantId != null) {
                conn.query('SELECT COUNT(orderId) as maxRowNum  FROM `order` WHERE restaurantId =? AND numOfItem > 0'
                    + ' ORDER By orderId DESC', [restaurantId], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "order restaurantId missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


router.get('/order', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var order_fbid = req.query.orderFBID
            var startIndex = parseInt(req.query.from)
            var endIndex = parseInt(req.query.to)

            if (order_fbid != null) {
                conn.query('SELECT orderId,orderFBID,orderPhone,orderName,orderAddress,orderStatus,orderDate,'
                    + 'restaurantId,transactionId,'
                    + 'CASE WHEN cod=1 THEN \'TRUE\' ELSE \'FALSE\' END as cod,'
                    + 'totalPrice,numOfItem FROM `order` WHERE orderFBID =? AND numOfItem > 0'
                    + ' ORDER By orderId DESC LIMIT ?,?', [order_fbid,startIndex,endIndex], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "order fbId missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.get('/maxorder', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var order_fbid = req.query.orderFBID
            
            if (order_fbid != null) {
                conn.query('SELECT COUNT(orderId) as maxRowNum  FROM `order` WHERE orderFBID =? AND numOfItem > 0'
                    + ' ORDER By orderId DESC', [order_fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))

                        } else {
                            res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "order fbId missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


router.post('/createOrder', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var order_phone = req.body.orderPhone
        var order_name = req.body.orderName
        var order_address = req.body.orderAddress
        var order_date = moment(req.body.orderDate, "MM/DD/YYYY").format("YYYY-MM-DD");
        var restaurant_id = req.body.restaurantId
        var transaction_id = req.body.transactionId
        var cod = (req.body.cod == "true")
        var total_price = req.body.totalPrice
        var num_of_item = req.body.numOfItem
        var order_fbid = req.body.orderFBID


        if (order_fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO `order`(OrderFBID,OrderPhone,OrderName,OrderAddress,OrderStatus,OrderDate,RestaurantId,'
                    + 'TransactionId,COD,TotalPrice,NumOfItem) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [order_fbid, order_phone, order_name, order_address, 0, order_date, restaurant_id, transaction_id, cod, total_price, num_of_item], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        conn.query('SELECT OrderId as orderNumber FROM `order` WHERE OrderFBID=? AND NumOfItem > 0'
                            + ' ORDER BY orderNumber DESC LIMIT 1', [order_fbid], function (err, rows, fields) {
                                if (err) {
                                    res.status(500)
                                    res.send(JSON.stringify({ success: false, message: err.message }))
                                } else {
                                    res.send(JSON.stringify({ success: true, result: rows }))
                                }
                            })
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing order fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


//======================================
//ORDERDetails TABLE
//GET / POST
//======================================

router.get('/orderdetailbyrestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var order_id = req.query.orderId
            if (order_id != null) {
                conn.query('SELECT orderdetail.orderId,itemId,quantity,size,addOn,orderFBID,name,description,image FROM orderdetail'
                +' INNER JOIN `order` ON orderdetail.orderId=`order`.orderId'
                +' INNER JOIN food On orderdetail.itemId=food.ID'
                +' WHERE orderdetail.orderId=?', [order_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))

                            } else {
                                res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "order Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})


router.get('/orderDetails', function (req, res, next) {
    if (req.query.key == API_KEY) {

        req.getConnection(function (error, conn) {
            var order_id = req.query.orderId
            if (order_id != null) {
                conn.query('SELECT orderId,itemId,quantity,discount,extraPrice,size,addOn FROM orderdetail WHERE orderId=?', [order_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))

                            } else {
                                res.send(JSON.stringify({ success: false, message: "_EMPTY" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "order Id missing" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})

router.post('/updateOrder', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var order_id = req.body.orderId
        var order_detail

        try {
            order_detail = JSON.parse(req.body.orderDetail)
console.log("parsing success")
        }
        catch (err) {
            res.status(500)
            console.log("parsing error")

            res.send(JSON.stringify({ success: false, message: err.message}))
        }

        if (order_detail != null && order_id != null) {

            var data_insert = []
            for (i = 0; i < order_detail.length; i++) {
                data_insert[i] = [
                    parseInt(order_id),
                    order_detail[i]["foodId"],
                    order_detail[i]["foodQuantity"],
                    order_detail[i]["foodPrice"],
                    0, //discount
                    order_detail[i]["foodSize"],
                    order_detail[i]["foodAddon"],
                    parseFloat(order_detail[i]["foodExtraPrice"])
                    ]
            }
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO orderdetail(OrderId,ItemId,Quantity,Price,Discount,Size,Addon,ExtraPrice) VALUES(?)', data_insert, function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message}))
                            console.log("inserting"+parseInt(order_id))
                        }
                        else {
                            res.send(JSON.stringify({ success: true, message: "update success" }))
                        }
                    })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing order id and Detail in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong API Key" }))
    }
})
module.exports = router


// key=1234&fbid=2739799736047038