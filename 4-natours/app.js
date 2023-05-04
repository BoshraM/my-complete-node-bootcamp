const fs = require('fs');
const express = require("express");

const app = express();

app.use(express.json())

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send(' you can post to this endpoint...')
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'seccess',
    results: tours.length,
    data: {
      tours
    }
  })
});

app.get('/api/v1/tours/:id', (req, res) => { // ====> /api/v1/tours/:id/:y?'  in this way the y will be optional
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


});


app.post('/api/v1/tours', (req, res) => {
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

});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
});