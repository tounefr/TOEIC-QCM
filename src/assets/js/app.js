
var EpiQCM = {
    rank_min: 0,
    rank_max: 0,
    words_list: [],
    word_to_translate: null,
    words_per_question: 4,
    /* true = english to french, false = french to english */
    translate_direction: true,
    success: true,

    init: function() {
        EpiQCM.loadWords(function(_words_list) {
            EpiQCM.words_list = _words_list;
            EpiQCM.loadQCM();
        }, function() {
            EpiQCM.renderTemplate('#template_load', {
                'message': 'Failed to load the words'
            });
        })
    },

    loadQCM: function() {
        EpiQCM.swapWords();
        EpiQCM.success = true;
        var randedWords = EpiQCM.randSomeWords();
        var goodWord = randedWords[Math.floor(Math.random()*randedWords.length)];

        var words = [];
        for (var i = 0; i < randedWords.length; i++) {
            var isGoodWord = (randedWords[i] == goodWord);
            words.push(EpiQCM.renderWord(randedWords[i], isGoodWord));
        }
        EpiQCM.renderTemplate('#template_words', {
            'word_to_translate': EpiQCM.words_list[goodWord],
            'rank_min': EpiQCM.rank_min,
            'rank_max': EpiQCM.rank_max,
            'word_choices': words
        });
    },

    swapWords: function() {
        var ret = {};
        for(var key in EpiQCM.words_list){
            ret[EpiQCM.words_list[key]] = key;
        }
        EpiQCM.words_list = ret;
    },

    renderWord: function(word, type) {
    return ((type) ?
        {'type1': 'success', 'type2': 'fa-check', 'word': word} :
        {'type1': 'o-danger', 'type2': 'fa-close', 'word': word});
    },

    renderTemplate: function(selector, vars) {
        var template = $(selector).html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, vars);
        $('#render').html(rendered);
        EpiQCM.eventsListener();
    },

    randSomeWords: function() {
        var randed_words  = [];
        var keys = Object.keys(EpiQCM.words_list);
        for (var i = 0; i < EpiQCM.words_per_question; i++) {
            var randed_key = keys[Math.floor(Math.random()*keys.length)];
            randed_words.push(randed_key);
        }
        return randed_words;
    },

    loadWords: function(success, fail) {
        $.ajax({
            url: 'words.json',
            dataType: 'json',
            success: success
        }).fail(fail);
    },

    pushHistory: function(wordKey) {

    },

    eventsListener: function() {
        $('input[type=checkbox]').change(function() {
           var isGoodAnswer = $(this).parent().hasClass('success');
           if (isGoodAnswer) {
               if (EpiQCM.success)
                   EpiQCM.rank_min++;
               EpiQCM.rank_max++;
               setTimeout(EpiQCM.loadQCM, 1000);
           }
           else
               EpiQCM.success = false;
        });
    }
};

EpiQCM.init();