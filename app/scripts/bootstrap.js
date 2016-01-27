'use strict';

require.config({
    baseUrl: '/scripts',
    paths: {
        'jquery': '../bower_components/jquery/jquery'
    }
});

require([
    'main',
    '../bower_components/jquery/jquery'
], function(jquery, mainController, main) {
    $('body').html('Hello!');
});
