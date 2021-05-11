const router = require("express").Router();
const { request } = require("express");
let Item = require ('../models/Item');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, callback)=>{
//         callback(null, './frontend/public/uploads')
//     },
//     filename: (req, file, callback)=>{
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage});

router.route('/addItem').post((req, res)=> {
    const name = req.body.name;
    const price = Number(req.body.price);
    const description = req.body.description;
    const category = req.body.category;

    const newItem = new Item({
        name,
        price,
        description,
        category 
    })

    newItem.save().then(()=> {
        res.json("Item added")
    }).catch((err)=>{
        console.log(err)
    })
})
router.route('/').get((req, res)=>{
    Item.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route('/:id').get(async(req, res)=>{
    let id = req.params.id;
    const item = await Item.findById(id).then(()=>{
        res.status(200).send({item: item})
    }).catch((err)=>{
        res.status(500).send({status: "Error with get item", error:err.message});
    })
})
module.exports = router;