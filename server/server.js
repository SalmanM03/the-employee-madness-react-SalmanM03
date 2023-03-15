require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");


const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(cors({  
  origin: "*",
}))
app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.use("/api/equipment/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await EquipmentModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });  
  return res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) =>{
    const employee = req.body;
  
    try {
      const saved = await EmployeeModel.create(employee);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });


  app.patch("/api/employees/:id", async (req, res, next) => {
    const employee = req.body;
  
    try {
      const updated = await req.employee.set(employee).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  });


  app.delete("/api/employees/:id", async (req, res, next) => {
    try {
      const deleted = await req.employee.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });

app.get('/getRobert', async (req, res) => {
  const getNameRobert = await EmployeeModel.find({name:{$regex: "Robert", $options: "i"}})
  res.send(getNameRobert)
})

app.get('/filterByLevel/:level', async (req, res) => {
  const filterName = await EmployeeModel.find({level:{$regex:`${req.params.level}`, $options: "i"}}).sort({created: "desc" });
  res.send(filterName)

})

app.get('/filterByPosition/:position', async (req, res) => {
  const filterPosition = await EmployeeModel.find({position:{$regex: `${req.params.position}`, $options: "i"}}).sort({created: "desc"})
  res.send(filterPosition)
})
app.get('/filterByName/:name', async (req, res) => {
  const filterName = await EmployeeModel.find({name:{$regex: `${req.params.name}`, $options: "i"}}).sort({created: "desc"})
  res.send(filterName)
})

app.get('/sortByName/:name', async (req, res) => {
  const sortByName = await EmployeeModel.find().sort({name:1})
  res.send(sortByName)
})
app.get('/sortByPosition/:position', async (req, res) => {
  const sortPosition = await EmployeeModel.find().sort({position:1})
  res.send(sortPosition)
})
app.get('/sortByLevel/:level', async (req, res) => {
  const sortLevel = await EmployeeModel.find().sort({level:1})
  res.send(sortLevel)
})



app.get('/api/equipment', async (req, res) => {
  const equipment = await EquipmentModel.find({}).sort({ created: "desc" }); 
  return res.json(equipment)
})
app.get("/api/equipment/:id", (req, res) => {
  return res.json(req.equipment);
});

app.post("/api/equipment", async (req, res, next) =>{
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipment/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


app.get('/EmployeeData/:years', async(req, res) => {

  


  if(req.params.years !== "undefined"){
    const years = parseInt(req.params.years)
    const data = await EmployeeModel.find({years}).sort()
    res.json(data)
  } else{
    const employees = await EmployeeModel.find().sort()
    res.send(employees)
  }
})

app.get('/EmployeeData/sortByNameASC/:name', async(req, res) => {
  const name = await EmployeeModel.find().sort({name:1})
  res.send(name)
})

app.get('/EmployeeData/sortByNameDESC/:name', async(req, res) => {
  const name = await EmployeeModel.find().sort({name:-1})
  res.send(name)
})




const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
