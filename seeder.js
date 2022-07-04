const mongoose = require("mongoose");
require("./server/models/user.model");

const UserModel = mongoose.model('user')

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected "))
  .catch((err) => console.log(err));


const userSeed = [
    {
        "_id": "62c11f069fbd7ef698e49bc2",
        "company": "MHCHealthCare",
        "email": "admin@MHCHealthCare.com.sg",
        "password": "MHCHealthCare",
        "role": "Vendor"
    },
    {
        "_id": "62c253aec09a77376d924f29",
        "company": "MHCHealthCare 2",
        "email": "admin@MHCHealthCare 2.com.sg",
        "password": "MHCHealthCare 2",
        "role": "Vendor",
    },
    {
        "_id":"62c142746bfe4b364e000211",
        "company": "MHCCompanion",
        "email": "admin@MHCCompanion.com.sg",
        "password": "MHCCompanion",
        "role": "HR",
    }
]

const seeddb = async () => {
    await UserModel.deleteMany({});
    await UserModel.insertMany(userSeed);
}

seeddb().then(()=> {
    mongoose.connection.close();
})