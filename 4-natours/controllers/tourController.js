const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'seccess',
        requestedID: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

exports.getTour = (req, res) => { // ====> /api/v1/tours/:id/:y?'  in this way the y will be optional
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

exports.createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tours: newTour
            }
        })
    });
};

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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