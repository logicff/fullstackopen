# Phonebook App

使用 React + Vite

```bash
# npm 7+, in directory "part2"
npm create vite@latest countries -- --template react
cd countries
npm install
npm run dev
```

使用 Axios

```bash
# in directory "part2/countries"
npm install axios
```

Note: Only submitted the final results after 2.20

## 2.18: Data for countries, step 1

At https://studies.cs.helsinki.fi/restcountries/ you can find a service that offers a lot of information related to different countries in a so-called machine-readable format via the REST API. Make an application that allows you to view information from different countries.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific.

If there are ten or fewer countries, but more than one, then all countries matching the query are shown.

When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken are shown.

NB: It is enough that your application works for most countries. Some countries, like Sudan, can be hard to support since the name of the country is part of the name of another country, South Sudan. You don't need to worry about these edge cases.

## 2.19: Data for countries, step 2

Improve on the application in the previous exercise, such that when the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country.

In this exercise, it is also enough that your application works for most countries. Countries whose name appears in the name of another country, like Sudan, can be ignored.

## 2.20: Data for countries, step 3

Add to the view showing the data of a single country, the weather report for the capital of that country. There are dozens of providers for weather data. One suggested API is https://openweathermap.org. Note that it might take some minutes until a generated API key is valid.

NB: In some browsers (such as Firefox) the chosen API might send an error response, which indicates that HTTPS encryption is not supported, although the request URL starts with http://. This issue can be fixed by completing the exercise using Chrome.

NB: You need an api-key to use almost every weather service. Do not save the api-key to source control! Nor hardcode the api-key to your source code. Instead use an environment variable to save the key in this exercise. In real-life applications, it's considered insecure sending these keys directly from the browser, as anyone who can open the dev console would be able to intercept your keys! We will focus on implementing a separate backend in the next part of the course.
