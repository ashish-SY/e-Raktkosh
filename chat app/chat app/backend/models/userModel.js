const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  cpassword:{
      type:String,
      required:true
  },
  phone_number:{
      type:String,
      required:true
  },
  age:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  district:{
      type:String,
      required:true
  },
  pincode:{
      type:String,
      required:true
  },
 
  state:{
      type:String,
      required:true
  },
  gender:{
      type:String,
      required:true
  },
  blood_group:{
      type:String,
      required:true
  },
  photo:{
      type:String,
      required:true
  },
  location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
  },
  data:[{
      name:{
          type: String
      },
      email:{
          type:String
      },
      phone_number:{
          type:String
      },
      age:{
          type:String
      },
      address:{
          type:String
      },
      district:{
          type:String
      },
      pincode:{
          type:String
      },
      state:{
          type:String
      },
      gender:{
          type:String
      },
      blood_group:{
          type:String
      }
     
  } 
  ],
  date: {type: Date, default: Date.now},
  tokens:[
      {
          token:{
              type:String,
              required:true
          }
      }
  ]
  }
  // { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
