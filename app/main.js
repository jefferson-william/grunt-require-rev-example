'use strict';

require.config({
    baseUrl: '/'
});

require([
    'bower_components/jquery/jquery',
    'scripts/main'
], function(jquery, main) {
    $('body').html('Hello!');
});
