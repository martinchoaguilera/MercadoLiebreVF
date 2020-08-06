let db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price*(1-(discount/100))).toFixed(2));
    }
    let first = priceDot.slice(0,-3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `$ ${first}${lastReplaced}`;
};

let product = {
    create: (req, res) => {
        res.render('create2');
    },
    // --------------------------------------------------------------------
    save: (req, res, next) => {
        db.Productos.create({
            name: req.body.name,
            description: req.body.description,
            image: req.files[0].filename,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category
        });

        res.redirect('/');
    },
    // -----------------------------------------------------------------
    view: (req, res) => {

        db.Productos.findAll({
            where: {
                id: req.params.id,
            }
        })
            .then(product => {
                console.log(product[0].name);
                res.render('detail2', { formatPrice , propiedadesProductos: product[0] })
            })
    },
    // --------------------------------------------------------------------------
    list: (req, res) => {
        db.Productos.findAll()
            .then(productos => {
                res.render('allProducts', { propiedadesProductos: productos })
            })
    },
    // --------------------------------------------------------------------------
    viewEdit: ( req , res ) => {
        // EN CASO DE REALIZAR DOS PEDIDOS ASINCRONOS
        // GUARDO EN DOS VARIABLES LOS PEDIDOS Y DESPUES REALIZO UN PROMISE.ALL([VARIABLE1,VARIABLE2])
        // EL THEN RECIBE UN ARRAY CON LOS DOS RESULTADOS.
        db.Productos.findAll({
            where: {
                id: req.params.id,
            }
        })
            .then(product => {
                // console.log(product[0].name);
                res.render('edit2', {  propiedadesProductos: product[0] })
            })
    },
    // --------------------------------------------------------------------------
    saveEdit: (req, res, next) => {
        db.Productos.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount: req.body.discount,
                category: req.body.category
            }, {
            where: {
                id: req.params.id,
            }
        });
        res.redirect('/');
    },
    // ----------------------------------------------------------------------------
    delete: (req, res) => {

        db.Productos.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/');
    },
    // -------------------------------------------------------------------------------
    search: async (req, res) => {
        // res.send(req.query.search);
        if (req.query.search == "") {
            res.redirect("/");
        } else {
            let products = await db.Productos.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                }
            })
                res.render( "results" , {formatPrice, products : products  } );
           

            // console.log(products);
            
            //res.render( 'results' , { propiedadesProductos : products } );

        }
    }
}


module.exports = product;