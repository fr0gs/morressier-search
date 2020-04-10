# Morressier 

## Usage

```sh
$ npm install
$ npm start
```

## Notes

* Implementing cache for http requests was as simpe as using `axios-extensions` plugin and wrapping around the axios global object using an adapter that implements the cache for us. That's part or the reason why I chose axios (some others like backwards compatibility, that axios already parses the JSON for you for example, although also it's very easy to use).
* In the `MorressierPoster` object there's the `author_names` array as well as `authors` one. The latter is specified in the pdf's **Data Types** section whereas the former is a string array that contains the names of the Poster's authors, instead of needing to look them up by poster id in the `users` array. I used this for comfort.
* I created the `CenteredComponent` wrapper component to avoid centering everything. I am not sure that's the best pattern to go for styling components as opposed to use some sort of modular CSS and and inherit. I need to learn more about web design. 


## Possible improvements

* Component testing (unit & integration), with Jest & Enzyme for example. Test runner & assertion library that integrate seamlessly with React.
* More comprehensive type system. Use a typed functional language? ReasonML could be interesting?
* For such a simple app there's no need, but if it were to grow, use any sort of state management library to centralize state. (Redux, MobX)
* Use a Serviceworker to create an app shell and make the app still accessible offline if the connection drops.
* Since the initial page is only the Welcome page, the application could be split in bundles and lazy load the `PosterResultsList` component and `PosterResultsDetail` component lazily.

## Possible ideas

* Adding coordinates or a set of coordinates for events, and displaying events in a map.


## Caveats

* In the `PosterResultsDetail` component I can't seem to make the spinner to work. I am trying with all the workarounds to call an async function in the `useEffect()` hook but nothing for now.
* I keep having a warning that I am going to document just in case I don't manage to get rid of it before delivery:

```
index.js:1 Warning: Failed prop type: Material-UI: either `children`, `image`, `src` or `component` prop must be specified.
    in ForwardRef(CardMedia) (created by WithStyles(ForwardRef(CardMedia)))
    in WithStyles(ForwardRef(CardMedia)) (at PostersResultsDetail.tsx:59)
    in div (created by ForwardRef(Paper))
    in ForwardRef(Paper) (created by WithStyles(ForwardRef(Paper)))
    in WithStyles(ForwardRef(Paper)) (created by ForwardRef(Card))
    in ForwardRef(Card) (created by WithStyles(ForwardRef(Card)))
    in WithStyles(ForwardRef(Card)) (at PostersResultsDetail.tsx:58)
    in div (created by ForwardRef(Grid))
    in ForwardRef(Grid) (created by WithStyles(ForwardRef(Grid)))
    in WithStyles(ForwardRef(Grid)) (at CenteredComponent.tsx:24)
    in div (created by ForwardRef(Grid))
    in ForwardRef(Grid) (created by WithStyles(ForwardRef(Grid)))
    in WithStyles(ForwardRef(Grid)) (at CenteredComponent.tsx:16)
    in div (created by ForwardRef(Container))
    in ForwardRef(Container) (created by WithStyles(ForwardRef(Container)))
    in WithStyles(ForwardRef(Container)) (at CenteredComponent.tsx:15)
    in CenteredComponent (at PostersResultsDetail.tsx:57)
    in PostersResultsDetail (at PostersResultsPage.tsx:172)
    in Route (at PostersResultsPage.tsx:171)
    in Switch (at PostersResultsPage.tsx:170)
    in PostersResultsPage (at App.tsx:20)
    in Route (at App.tsx:19)
    in Switch (at App.tsx:15)
    in Router (created by BrowserRouter)
    in BrowserRouter (at App.tsx:14)
    in App (at src/index.tsx:9)
    in StrictMode (at src/index.tsx:8)
```