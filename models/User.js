var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt');
var Schema    = mongoose.Schema;
var Dogs      = require('./Dogs')


var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 99
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zip: {
    type: Number,
    required: true,
    minlength: 5,
  },
  dogs: [{type: Schema.Types.ObjectId, ref:'Dogs'} ]
  },
  {usePushEach: true} 
);

// Override 'toJSON' to prevent the password from being returned with the user
// converting to json to send to react or any front end. But the front end doesn't need to know the password
userSchema.set('toJSON', {
  transform: function(doc, user, options) {
    var returnJson = {
      id: user._id,
      email: user.email,
      name: user.name,
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
      dogs: user.dogs
    };
    return returnJson;
  }
});

//CHECKS IF PASSWORD IS CORRENT
userSchema.methods.authenticated = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// Mongoose's version of a beforeCreate hook
// BEFORE SAVE, WE ARE HASING THE PASSWORD
userSchema.pre('save', function(next) {
  if (this.isNew) {
    var hash = bcrypt.hashSync(this.password, 10);
    // store the hash as the user's password
    this.password = hash;
  }
  next();
});

// var User = mongoose.model('User', userSchema);

// module.exports = User;
module.exports = mongoose.model('User', userSchema);
