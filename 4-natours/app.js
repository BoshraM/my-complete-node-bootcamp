const fs = require('fs');
const express = require("express");
const morgan = require('morgan')

const app = express();

//1- MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middlware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2- ROETES HANDLER 
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'seccess',
    requestedID: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  })
}

const getTour = (req, res) => { // ====> /api/v1/tours/:id/:y?'  in this way the y will be optional
  const id = +req.params.id

  //first solution for invalid id
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "invalid ID"
  //   })
  // }

  const tour = tours.find(el => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID"
    })
  }
  res.status(200).json({
    status: 'seccess',
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour
      }
    })
  });

}

const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID"
    })
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated from here...>"
    }
  });
}

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID"
    })
  }
  res.status(204).json({
    status: "success",
    data: null
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
};
//  ALL OF THIS CAN WRITE ON THE ROUTE SO THESE HAS CHANGED TO ROUTES
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', creatTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//3-ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour)

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

userRouter
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// 4- START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
});
