const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [{
         name: "Cloud's Rest",
         image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c178a4e8b0bd_340.jpg",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit ut aliquam purus sit amet. Sed viverra ipsum nunc aliquet. Eu non diam phasellus vestibulum. Massa enim nec dui nunc mattis enim ut tellus. Vel eros donec ac odio tempor orci dapibus. Sodales ut etiam sit amet nisl purus."
    },
    {
        name: "Desert Masa",
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f8c178a4e8b0bd_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit ut aliquam purus sit amet. Sed viverra ipsum nunc aliquet. Eu non diam phasellus vestibulum. Massa enim nec dui nunc mattis enim ut tellus. Vel eros donec ac odio tempor orci dapibus. Sodales ut etiam sit amet nisl purus."
    },
    {
        name: "Indian Heaven",
        image: "https://farm8.staticflickr.com/7677/17482091193_e0c121a102.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit ut aliquam purus sit amet. Sed viverra ipsum nunc aliquet. Eu non diam phasellus vestibulum. Massa enim nec dui nunc mattis enim ut tellus. Vel eros donec ac odio tempor orci dapibus. Sodales ut etiam sit amet nisl purus."
    }];

function seedDB() {
    Comment.remove({}, function (err) {});
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("remove campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added Campground");
                    Comment.create({
                        text: "This place is great, but I wish there was internet.",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });

    }

module.exports = seedDB;