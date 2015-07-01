"use strict";
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have defined URLs', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
                expect(feed.url).not.toBe(null);

            });
        });

        it('have defined names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
                expect(feed.name).not.toBe(null);
            });
        });
    });


    describe('The menu', function () {

        it('should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('should toggle visibility when the menu icon is clicked', function () {
            var menuIcon = $('.menu-icon-link')[0];
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('have at least one entry', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function () {

        var oldContent = null;
        var newContent = null;

        // load current content and content after loadFeed
        beforeEach(function (done) {
            loadFeed(1, function () {
                oldContent = $('.feed .entry p').map(function () {
                    return $(this).text();
                }).get().join();

                loadFeed(2, function () {
                    newContent = $('.feed .entry p').map(function () {
                        return $(this).text();
                    }).get().join();
                    done();
                });
            });
        });

        it('should update content', function (done) {
            expect(oldContent).not.toBe(newContent);
            done();
        });
    });
}());