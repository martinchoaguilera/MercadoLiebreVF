let db= require('../database/models');

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

let index= {
    index: ( req , res ) => {
        db.Productos.findAll()
            .then( productos => {
                if(productos){
                    res.render('index2', { formatPrice , propiedadesProductos : productos });
                }else{
                    res.send('Error');
                }
            })
    }
}

module.exports= index;