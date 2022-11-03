const numsToColours = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
}
const ColoursToNums = {
    "green": 1,
    "red": 2,
    "yellow": 3,
    "blue": 4
}
var sequence = []
var userSequence = []
var listeningForPresses = false
var gameStarted = false

function flash_button(id) {
    var originalColor = $('#'+ id).css('background-color')
    $('#'+ id).css('background-color', '#ffffff')
    setTimeout(function() {
        $('#'+ id).css('background-color', originalColor)
    }, 50)
}

function update_stage() {
    $('#level-title').text('Level ' + sequence.length)
}

function add_next_seq() {
    var end_digit = Math.floor(Math.random() * 4) + 1 //Generates a number from 1 - 4
    sequence.push(end_digit)
    flash_button(numsToColours[end_digit])
}

$(document).ready(function(){
    $('.btn').click(function(){
        if (listeningForPresses) {
            var color = $(this).attr('id')
            flash_button(color)
            userSequence.push(ColoursToNums[color])
            var latest = userSequence.length - 1
            if (!(userSequence[latest] == sequence[latest])) {
                listeningForPresses = false
                document.body.style.backgroundColor = '#bf3b2c'
                $('#level-title').text('INCORRECT. Game Over!')
                setTimeout(function() {
                    gameStarted = false
                    document.body.style.backgroundColor = '#011F3F'
                    $('#level-title').text('Press a Mouse Button to Start')
                }, 3000)
                return
            }
            if (sequence.length == userSequence.length) {
                listeningForPresses = false
                setTimeout(function() {
                    add_next_seq()
                    update_stage()
                    userSequence = []
                    listeningForPresses = true
                }, 500)
            }
        }
    });
    $(document).click(function() { // Start a game if gameStarted = false
        if (!gameStarted) {
            gameStarted = true
            $('#level-title').text('Game Start!')
            sequence = []
            userSequence = []
            setTimeout(function() {
                add_next_seq()
                update_stage()
                listeningForPresses = true
            }, 1000)
        }
    })
});