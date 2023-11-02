
const { Schema, model } = require("mongoose");

const tarjetaSchema = Schema({
  number: { 
    type: Number,
    unique:true, 
    required: true 
  },
  expirationDate: { 
    type: Date,
     required: true,
     default: () => {
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1); 
      return now;
    }, 
    },
  discounts: [
    {
      storeName: { 
        type: String
      },
      discountPercentage: { 
        type: Number 
      },
    },
  ],
});

module.exports = model ("Tarjeta", tarjetaSchema);