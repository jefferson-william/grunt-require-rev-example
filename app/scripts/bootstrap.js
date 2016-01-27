'use strict';

require.config({
    baseUrl: '/',
    paths: {
        'main': 'scripts/main',
        'jquery': 'scripts/jquery/jquery'
    }
});

require([
    'jquery',
    'main'
], function(jquery, main) {
    $('body').html('Hello!');
});
