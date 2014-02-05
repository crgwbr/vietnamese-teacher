(function() {
    "use strict";

    var WORDS = $.getJSON('data.json'),
        Teacher;

    Teacher = function(container) {
        this.container = container;
        this.currentWord = 0;
    };


    Teacher.prototype = {
        draw: function(words) {
            this.words = this.__shuffle(words);
            this.currentWord = 0;
            this.showWord();
        },


        showEnglish: function() {
            var self = this,
                word = this.words[this.currentWord],
                master = $('<h3>' + word[0] + '</h3>');

            _gaq.push(['_trackEvent', 'ShowEnglish', 'Show English Word']);

            this.container.find('button').html('Next Word');

            master.hide();
            this.container.find('h2:first').before(master);
            master.slideDown();

            this.container.find('button').one('click', function() {
                self.currentWord++;
                self.container.children().fadeOut(function() {
                    self.showWord();
                });
            });
        },


        showWord: function() {
            var self = this,
                word = this.words[this.currentWord],
                foreigns = word[1],
                elem = $('<div></div>'),
                next = $('<button>Show English</button>'),
                i;

            _gaq.push(['_trackEvent', 'ShowWord', 'Show Vietnamese Word']);

            for (i = 0; i < foreigns.length; i++) {
                elem.append('<h2>' + foreigns[i] + '</h2>');
            }

            next.one('click', function() {
                self.showEnglish();
            });

            elem.hide();

            next.addClass('nextButton');
            this.container.empty();
            this.container.append(next);
            this.container.append(elem);

            elem.fadeIn();
        },


        __shuffle: function(array) {
            var currentIndex = array.length,
                temporaryValue,
                randomIndex;

            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    };



    $('.teacher').each(function() {
        var container = $(this);

        WORDS.done(function(words) {
            var t = new Teacher(container);
            t.draw(words);
        });
    });

}());