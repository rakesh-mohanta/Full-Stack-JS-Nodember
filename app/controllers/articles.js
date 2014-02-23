/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Article = mongoose.model('Article'),
    _ = require('underscore');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {

    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));

        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body.article);
    
    article.user = req.user;            
    article.save(function(err) {
        var formattedArticle = {};

        formattedArticle.article = article;        
        formattedArticle.article.id = article._id;        

        console.log(article.id);
        console.log(formattedArticle.id);

        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(formattedArticle);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {


    // var article = req.body.article;

    // article = _.extend( article, req.body);

    // article.save(function(err) {
    //     var articleObj = {article : article }
    //     res.jsonp(articleObj);
    // });

    var article = req.article;
    article.title = req.body.article.title;
    article.articleContent = req.body.article.articleContent;

    article.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var articleObj = {article: article};
            res.jsonp(articleObj);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    var article = {article : req.article}
    res.jsonp(article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        
        articles.forEach(function(article) { 
            article.id = article._id;
        });

        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.send({
                articles: articles
            });
        }
    });
};