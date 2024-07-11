const express = require('express')
const app = express();
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg');
const port = 3000;

// start capture
const videoStream = require('./videoStream');
videoStream.acceptConnections(app, {
        width: 1280,
        height: 720,
        fps: 16,
        encoding: 'JPEG',
        quality: 7 // lower is faster, less quality
    }, 
    '/stream.mjpg', true);

app.use(express.static(__dirname+'/public'));

// Function to generate unique filename
function generateFilename() {
    const timestamp = Date.now();
    return `/home/miner/pi_camera/streams/output_${timestamp}.mp4`; // Example path with timestamp
}

// Save stream to file with a new unique filename on each run
const streamUrl = 'http://localhost:3000/stream.mjpg'; // Update with your server IP if needed

function startRecording() {
    const outputFilePath = generateFilename();

    ffmpeg(streamUrl)
        .inputFormat('mjpeg')
        .output(outputFilePath)
        .outputOptions([
            '-c:v libx264',
            '-preset ultrafast', // Use 'ultrafast' for faster processing (less compression)
            '-pix_fmt yuv420p',
            '-r 16' // Frame rate
        ])
        .on('start', function() {
            console.log(`Recording started. Output file: ${outputFilePath}`);
        })
        .on('end', function() {
            console.log('Recording finished.');
            startRecording(); // Start a new recording after finishing
        })
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .run();
}

// Start the initial recording
startRecording();

app.listen(port, () => console.log(`Example app listening on port ${port}! In your web browser, navigate to http://<IP_ADDRESS_OF_THIS_SERVER>:3000`));
