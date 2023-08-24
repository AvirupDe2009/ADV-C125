noseX=0;
noseY=0;
wristrightX=0;
wristleftX=0;
difference=0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);
    canvas = createCanvas(550,500);
    canvas.position(560,150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('poses', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet is Initialised');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + " Nose Y = " + noseY);

        wristrightX = results[0].pose.rightWrist.x;
        wristleftX = results[0].pose.leftWrist.x;
        difference = floor(wristleftX - wristrightX);
        console.log("Wrist right = " + wristrightX + " Wrist Left = " + wristleftX + " Difference  = " + difference);
    }
}
function draw(){
    background('#808080');
    document.getElementById("square_side").innerHTML="width and height of the square will be " + difference +"px";
    fill('#FFC0CB');
    stroke('#F4C2C2');
    square(noseX, noseY, difference);
}