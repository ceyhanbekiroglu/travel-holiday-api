const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();

const newspapers = [
	{
		name: "cityam",
		address: "https://www.cityam.com/life-and-style/travel/",
		base: "",
	},
	{
		name: "thetimes",
		address: "https://www.thetimes.co.uk/travel/",
		base: "",
	},
	{
		name: "guardian",
		address: "https://www.theguardian.com/uk/travel",
		base: "https://www.theguardian.com",
	},
	{
		name: "nyt",
		address: "https://www.nytimes.com/international/section/travel",
		base: "https://www.nytimes.com",
	},
	{
		name: "latimes",
		address: "https://www.latimes.com/travel",
		base: "",
	},
	{
		name: "smh",
		address: "https://www.smh.com.au/lifestyle",
		base: "https://www.smh.com.au",
	},

	{
		name: "bbc",
		address: "https://www.bbc.com/travel",
		base: "https://www.bbc.co.uk",
	},
	{
		name: "es",
		address: "https://www.standard.co.uk/escapist/travel",
		base: "https://www.standard.co.uk",
	},
	{
		name: "sun",
		address: "https://www.thesun.co.uk/travel/",
		base: "",
	},
	{
		name: "dm",
		address: "https://www.dailymail.co.uk/travel/index.html",
		base: "https://www.dailymail.co.uk",
	},
];

const articles = [];

newspapers.forEach((newspaper) => {
	axios.get(newspaper.address).then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);

		$('a:contains("travel")', html).each(function () {
			const title = $(this).text();
			const url = $(this).attr("href");

			articles.push({
				title,
				url: newspaper.base + url,
				source: newspaper.name,
			});
		});
	});
});

app.get("/", (req, res) => {
	res.json("Welcome to my Travel and Holiday News API");
});

app.get("/news", (req, res) => {
	res.json(articles);
});

app.get("/news/:newspaperId", (req, res) => {
	const newspaperId = req.params.newspaperId;

	const newspaperAddress = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].address;

	const newspaperBase = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].base;

	axios
		.get(newspaperAddress)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const specificArticles = [];

			$('a:contains("travel")', html).each(function () {
				const title = $(this).text();
				const url = $(this).attr("href");
				specificArticles.push({
					title,
					url: newspaperBase + url,
					source: newspaperId,
				});
			});
			res.json(articles);
		})
		.catch((err) => console.log(err));
});

newspapers.forEach((newspaper) => {
	axios.get(newspaper.address).then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);

		$('a:contains("holiday")', html).each(function () {
			const title = $(this).text();
			const url = $(this).attr("href");

			articles.push({
				title,
				url: newspaper.base + url,
				source: newspaper.name,
			});
		});
	});
});

app.get("/news", (req, res) => {
	res.json(articles);
});

app.get("/news/:newspaperId", (req, res) => {
	const newspaperId = req.params.newspaperId;

	const newspaperAddress = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].address;

	const newspaperBase = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].base;

	axios
		.get(newspaperAddress)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const specificArticles = [];

			$('a:contains("holiday")', html).each(function () {
				const title = $(this).text();
				const url = $(this).attr("href");
				specificArticles.push({
					title,
					url: newspaperBase + url,
					source: newspaperId,
				});
			});
			res.json(articles);
		})
		.catch((err) => console.log(err));
});

newspapers.forEach((newspaper) => {
	axios.get(newspaper.address).then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);

		$('a:contains("visit")', html).each(function () {
			const title = $(this).text();
			const url = $(this).attr("href");

			articles.push({
				title,
				url: newspaper.base + url,
				source: newspaper.name,
			});
		});
	});
});

app.get("/news", (req, res) => {
	res.json(articles);
});

app.get("/news/:newspaperId", (req, res) => {
	const newspaperId = req.params.newspaperId;

	const newspaperAddress = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].address;

	const newspaperBase = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].base;

	axios
		.get(newspaperAddress)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const specificArticles = [];

			$('a:contains("visit")', html).each(function () {
				const title = $(this).text();
				const url = $(this).attr("href");
				specificArticles.push({
					title,
					url: newspaperBase + url,
					source: newspaperId,
				});
			});
			res.json(articles);
		})
		.catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
